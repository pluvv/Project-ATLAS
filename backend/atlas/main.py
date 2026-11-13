"""FastAPI application entry point for ATLAS."""

from fastapi import FastAPI

app = FastAPI(
    title="ATLAS API",
    description="Global Intelligence, Monitoring and Situational Awareness Platform",
    version="0.1.0",
)


@app.get("/health", tags=["system"])
async def health() -> dict[str, str]:
    """Return a basic service health response."""
    return {"status": "ok", "service": "atlas-api", "version": "0.1.0"}


@app.get("/api/v1", tags=["system"])
async def api_root() -> dict[str, str]:
    """Describe the initial API namespace."""
    return {"name": "ATLAS API", "version": "v1", "status": "foundation"}
