# ATLAS API

FastAPI service foundation for the ATLAS platform.

## Endpoints

- `GET /api/v1/health` — service liveness and UTC timestamp.
- `GET /api/v1/events` — clearly labelled demonstration records, not live intelligence.

## Run locally (PowerShell)

From the repository root:

```powershell
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -e "backend[dev]"
$env:PYTHONPATH = "backend"
.\.venv\Scripts\python.exe -m uvicorn atlas_api.main:app --reload --app-dir backend --host 127.0.0.1 --port 8000
```

Interactive API documentation: http://127.0.0.1:8000/docs

## Tests

```powershell
$env:PYTHONPATH = "backend"
.\.venv\Scripts\python.exe -m pytest backend/tests -q
```

No external provider is connected yet. Never treat demonstration records as operational information.
