# Flask-Project

Minimal Flask app for webcam streaming and related frontend assets.

## Overview

This repository hosts a small Flask application (`app.py`) with a frontend for webcam streaming and example utilities under `extra/` and `static/`. It includes a React frontend in `frontend/` for advanced UIs.

## Prerequisites

- Python 3.8+ (virtual environment recommended)
- Node.js/npm (only needed to run or build the React frontend)

## Quick start

1. Activate the project's virtual environment (Windows PowerShell):

```powershell
& env\Scripts\Activate.ps1
```

2. Install Python dependencies:

```powershell
pip install -r requirements.txt
```

3. Run the Flask app:

```powershell
python app.py
```

4. Open your browser at http://localhost:5000 (or the address printed by the app).

## Frontend (optional)

To run the React frontend (development):

```bash
cd frontend
npm install
npm start
```

## Project layout

- `app.py` — Flask application entrypoint
- `requirements.txt` — Python dependencies
- `templates/` — Jinja templates and frontend static files used by Flask
- `static/` — static assets and helper scripts
- `frontend/` — React app (optional separate dev server)
- `extra/` — utility scripts and examples (motion detection, webstreaming)

## TLS / SSL certificates

If you want to run the app with HTTPS in development or testing, place your certificate and private key files in the project root (or a secure location) and reference them when starting the server.

- Typical filenames used here:
	- `cert.pem` — PEM-encoded certificate (may include full chain)
	- `key.pem` — PEM-encoded private key
	- `filekey.key` — alternative/private-key filename sometimes required by tooling (optional)

- Generate a self-signed certificate for `localhost` (needs OpenSSL):

```powershell
openssl req -x509 -nodes -days 365 -newkey rsa:4096 -keyout key.pem -out cert.pem -subj "/CN=localhost"
Copy-Item key.pem filekey.key
```

- If you already have a certificate and a separate private key, copy or rename them into the project as `cert.pem` and `key.pem` (or create `filekey.key` as a copy of your key if a tool expects that name).

- Use the files with Flask's built-in server (development only):

```python
from app import app

# Use ('cert.pem', 'key.pem') or ('cert.pem', 'filekey.key') as needed
app.run(host='0.0.0.0', port=443, ssl_context=('cert.pem', 'key.pem'))
```

- Production recommendations:
	- Do not use Flask's built-in server for production TLS. Terminate TLS at a reverse proxy (Nginx, Apache) or via a platform/load balancer.
	- For publicly trusted certs use Let's Encrypt or your CA and configure the webserver to use `fullchain.pem` / `privkey.pem` as required by the server.
	- Store private keys securely (OS secret stores, cloud secrets managers, or mounted volumes with strict permissions). Do not commit keys to source control.

- Security and gitignore:
	- Add these patterns to `.gitignore` to avoid accidental commits:

```
*.pem
*.key
.env
```

## Notes

- If you use a different port or host, update frontend connection URLs accordingly.
- This README is intentionally brief; tell me if you want a more detailed developer guide, API docs, or screenshots added.

## License

Specify a license or add one to the repo if desired.
