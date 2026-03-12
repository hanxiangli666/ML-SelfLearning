# CLAUDE-MCP Project

A Model Context Protocol (MCP) server project for Claude integration.

## Setup

### Activate Virtual Environment

**Windows (PowerShell):**
```powershell
.venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
.venv\Scripts\activate.bat
```

**macOS/Linux:**
```bash
source .venv/bin/activate
```

### Install Dependencies

Once the virtual environment is activated:

```bash
pip install -r requirements.txt
```

Or with uv:
```bash
uv sync
```

## Project Structure

```
CLAUDE-MCP/
├── .venv/              # Python virtual environment (ignored in git)
├── .gitignore          # Git ignore configuration
├── README.md           # This file
├── requirements.txt    # Python dependencies
└── src/                # Source code directory (to be created)
```

## Getting Started

1. Create your MCP server code in the `src/` directory
2. Add dependencies to `requirements.txt` or `pyproject.toml`
3. Activate the virtual environment before development
4. Push to repository (virtual environment will be ignored)

## Notes

- The `.gitignore` file is configured to ignore the virtual environment (`.venv/`)
- Virtual environments should not be committed to version control
- Always commit `requirements.txt` to allow easy reproduction of the environment
