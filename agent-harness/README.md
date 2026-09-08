# Agent Harness

This directory is the provider-neutral operating layer for AI contributors. It gives Codex, Claude, and Gemini one repeatable way to understand work, make changes, and verify results.

## Start Here

1. Read the root [`AGENTS.md`](../AGENTS.md) for repository conventions.
2. Read [`shared/operating-guide.md`](shared/operating-guide.md) and [`shared/delivery-workflow.md`](shared/delivery-workflow.md).
3. Use [`templates/task-brief.md`](templates/task-brief.md) to capture the task before non-trivial work.
4. Read the matching provider note in `providers/` for tool-specific behavior.

The shared documents are authoritative. Provider notes only translate those rules into the language and constraints of each assistant.

## Layout

- `shared/` - common rules and delivery workflow.
- `providers/` - compact notes for Codex, Claude, and Gemini.
- `templates/` - reusable task handoff formats.

Keep provider-specific prompts small. Put decisions that every assistant must follow in `shared/` so the harness does not drift.
