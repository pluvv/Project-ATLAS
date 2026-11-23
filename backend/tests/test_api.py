from fastapi.testclient import TestClient

from atlas_api.main import app

client = TestClient(app)


def test_health_endpoint_reports_service_and_timestamp():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"
    assert payload["service"] == "atlas-api"
    assert payload["timestamp"].endswith("+00:00")


def test_events_are_explicitly_marked_as_demonstration_data():
    response = client.get("/api/v1/events")
    assert response.status_code == 200
    events = response.json()
    assert len(events) == 3
    assert all(event["source_status"] == "demonstration" for event in events)


def test_event_coordinates_are_valid():
    events = client.get("/api/v1/events").json()
    assert all(-90 <= event["latitude"] <= 90 for event in events)
    assert all(-180 <= event["longitude"] <= 180 for event in events)
