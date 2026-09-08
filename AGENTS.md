# Repository Guidelines

## Project Structure & Module Organization

This is a single-page static site with no build system or package manifest.

- `index.html` contains the page structure, CDN script references, and contact-form markup.
- `style.css` contains the visual system, responsive rules, and animation-related styles.
- `script.js` owns browser behavior: cursor effects, reveal and GSAP animations, horizontal scrolling, and EmailJS submission.
- `wrangler.jsonc` configures Cloudflare Pages to publish the repository root.
- `.github/workflows/deploy.yml` deploys `main` to Cloudflare Pages.

Keep related HTML, CSS, and JavaScript changes aligned. For example, when adding a form field, add its markup in `index.html`, styling in `style.css`, and any validation or EmailJS mapping in `script.js`.

## Build, Test, and Development Commands

No install, build, or automated test command is currently defined. Serve the root with a static server while developing:

```powershell
python -m http.server 8000
# or
npx serve .
```

Open the displayed local URL and manually check desktop and narrow mobile widths. Production deployment runs automatically when changes reach `main`; it publishes `.` as configured in `wrangler.jsonc`.

## Coding Style & Naming Conventions

Match the surrounding code: two-space indentation in HTML and CSS; concise vanilla JavaScript with semicolons in `script.js`. Use lowercase, hyphenated CSS classes and IDs (for example, `.hero-title`, `#contact-form`), descriptive `const` names in JavaScript, and CSS custom properties for reusable design values. Preserve semantic HTML and existing accessibility attributes when changing layout.

External animation libraries are loaded from CDNs. Guard optional browser integrations as the current GSAP code does, and honor `prefers-reduced-motion` for new motion.

## Testing Guidelines

Test changes manually in a modern browser. Verify navigation and scrolling, form required-field behavior, animations with reduced motion enabled, and responsive layout. For EmailJS changes, use non-production credentials during validation and confirm failures show a useful user-facing result. Add a test framework only alongside its scripts and documentation.

## Commit & Pull Request Guidelines

Use short, imperative commit subjects consistent with history, such as `docs: update local setup` or `Add contact form validation`. Keep each commit focused. Pull requests should explain the user-visible change, link any relevant issue, list manual checks performed, and include screenshots or a short recording for visual or animation changes. Never commit Cloudflare tokens, EmailJS keys, or other secrets; store deployment credentials in GitHub Actions secrets.
