from pathlib import Path


def test_backend_pyproject_declares_ruff_and_pytest_dev_tools():
    content = Path("backend/pyproject.toml").read_text()

    assert "ruff" in content
    assert "pytest" in content
