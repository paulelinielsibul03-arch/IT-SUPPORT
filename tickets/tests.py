from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse


class UserManagementTests(TestCase):
    def setUp(self):
        self.admin = User.objects.create_user(username="admin", password="password123")
        self.admin.profile.role = "admin"
        self.admin.profile.save()

    def test_add_user_view_creates_user(self):
        self.client.login(username="admin", password="password123")
        response = self.client.post(
            reverse("add_user"),
            {
                "username": "newuser",
                "email": "newuser@example.com",
                "first_name": "New",
                "last_name": "User",
                "password": "StrongPass123!",
                "role": "technician",
                "department": "IT Support",
                "employee_id": "EMP-999",
            },
        )
        self.assertEqual(response.status_code, 302)
        self.assertTrue(User.objects.filter(username="newuser").exists())
        self.assertEqual(User.objects.get(username="newuser").profile.role, "technician")

    def test_edit_user_view_prefills_existing_user(self):
        target = User.objects.create_user(
            username="editme",
            email="editme@example.com",
            password="original-pass",
            first_name="Edit",
            last_name="Me",
        )
        target.profile.role = "technician"
        target.profile.department = "IT"
        target.profile.employee_id = "EMP-100"
        target.profile.save()
        self.client.login(username="admin", password="password123")

        response = self.client.get(reverse("edit_user", args=[target.pk]))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'value="editme"')
        self.assertContains(response, 'value="editme@example.com"')
        self.assertContains(response, 'value="EMP-100"')
        self.assertContains(response, "Leave blank to keep the current password.")

    def test_edit_user_view_updates_profile_and_preserves_blank_password(self):
        target = User.objects.create_user(
            username="editme",
            email="editme@example.com",
            password="original-pass",
        )
        self.client.login(username="admin", password="password123")

        response = self.client.post(
            reverse("edit_user", args=[target.pk]),
            {
                "username": "updated-user",
                "email": "updated@example.com",
                "first_name": "Updated",
                "last_name": "User",
                "password": "",
                "role": "manager",
                "department": "Operations",
                "employee_id": "EMP-101",
            },
        )

        self.assertRedirects(response, reverse("user_management"))
        target.refresh_from_db()
        target.profile.refresh_from_db()
        self.assertEqual(target.username, "updated-user")
        self.assertEqual(target.email, "updated@example.com")
        self.assertEqual(target.profile.role, "manager")
        self.assertEqual(target.profile.department, "Operations")
        self.assertEqual(target.profile.employee_id, "EMP-101")
        self.assertTrue(target.check_password("original-pass"))

    def test_edit_user_view_rejects_duplicate_username(self):
        target = User.objects.create_user(username="editme", password="original-pass")
        User.objects.create_user(username="already-used", password="another-pass")
        self.client.login(username="admin", password="password123")

        response = self.client.post(
            reverse("edit_user", args=[target.pk]),
            {
                "username": "already-used",
                "email": "editme@example.com",
                "role": "employee",
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Username already exists.")
        target.refresh_from_db()
        self.assertEqual(target.username, "editme")
