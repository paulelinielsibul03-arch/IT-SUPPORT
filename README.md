# ISTMS — IT Support Ticket Management System (Django)

A premium, responsive Django implementation based on the supplied ISTMS project proposal and UI reference.

## Included
- Login and role-based dashboards
- Employee ticket submission
- My Tickets tracking
- Technician ticket queue
- Ticket details and update timeline
- Ticket assignment and status updates
- Admin/Manager dashboard
- Reports and charts
- User Management
- Knowledge Base
- Profile and Settings
- Responsive premium UI with separate CSS and JavaScript

## Requirements
- Python 3.11+ recommended
- Django 5.2+
- No external database is required for the demo; SQLite is configured by default.

## Run on Windows

1. Open Command Prompt / PowerShell in this folder.
2. Create a virtual environment:
   `python -m venv venv`
3. Activate it:
   `venv\Scripts\activate`
4. Install Django:
   `pip install -r requirements.txt`
5. Create the database:
   `python manage.py migrate`
6. Create demo data:
   `python manage.py seed_demo`
7. Start the server:
   `python manage.py runserver`
8. Open:
   `http://127.0.0.1:8000/`

## Deploy publicly on Render

The `render.yaml` Blueprint uses Render's free web service and PostgreSQL plans.
Create a Blueprint from this repository in Render; after deployment, Render
provides an HTTPS URL that can be opened from devices anywhere with internet
access.

Free service limitations apply: the web service spins down after 15 minutes
without traffic and can take about a minute to wake up. Its filesystem is
ephemeral, so ticket attachments are temporary and can be lost when the service
restarts or spins down. The free PostgreSQL database has 1 GB of storage and
expires 30 days after creation; after its grace period, Render deletes it unless
upgraded. This configuration is for testing, not production. Check Render's
current free plan terms before deployment.

Once deployed, run `python manage.py createsuperuser` in the web service's shell
to create the first administrator. Do not run `seed_demo` on a public deployment;
its demo accounts use a shared, predictable password.

## Demo accounts
- Employee: `employee` / `password123`
- Technician: `technician` / `password123`
- Admin: `admin` / `password123`
- Manager: `manager` / `password123`

## Production notes
The Render configuration supplies an environment-generated SECRET_KEY, disables
DEBUG, restricts hosts, uses PostgreSQL, and enables HTTPS security settings.
Configure email delivery and review account registration and operational
security before production use. Upgrade the web service and database and add
persistent file storage before using this system for real support tickets.
