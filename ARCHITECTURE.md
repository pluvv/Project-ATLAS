# ATLAS Architecture — v0.2.0

## Architecture rule

ATLAS is a multi-application, multi-service system. Language percentages reflect committed implementation, not planned components. Languages are introduced for real subsystem needs, never merely to inflate repository statistics.

## Current and planned boundaries

| Technology | Responsibility | Status |
|---|---|---|
| TypeScript + React | Web application, map, dashboards and browser state | Implemented foundation; interactive map and event filtering |
| HTML + CSS | Web document structure and presentation | Implemented |
| Python + FastAPI | Versioned API and future intelligence/data services | Implemented foundation; health and demonstration-event endpoints |
| Leaflet + OpenStreetMap | Initial interactive 2D map and basemap | Implemented; review tile-provider terms before production scale |
| SQL / PostgreSQL + PostGIS | Relational and geospatial persistence | Planned |
| Go | High-concurrency ingestion workers where justified | Planned |
| Rust + Tauri | Native desktop integration and Windows shell | Evaluation planned |

## Service contracts

- `GET /api/v1/health` returns service status and UTC timestamp.
- `GET /api/v1/events` currently returns explicitly labelled demonstration records.
- Web and desktop clients will consume documented, versioned service interfaces.
- Future event records must preserve source identity, source URL, observed/published timestamps, location, provenance and verification status.

## Security and data integrity

- External sources must be public, licensed or explicitly authorized.
- Camera integrations must respect provider playback rules and privacy restrictions.
- Secrets stay in environment variables or local secret files and never enter Git.
- Demonstration data must never be represented as current intelligence.
- Production integrations require source attribution, freshness checks, error handling and tests.

## Implementation gates

1. Verify the web build and API tests in CI and on a Windows development machine.
2. Connect the React client to the API.
3. Add persistence and geospatial queries.
4. Integrate public providers with documented rate limits and terms.
5. Add separate ingestion services only when measured needs justify them.
6. Evaluate Tauri for the Windows desktop client after the shared API is stable.

## Honest status

The map and API are foundations, not a complete global monitoring platform. No live intelligence provider is connected yet. Each capability is marked implemented only after tests and working-environment verification.
