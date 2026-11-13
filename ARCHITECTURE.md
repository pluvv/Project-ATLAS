# ATLAS Architecture — v0.1.0

## Architecture rule

ATLAS is a multi-application, multi-service system. The repository's language percentage is a measurement of files and code currently committed; it is not a target architecture or a promise about the final language percentages.

Languages are introduced when a real subsystem needs them. We will not add languages merely to inflate GitHub statistics.

## Planned responsibility boundaries

| Technology | Intended responsibility | Status |
|---|---|---|
| TypeScript + React | Web application, interactive map, dashboards and browser-side state | Initial scaffold committed |
| HTML + CSS | Web document structure and presentation | Initial scaffold committed |
| Python | Intelligence analysis, event enrichment, data science and selected API services | Initial API foundation committed |
| SQL | Relational queries, schema and geospatial persistence | Planned; PostgreSQL/PostGIS evaluation |
| Go | High-concurrency ingestion workers and long-running collectors, if operationally justified | Planned; not implemented |
| Rust | Performance-sensitive stream/data processing and native desktop components where justified | Planned; not implemented |
| Tauri | Windows desktop shell hosting the web UI, with Rust-backed native capabilities | Candidate; evaluate before adoption |

## Shared platform

The web and Windows clients will use documented service interfaces rather than maintaining separate copies of business logic. The backend will expose versioned APIs. Event records will retain source, timestamp, location, provenance and confidence/verification status.

## Implementation gates

1. Ship and type-check the TypeScript web foundation.
2. Establish API contracts between the web client and Python service.
3. Add persistence and geospatial queries.
4. Add Go only when measured ingestion concurrency or deployment needs justify a separate worker.
5. Add Rust only for measured performance bottlenecks or native desktop integration.
6. Select and implement the Windows shell after a small Tauri evaluation.

## Honest status

A planned component is not an implemented component. The initial repository is not yet a complete global monitoring platform. Each capability will be marked implemented only after it has tests and has been exercised in a working environment.
