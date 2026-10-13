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

The `render.yaml` Blueprint provisions a Django web service, PostgreSQL database,
and persistent storage for ticket attachments. In Render, create a new Blueprint
from this project's repository and review the plan and cost before applying it.
After deployment, Render provides an HTTPS URL that can be opened from devices
anywhere with an internet connection.

Once deployment completes, run `python manage.py createsuperuser` in the web
service's shell to create the first administrator. Do not run `seed_demo` on a
public deployment; its demo accounts use a shared, predictable password.

## Demo accounts
- Employee: `employee` / `password123`
- Technician: `technician` / `password123`
- Admin: `admin` / `password123`
- Manager: `manager` / `password123`

## Production notes
The Render configuration supplies an environment-generated SECRET_KEY, disables
DEBUG, restricts hosts, uses PostgreSQL, enables HTTPS security settings, and
stores uploaded attachments on a persistent disk. Configure email delivery and
review account registration and operational security before production use.
