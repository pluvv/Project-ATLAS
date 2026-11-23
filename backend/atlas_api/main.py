"""Small, explicit API foundation for ATLAS.

The sample event endpoint intentionally returns demonstration records only.
It must not be mistaken for a live intelligence feed.
"""
from datetime import datetime, timezone
from typing import Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict

app = FastAPI(
    title="ATLAS API",
    version="0.2.0",
    description="Versioned service foundation for the ATLAS monitoring platform.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


class HealthResponse(BaseModel):
    status: Literal["ok"] = "ok"
    service: str = "atlas-api"
    version: str = "0.2.0"
    timestamp: datetime


class DemoEvent(BaseModel):
    model_config = ConfigDict(frozen=True)

    id: str
    title: str
    category: Literal["Conflict", "Disaster", "Weather", "Infrastructure"]
    region: str
    latitude: float
    longitude: float
    severity: Literal["High", "Medium", "Low"]
    source_status: Literal["demonstration"] = "demonstration"


@app.get("/api/v1/health", response_model=HealthResponse, tags=["system"])
def health() -> HealthResponse:
    """Return API liveness and server time."""
    return HealthResponse(timestamp=datetime.now(timezone.utc))


@app.get("/api/v1/events", response_model=list[DemoEvent], tags=["events"])
def list_demo_events() -> list[DemoEvent]:
    """Return clearly labelled sample records while live providers are unconfigured."""
    return [
        DemoEvent(id="EVT-001", title="Eastern Mediterranean sample point", category="Disaster",
                  region="Eastern Mediterranean", latitude=35.9, longitude=27.8, severity="Medium"),
        DemoEvent(id="EVT-002", title="Central United States sample point", category="Weather",
                  region="Central United States", latitude=36.4, longitude=-97.2, severity="High"),
        DemoEvent(id="EVT-003", title="Arabian Sea sample point", category="Infrastructure",
                  region="Arabian Sea", latitude=17.4, longitude=64.8, severity="Low"),
    ]
