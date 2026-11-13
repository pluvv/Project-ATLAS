"""Run the ATLAS API with Uvicorn using python -m atlas."""

import uvicorn


if __name__ == "__main__":
    uvicorn.run("atlas.main:app", host="127.0.0.1", port=8000, reload=True)
