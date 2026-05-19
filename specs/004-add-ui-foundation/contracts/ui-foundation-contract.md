# UI Foundation Contract

## Purpose

Define the contributor-facing contract for Keystone's shared UI foundation: what
the product shell must provide, how dark and light themes behave, which
component and state semantics are shared, and how later feature teams extend the
system without fragmenting the visual language.

## Shell Contract

The shared UI foundation MUST expose these persistent structural regions:

- a left navigation rail for primary module switching
- a top header for page context and high-level actions
- a content frame for analytical surfaces and reusable component composition

The shell MUST preserve hierarchy and readability in both dark and light modes.

## Theme Contract

The UI foundation MUST support:

- dark mode as the default visual posture
- full light-mode support through the same semantic token model
- a predictable theme preference rule that supports user choice and return visits

Theme support MUST NOT create separate component families or separate semantic
meanings per theme.

## Token Contract

The shared token system MUST define semantics for at least:

- primary and secondary surfaces
- high-emphasis and medium-emphasis text
- primary accent emphasis
- success, warning, and critical states
- interactive feedback such as hover, selection, and loading
- spacing, corner radius, and motion timing guidance required by the design
  language

Every semantic token MUST have both dark and light render values.

## Component Contract

The MVP UI foundation MUST provide reusable patterns for at least:

- cards and grouped content surfaces
- compact metric regions
- status indicators
- loading states
- empty states
- error states
- common action surfaces
- dense table and chart containers

Each reusable pattern MUST rely on shared tokens and shared state semantics
rather than page-local styling rules.

## State Semantics Contract

The UI foundation MUST keep these semantics stable wherever they appear:

- neutral information
- success signals
- warning signals
- critical signals
- loading states
- selected or active states
- AI-assisted or trust-sensitive markers

If a semantic treatment loses clarity in a given theme or context, the UI MUST
fall back to a simpler presentation that remains understandable.

## Visualization Contract

The UI foundation MUST define reusable analytical visualization patterns for:

- trend-style data containers
- radar or multi-axis comparison containers
- progress or trajectory containers

This phase defines the shared presentation contract only. It does not require a
specific charting dependency unless a later feature adds one explicitly.

## Extension Contract

Later feature teams MAY extend the component and visualization set, but they
MUST:

- reuse the same shell regions
- consume the same token semantics
- preserve dark/light theme parity
- keep severity and AI-marker meanings stable
- avoid introducing a second visual language for feature-specific screens