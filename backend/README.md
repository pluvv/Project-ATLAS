# ATLAS Backend

## Requirements

- Python 3.11 or newer

## Windows PowerShell setup

From the repository root:

    py -3.11 -m venv .venv
    .\.venv\Scripts\Activate.ps1
    python -m pip install --upgrade pip
    pip install -e ".[dev]"
    $env:PYTHONPATH = "backend"
    uvicorn atlas.main:app --reload --app-dir backend

Open http://127.0.0.1:8000/health for the health response and http://127.0.0.1:8000/docs for interactive API documentation.

Run tests from the repository root:

    $env:PYTHONPATH = "backend"
    pytest
