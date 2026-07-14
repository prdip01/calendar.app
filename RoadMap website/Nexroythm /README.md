# Nexroythm — Custom Digital Products & Identity Studio

Welcome to the frontend application for **Nexroythm** — a premium, professional digital product and customization brand. 

This platform acts as a digital storefront, catalogue showcase, and project estimator. It has been built using a clean, modern **Light Theme** aesthetic to reflect a high-end tech studio and creative agency.

---

## 🌟 Brand Identity

- **Name:** Nexroythm
- **Tagline:** *"Your Vision. Our Code. One Rhythm."*
- **Mission:** Turn personal ideas into powerful digital products — from custom websites to digital gifts, dashboards, and masterclass courses.

---

## 🛠️ Technology Stack

- **Framework:** [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) (fast HMR, lightweight bundling)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using native CSS custom themes)
- **Routing:** [React Router Dom v6](https://reactrouter.com/) (declarative page-based routing)
- **Smooth Scroll:** [Lenis](https://github.com/darkroomengineering/lenis) (seamless wheel and touch physics)
- **Animations:** [GSAP](https://greensock.com/gsap/) + custom GPU-accelerated CSS Keyframes (performance first)
- **Icons:** [Lucide React](https://lucide.dev/) (clean vector stroke icons)

---

## 📂 Project Structure

```bash
src/
├── assets/          # Static layout assets
├── components/      # Common layout structures
│   ├── Navbar.jsx   # Responsive header with mobile hamburger drawer
│   └── Footer.jsx   # Clean footer with link pillars and custom brand SVGs
├── pages/           # Page-level containers
│   ├── Home.jsx      # Marketing hero, process timeline, trust stats, testimonials
│   ├── Catalogue.jsx # Live product preview frames with loading skeletons
│   ├── Pricing.jsx   # 9 service tiers, comparison table, interactive FAQs
│   └── About.jsx     # Studio mission, core values, metrics, contact scoping form
├── App.jsx          # Router wrapping, Lenis smooth scrolling, GSAP entry reveals
├── main.jsx         # App initialization with BrowserRouter
└── index.css        # Tailwind theme variables, custom scrollbars, animations config
```

---

## 🖥️ Live Catalogue Features

The **Catalogue** page dynamically tracks and lists deployed applications inside responsive `<iframe>` viewport grids. Each card contains loading-skeleton indicators, description badges, and links to:
- **Pro Calendar** — `https://pracalendar.netlify.app/`
- **Professional Dashboard** — `https://prdipland.netlify.app/`
- **Trip Planner** — `https://tripkaplaneer.netlify.app/`
- **Habit Tracker** — `https://habittrracker.netlify.app/`
- **Wedding Card** — `https://weddingsp.netlify.app/`

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (version 18+) and npm installed on your system.

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd "RoadMap website/Nexroythm"
   ```
2. Install all dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the development server locally:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Linting Checks

Analyze code quality and structure using Oxlint:
```bash
npm run lint
```

### Production Build

Compile and optimize files for deployment:
```bash
npm run build
```
The compiled static assets will be located in the `dist/` directory, ready to be served by Netlify, Vercel, or any other hosting solution.
