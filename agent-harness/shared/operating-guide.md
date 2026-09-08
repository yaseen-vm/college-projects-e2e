# Shared Operating Guide

## Working Agreement

First inspect the affected files and existing conventions. State the intended outcome, make the smallest coherent change, and verify it before handoff. Do not overwrite unrelated work or commit credentials.

For this site, treat `index.html`, `style.css`, and `script.js` as one feature surface. Keep IDs, classes, DOM queries, and EmailJS field mappings synchronized.

## Decision Rules

- Prefer semantic HTML, responsive CSS, and dependency-free browser JavaScript.
- Preserve the reduced-motion path when adding animation.
- Ask before actions that publish, delete, change credentials, or materially expand scope.
- Record assumptions and any skipped verification in the final handoff.

## Definition of Done

A change is complete when it meets the task brief, preserves relevant behavior, has been checked locally, and is summarized with changed files, verification, and follow-up risks.
