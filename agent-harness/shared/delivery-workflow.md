# Delivery Workflow

## 1. Frame

Restate the desired outcome, identify affected files, constraints, and acceptance checks. Use the task brief for work that spans more than a small edit.

## 2. Inspect

Read the relevant implementation, root `AGENTS.md`, and recent changes when history matters. Reuse existing patterns before introducing new ones.

## 3. Implement

Make focused edits. Keep content, styling, and interaction changes in sync. Avoid unrelated formatting churn.

## 4. Verify

For this static site, run a local server such as `python -m http.server 8000` and check the changed flow at desktop and mobile widths. Check form validation and reduced-motion behavior when applicable.

## 5. Handoff

Report: outcome, files changed, verification performed, and any known limitation. If verification was not possible, say why and give the exact next command or check.
