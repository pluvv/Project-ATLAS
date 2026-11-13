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

## Development principles

1. Preserve provenance for intelligence claims.
2. Distinguish confirmed facts, reports, analysis and uncertainty.
3. Use only public, licensed or explicitly authorized data and camera feeds.
4. Never bypass authentication, access controls, provider restrictions or privacy protections.
5. Keep secrets out of source control; use environment variables and local secret files.
6. Build modularly, test continuously and document operational requirements.

## Initial architecture

The first milestone establishes a Python API foundation. Web and desktop clients, persistence, ingestion workers and intelligence modules will be added incrementally behind stable interfaces.

## Repository status

This repository is at the initial foundation stage. Features are planned until implemented and verified; the roadmap is not a claim that those capabilities already exist.

## License

No open-source license has been selected yet. Until one is added, all rights are reserved by the copyright holder.
