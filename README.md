# 🌿 Pra-Calendar — Dreamy Digital Planner

**Pra-Calendar** is a premium, dynamic, single-page React calendar web application built using Vite. It features a fresh, organic green leaf aesthetic with advanced glassmorphic styling, progress trackers, and day-locking capabilities. It is optimized for immediate production deployment on Vercel.

---

## ✨ Key Features

* **🌿 Organic Green Leaf Theme:** Sleek sage-mint gradients with drifting background leaf animations (`🍃`, `🌿`, `🌱`, `☘️`).
* **🔒 Day Locking System:** Lock specific dates to prevent accidental edits, deletes, or resets. Day blocks display a lock badge on the calendar grid when locked.
* **🎯 Daily Goals:** Track goals with a progress bar and trigger confetti sparkle explosions upon 100% completion.
* **✅ Priority Tasks:** Organise daily todos with color-coded priority labels (High 🔴, Medium 🟡, Low 🟢) and Native HTML5 Drag-and-Drop list reordering.
* **📝 Markdown Daily Notes:** Write detailed logs with word counters, save timestamps, and a live markdown previewer supporting custom styles.
* **💰 Budget & Expense Tracker:** Form input for expenses with category badges (Food 🍔, Transport 🚗, Shopping 🛍️, Bills 📄, Entertainment 🎬, Health 💊, Other 📝) updating running daily totals and global monthly badges in real-time.
* **📔 Diary & Mood Tracker:** Capture daily reflections and pick mood emojis that display directly on the calendar days grid.
* **🔄 Backup & Cross-Device Sync:** Import and export monthly data as JSON files to transfer records between devices (e.g. laptop and mobile).
* **📱 Responsive Layouts:** Optimized for all screen viewports:
  - **Desktop (1024px+):** Calendar grid (60%) and editor panel (40%) side-by-side.
  - **Tablet (768px - 1023px):** Calendar grid full, detail panel slides out as an overlay.
  - **Mobile (<768px):** Compact grid boxes with detail panel sliding up as a full-screen sheet.

---

## 🛠️ Tech Stack
* **Core:** React 18+ (Functional Components & Hooks)
* **Build System:** Vite
* **Styling:** Custom Vanilla CSS & Glassmorphism Modules
* **Icons:** Lucide React
* **Persistence:** LocalStorage (JSON database synced reactively)
* **Optimization:** Lazy-loaded detail panel, memoized total aggregators, and PWA manifest.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### Running Locally
Start the development server:
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser to view the application.

### Building for Production
Build the optimized application assets:
```bash
npm run build
```
The output files will be generated in the `/dist` folder, ready for hosting on Vercel, Netlify, or similar platforms.

---

## 📝 Custom Notes Style Guide
The Notes section includes a custom parser that reads formatting rules:
- `# Main Title` &rarr; Main Section Heading
- `## Subtitle` &rarr; Section Subheading
- `**bold text**` &rarr; **bold text**
- `[color:gold](colored text)` &rarr; <span style="color: #D4AF37;">colored text</span>
- `[color:#EF5350](colored text)` &rarr; <span style="color: #EF5350;">colored text</span>

---

## 📂 Codebase Directory Structure
```
src/
  ├── components/          # Reusable UI & Layout Components
  │     ├── CalendarGrid.jsx
  │     ├── DayBlock.jsx
  │     ├── DayPanel.jsx
  │     ├── GoalsSection.jsx
  │     ├── TasksSection.jsx
  │     ├── NotesSection.jsx
  │     ├── ExpensesSection.jsx
  │     ├── DiarySection.jsx
  │     ├── MonthTotalBadge.jsx
  │     ├── GlassCard.jsx
  │     ├── Toast.jsx
  │     └── ConfirmModal.jsx
  ├── context/             # Global Configurations & State Management
  │     └── AppContext.jsx
  ├── hooks/               # Custom Helper State Hooks
  │     ├── useLocalStorage.js
  │     ├── useDateData.js
  │     └── useMonthTotal.js
  ├── styles/              # Global variables, vignettes, and animations
  │     ├── globals.css
  │     └── glassmorphism.css
  ├── utils/               # Timezone-safe helpers and parsers
  │     ├── dateHelpers.js
  │     ├── storageHelpers.js
  │     └── formatters.js
  ├── App.jsx              # Main workspace layout
  └── main.jsx             # Entry mount
public/
  ├── favicon.png          # Generated calendar icon
  └── manifest.json        # PWA application metadata
vercel.json                # Single-page application redirect configs
```

---

## 👤 Author
Made with 🍃 by [Pradeep](https://prradeepp.netlify.app/)
