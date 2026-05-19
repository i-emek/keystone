# Data Model: UI Foundation

## Overview

This feature models the shared presentation layer for the Keystone frontend
rather than customer-domain business data. The entities describe how themes,
tokens, shell regions, reusable component patterns, analytical visualization
patterns, and state semantics fit together so later screens can reuse one
consistent UI language.

## Entities

### Theme Mode

| Field | Type | Rules |
|---|---|---|
| `theme_mode_id` | String | Primary identifier |
| `name` | Enum | `dark`, `light`, `system_resolved` |
| `is_default` | Boolean | Exactly one default mode rule for the MVP |
| `supports_full_parity` | Boolean | Must be true for `dark` and `light` |
| `source_rule` | Enum | `product_default`, `stored_preference`, `system_preference` |

Validation rules:
- `dark` and `light` must both be valid render targets for all MVP foundation
  components.
- `system_resolved` may determine the active theme, but it may not become a
  third distinct visual language.

### Theme Preference

| Field | Type | Rules |
|---|---|---|
| `preference_id` | String | Primary identifier |
| `selection` | Enum | `dark`, `light`, `system` |
| `persistence_scope` | Enum | `browser_local`, later `account`, later `tenant_policy` |
| `is_explicit_user_choice` | Boolean | Required |
| `last_updated_at` | Timestamp | Nullable until persisted |

Validation rules:
- The MVP must support a user-selectable rule that resolves predictably on
  repeat visits.
- The preference model must remain compatible with later account-backed storage.

### Design Token Group

| Field | Type | Rules |
|---|---|---|
| `token_group_id` | String | Primary identifier |
| `category` | Enum | `surface`, `text`, `accent`, `severity`, `interaction`, `spacing`, `radius`, `motion` |
| `semantic_name` | String | Required semantic label |
| `dark_value` | String | Required |
| `light_value` | String | Required |
| `shared_meaning` | String | Required semantic description |

Validation rules:
- Each semantic token must define both dark and light values.
- Token meanings may not change by theme; only presentation values may change.

### Product Shell Region

| Field | Type | Rules |
|---|---|---|
| `region_id` | String | Primary identifier |
| `name` | Enum | `navigation_rail`, `top_header`, `content_frame`, later `context_panel` |
| `is_persistent` | Boolean | Required |
| `supports_dense_content` | Boolean | Required |
| `theme_sensitive` | Boolean | Required |

Validation rules:
- The MVP shell must include navigation, header, and content frame regions.
- Persistent shell regions must preserve hierarchy and readability in both
  themes.

### Component Pattern

| Field | Type | Rules |
|---|---|---|
| `component_pattern_id` | String | Primary identifier |
| `name` | Enum | `card`, `status_indicator`, `action_surface`, `loading_state`, `empty_state`, `error_state`, `metric_group`, `table_container` |
| `density_mode` | Enum | `compact`, `standard` |
| `supports_theming` | Boolean | Must be true |
| `supports_state_semantics` | Boolean | Required |
| `supports_reuse` | Boolean | Required |

Validation rules:
- Every MVP component pattern must be usable in both dark and light modes.
- Component patterns must consume shared tokens instead of page-local styling.

### Visualization Pattern

| Field | Type | Rules |
|---|---|---|
| `visualization_pattern_id` | String | Primary identifier |
| `name` | Enum | `trend_container`, `radar_container`, `progress_trajectory`, `comparison_panel` |
| `data_density` | Enum | `medium`, `high` |
| `library_bound` | Boolean | Must remain false in this phase unless explicitly added later |
| `empty_state_supported` | Boolean | Required |
| `theme_parity_supported` | Boolean | Required |

Validation rules:
- Visualization patterns in this phase define shared layout and semantics, not a
  mandatory charting dependency.
- Every pattern must support loading, empty, and degraded data presentation.

### State Semantic

| Field | Type | Rules |
|---|---|---|
| `state_semantic_id` | String | Primary identifier |
| `name` | Enum | `neutral`, `success`, `warning`, `critical`, `selected`, `hover`, `loading`, `ai_assisted` |
| `visual_priority` | Enum | `low`, `medium`, `high` |
| `text_required` | Boolean | Required |
| `must_remain_consistent_across_themes` | Boolean | Must be true |

Validation rules:
- Severity and AI-assisted states must remain semantically stable across themes.
- No state may rely on color alone when semantic clarity would be lost.

## Relationships

- One `Theme Preference` resolves to one active `Theme Mode`.
- One `Theme Mode` uses many `Design Token Group` records.
- One `Product Shell Region` contains multiple `Component Pattern` records.
- One `Component Pattern` can express multiple `State Semantic` records.
- One `Visualization Pattern` is a specialized `Component Pattern` consumer that
  must still rely on shared theme and state semantics.

## State Transitions

### Theme Preference

`unset` → `system` or `dark` or `light` → `updated`

- A session begins with no persisted preference or with a previously stored rule.
- The user may choose `system`, `dark`, or `light`.
- Any later user change updates the resolved theme without creating a separate
  semantic model.

### Component Pattern

`defined` → `implemented` → `validated`

- A component pattern is `defined` once its semantic and layout contract exists.
- It becomes `implemented` when it renders in the shared shell.
- It becomes `validated` once theme parity and state-semantics checks pass.

### Visualization Pattern

`defined` → `themed` → `validated`

- A visualization pattern is `defined` when its shared container rules exist.
- It becomes `themed` when both dark and light tokens render correctly.
- It becomes `validated` when loading, empty, and semantic states remain clear.