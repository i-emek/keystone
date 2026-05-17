Yes, the idea is legit.

The cleanest way to split this MVP is not by turning everything into separate deployed services, but by identifying components with:

clear inputs and outputs
offline testability on fixtures
async or batch-style execution
low dependence on UI/auth glue
That is exactly why the current design already separates API and worker-side processing in plan.md:24 and plan.md:115.

Best standalone components

Topic mapping / topic bootstrap pipeline.
This is one of the best standalone pieces in the MVP. Input: normalized engineering activity. Output: draft topics, confidence, and topic lineage hints. It is naturally separable and can be improved offline without blocking the rest of the app.

Source ingestion and normalization pipeline.
This is also a strong standalone subsystem. Input: GitHub/GitLab/Jira/Confluence data. Output: normalized activity evidence and contributor mappings. It is already modeled that way in the worker side of tasks.md:64.

Coverage and authority scoring engine.
This is another very real standalone engine. Input: approved topics plus classified activity. Output: ranked experts, warm backups, coverage confidence, and evidence coverage. It powers both search and audits, so it is a strong boundary.

Risk-flag engine.
This takes the coverage output and produces BF1, BF2, and mentor-loss risks. It can be standalone, but I would keep it attached to the coverage engine rather than split it too aggressively, because the logic is tightly related.

Audit snapshot / publish engine.
This is a good standalone trust-layer component. Input: approved topic map plus computed coverage/risk results. Output: immutable published audit artifacts, hashes, and audit records. It is bounded and deterministic, which makes it easy to own separately.

Identity privacy layer.
Pseudonymization, identity vaulting, and controlled re-identification are also separable. This is less “algorithmic” than topic mapping, but still a valid standalone subsystem if one founder is stronger on security and trust controls.

My recommended co-founder split

Founder A owns the online product surface.
That means frontend, API endpoints, auth/RBAC, source setup, topic review UX, publish flow, and stakeholder views.

Founder B owns the offline intelligence pipeline.
That means ingestion, normalization, topic mapping, coverage scoring, risk generation, and audit artifact generation.

You both share contracts and fixtures.
The handoff objects should be things like normalized activity, topic draft, coverage snapshot, risk flag, and published audit. Those are the real seams.

Components I would not split too early

Auth/RBAC/tenant context
Queue abstraction itself
Simple API routing
UI orchestration pages
Those are mostly glue. If you separate them too early, you create integration overhead without gaining much independent velocity.

Bottom line
Topic mapping is absolutely a legitimate standalone MVP component. The other strong ones are ingestion/normalization, coverage-plus-risk scoring, and audit publishing. If you want a practical 2-person split, I would put one founder on product shell and integration, and the other on the worker-side intelligence pipeline.

