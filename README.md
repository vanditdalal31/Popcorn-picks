# 🎬 Popcorn Picks

A premium, Netflix-inspired movie recommendation website built entirely with **HTML, CSS, and Vanilla JavaScript** — no frameworks, no backend, no external APIs, no API keys. Everything runs fully offline, straight from the file system.

---

## 📖 Project Overview

CineVault is a portfolio-grade front-end project that simulates a modern streaming platform's browsing experience. Users can explore a curated catalog of 26 films, search and filter by genre in real time, view rich movie details in a glassmorphic modal, save favorites that persist across sessions, and get "Recommended For You" suggestions based on the last movie they viewed — all powered by a static local dataset (`movies.js`) and `localStorage`.

The UI takes visual cues from premium streaming platforms: a cinematic dark theme, warm gold and crimson accents, serif display type for a marquee feel, a film-reel motif, and glassmorphism on the navbar and modal.

---

## ✨ Features

- **Responsive Navigation Bar** — logo, section links, animated favorites counter, dark/light toggle, mobile hamburger menu
- **Hero Banner** — large featured movie backdrop with title, quick meta, description, and call-to-action buttons (randomized on each load from a curated "featured" pool)
- **Live Search** — instantly filters the grid as you type, matching title, director, cast, and genre
- **Genre Filter Pills** — All, Action, Adventure, Comedy, Drama, Sci-Fi, Horror, Animation
- **Movie Grid** — 26 movies with poster, title, year, genre tag, IMDb-style rating, and a heart-shaped favorite toggle
- **Movie Details Modal** — large poster, title, rating, year, duration, genre, director, full cast, and story synopsis, with fade + scale transition
- **Favorites System** — click the heart to save or remove a title; favorites persist via `localStorage` and appear in a dedicated section
- **Recommended For You** — a horizontally scrollable rail of similar-genre titles generated whenever a movie's modal is opened
- **Dark / Light Mode** — toggle in the navbar, preference saved to `localStorage`
- **Smooth Animations** — hover lifts on cards, button micro-interactions, modal fade/scale, scroll-triggered section reveals, smooth-scroll navigation, and an ambient rotating film-reel accent in the hero
- **Fully Responsive** — tuned breakpoints for desktop, tablet, and mobile, including a collapsible mobile nav
- **Accessible by default** — semantic HTML, visible focus states, skip-to-content link, `aria-live` toast, keyboard-operable cards and modal (Escape to close)

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure (`header`, `main`, `section`, `footer`, `dialog`-style modal) |
| **CSS3** | Custom properties (design tokens), Flexbox, CSS Grid, animations/transitions, glassmorphism (`backdrop-filter`) |
| **Vanilla JavaScript (ES6+)** | DOM rendering, search/filter logic, modal control, `localStorage` persistence, `IntersectionObserver` scroll reveals |
| **Python (build-time only)** | Used once, offline, to generate the placeholder poster/logo images in `assets/` — not required to run the site |

No build tools, bundlers, or package managers are required to run the site.

---

## 📁 Folder Structure

```
CineVault/
├── index.html          # Page structure & semantic markup
├── style.css            # Design tokens, layout, components, animations, responsiveness
├── script.js             # App logic: rendering, search, filters, modal, favorites, theme
├── movies.js             # Local movie dataset (26 movie objects)
├── assets/
│   ├── posters/          # Locally generated offline poster images
│   └── logo.png          # CineVault brand mark
└── README.md
```

---

## 📸 Screenshots

> Add your own screenshots here after running the site locally, e.g.:
>
> `assets/screenshots/hero.png` — Hero banner
> `assets/screenshots/grid.png` — Movie grid with genre filter
> `assets/screenshots/modal.png` — Movie details modal
> `assets/screenshots/favorites.png` — Favorites section
> `assets/screenshots/light-mode.png` — Light mode view

```md
![Hero Section](assets/screenshots/hero.png)
![Movie Grid](assets/screenshots/grid.png)
![Details Modal](assets/screenshots/modal.png)
```

---

## ⚙️ Installation Instructions

1. Download or clone the project folder.
2. No dependencies to install — there is no `package.json`, no build step, and no API key required.

```bash
git clone <your-repo-url>
cd CineVault
```

---

## ▶️ How to Run

**Option 1 — Open directly**
Double-click `index.html`, or open it from your browser via `File > Open`.

**Option 2 — Local server (recommended for best results)**
Some browsers restrict certain features when opening files directly via `file://`. A lightweight local server avoids this:

```bash
# Using Python 3
python3 -m http.server 8000

# then visit:
http://localhost:8000
```

or with VS Code's **Live Server** extension — right-click `index.html` → "Open with Live Server".

---

## 🚀 Future Improvements

- Add pagination or infinite scroll for larger catalogs
- Add a "sort by" control (rating, year, A–Z)
- Add trailer embeds (offline video files) inside the modal
- Add user ratings/reviews stored locally
- Add a "Continue Browsing" history rail
- Add unit tests for filtering/search logic
- Add a service worker for full PWA/offline installability
- Expand the dataset and allow user-submitted custom movie entries saved to `localStorage`

---

## 📄 License

This project is free to use for learning and portfolio purposes. Movie titles referenced are used for demonstration only — no real streaming rights are implied, and poster artwork is generated locally as placeholder art.
