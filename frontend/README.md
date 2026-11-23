# ATLAS Web

The TypeScript + React interface for Project ATLAS.

## Requirements

- Node.js 20 or newer
- npm

## Run locally (Windows PowerShell)

Open two PowerShell terminals from the repository root.

**Terminal 1 — start the API:**

```powershell
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -e "backend[dev]"
$env:PYTHONPATH = "backend"
.\.venv\Scripts\python.exe -m uvicorn atlas_api.main:app --reload --app-dir backend --host 127.0.0.1 --port 8000
```

**Terminal 2 — start the web app:**

```powershell
cd frontend
npm.cmd install
npm.cmd run typecheck
npm.cmd run build
npm.cmd run dev
```

Using `npm.cmd` avoids PowerShell's script-execution restriction on the `npm.ps1` shim without changing the machine's execution policy.

Open the local URL printed by Vite (normally http://127.0.0.1:5173). The workspace checks the API health endpoint and displays whether the local API is reachable.

## Current functionality

- Interactive global 2D map using Leaflet and OpenStreetMap tiles.
- Selectable map markers, category filters and event/region search.
- Selected-record detail panel and source-connection status view.
- API health connectivity indicator.
- Clearly labelled demonstration records only.

External live intelligence providers are not connected yet. The map's sample records are not live reports or operational warnings.
