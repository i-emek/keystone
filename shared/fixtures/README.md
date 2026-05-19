# Shared Fixtures

This directory holds local-only fixture assets that can be reused by the
frontend, backend, and worker during development and tests.

Current expectations:

- store deterministic fixture payloads here instead of duplicating them per service
- keep fixtures safe for local development and free of customer data
- document fixture ownership when a file is introduced