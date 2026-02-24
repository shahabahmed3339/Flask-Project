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

## Notes

- If you use a different port or host, update frontend connection URLs accordingly.
- This README is intentionally brief; tell me if you want a more detailed developer guide, API docs, or screenshots added.

## License

Specify a license or add one to the repo if desired.
