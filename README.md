# Freelancer Engineers | College Projects

Welcome to the **Freelancer Engineers | College Projects** website repository. This is a static landing page built to offer end-to-end project building, documentation, and guidance services for college students. The website emphasizes a real-world approach, utilizing industry best practices.

## 🚀 Features & Tech Stack

This project is a fully responsive, animated static website. It leverages the following technologies:

- **HTML5 & CSS3:** Semantic markup and modern, responsive styling with custom fonts (Inter, DM Mono, Instrument Serif).
- **JavaScript (Vanilla):** Handles custom logic such as the custom cursor, magnetic buttons, intersection observers, and form submissions.
- **GSAP (GreenSock Animation Platform):** Powers complex animations, including text splitting effects on the hero section and smooth horizontal scrolling sections (`ScrollTrigger`).
- **EmailJS:** Used for the functional, serverless contact form, allowing users to send messages directly from the website without needing a backend.
- **Cloudflare Pages:** Deployed seamlessly using Cloudflare Pages (configured via `wrangler.jsonc`).

## 📂 Project Structure

- `index.html`: The main entry point of the website, containing the layout and content.
- `style.css`: The stylesheet defining the visual appearance, typography, layout, and responsive breakpoints.
- `script.js`: Contains all the interactive logic, including GSAP animations and EmailJS form handling.
- `wrangler.jsonc`: Cloudflare Pages configuration file, pointing to the root directory for deployment.

## 🛠️ Local Development

To run this project locally, you simply need to serve the files using any static file server.

1. Clone the repository.
2. Open the project folder.
3. Serve the directory (e.g., using VS Code's Live Server extension, or `npx serve`, or `python -m http.server`).
4. Navigate to `http://localhost:<port>` to view the site.

## ✉️ Contact Form Configuration

The contact form is powered by EmailJS. If you are forking this repository, you will need to update the EmailJS credentials in `script.js`:

```javascript
// Replace with your own EmailJS Service ID, Template ID, and Public Key
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
```

## ☁️ Deployment

The project is configured to deploy directly to Cloudflare Pages. The `wrangler.jsonc` file specifies that the current directory (`.`) is the build output directory, meaning no build step is required—the static files are served as-is.
