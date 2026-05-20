# James Alderman — Personal Blog

Personal blog and content CRM built with React + Vite, deployed on Netlify.

## Stack
- **React 18** + **Vite 5**
- No external UI libraries — all styles are hand-written CSS-in-JS
- **Netlify** for hosting with automatic deploys from GitHub

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (runs on http://localhost:5173)
npm run dev
```

## Build for Production

```bash
npm run build
# Output goes to /dist — Netlify handles this automatically
```

## Project Structure

```
james-blog/
├── public/
│   └── favicon.svg          # Brand favicon
├── src/
│   ├── main.jsx             # React entry point
│   └── App.jsx              # Full blog + CRM app
├── index.html               # HTML shell with SEO meta tags
├── vite.config.js           # Vite config
├── netlify.toml             # Netlify build + redirect config
└── package.json
```

## Adding / Editing Posts

Use the **CRM tab** in the nav to add, edit, or delete posts.
Each post has:
- Title, slug, date, category, content pillar
- Full article content
- Substack link
- SEO title, meta description, keywords, OG image, canonical URL
- Live SERP preview in the edit modal

## Netlify Deploy Settings

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | 18+ |

The `netlify.toml` file sets all of this automatically.

## Custom Domain

In Netlify → Site settings → Domain management → Add custom domain.
Point your domain's DNS to Netlify's nameservers or add a CNAME record.
