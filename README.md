# Project ATLAS

**A Global Intelligence, Monitoring and Situational Awareness Platform**

ATLAS is an independent platform for bringing public and authorized global information sources into a geospatial, real-time intelligence workspace.

## Product direction

- **ATLAS EARTH** — interactive 2D/3D globe and geospatial layers
- **ATLAS INTELLIGENCE** — news, geopolitical, economic, disaster and infrastructure monitoring
- **ATLAS LIVE** — discovery and aggregation of public/authorized camera feeds
- **ATLAS TRACK** — public aviation, maritime and transport data
- **ATLAS SENTINEL** — incident detection, source correlation and alerts
- **ATLAS DESKTOP** — dedicated Windows workspace alongside the web application

The goal is to cover the capabilities of established global monitoring platforms and extend them with a permission-aware live camera network and evidence-based cross-source analysis.

## Current implementation

**Implemented in the repository (not yet locally verified on every supported environment):**
- TypeScript + React web application foundation.
- Interactive Leaflet world map with selectable, searchable and filterable demonstration markers.
- Event detail panel and source-status view.
- FastAPI service with versioned health and demonstration-event endpoints.
- Initial API tests and CI workflow.

**Not connected yet:** live news, weather, earthquake, aviation, maritime, camera or other external intelligence providers. Map records are illustrative demonstration data, not live events.

## Development principles

1. Preserve provenance for intelligence claims.
2. Distinguish confirmed facts, reports, analysis and uncertainty.
3. Use only public, licensed or explicitly authorized data and camera feeds.
4. Never bypass authentication, access controls, provider restrictions or privacy protections.
5. Keep secrets out of source control; use environment variables and local secret files.
6. Build modularly, test continuously and document operational requirements.

## Run the applications

See [frontend/README.md](frontend/README.md) for the web app and [backend/README.md](backend/README.md) for the API.

## Roadmap

1. Establish a reproducible development environment and CI.
2. Connect the web application to the versioned API.
3. Add PostgreSQL/PostGIS persistence and source provenance.
4. Integrate and validate public data providers one by one.
5. Expand global layers, event correlation, alerts and watchlists.
6. Build ATLAS LIVE camera-source adapters with permission and licensing checks.
7. Deliver the Windows desktop client using a shared backend.

## License

No open-source license has been selected yet. Until one is added, all rights are reserved by the copyright holder.
