import React, { useState, useEffect, Suspense } from 'react';
import { useApp } from './context/AppContext';
import { getMonthName } from './utils/dateHelpers';
import CalendarGrid from './components/CalendarGrid';
import MonthTotalBadge from './components/MonthTotalBadge';
import Toast from './components/Toast';
import ConfirmModal from './components/ConfirmModal';
import { ChevronLeft, ChevronRight, Download, Upload, Calendar } from 'lucide-react';

// Lazy-load Day Detail Panel for optimal startup performance
const DayPanel = React.lazy(() => import('./components/DayPanel'));

export default function App() {
  const {
    currentDate,
    viewMonth,
    viewYear,
    navigateMonth,
    goToToday,
    handleExportMonth,
    handleImportData
  } = useApp();

  const [panelOpen, setPanelOpen] = useState(false);

  // Auto-reveal the editor panel whenever the selected date changes
  useEffect(() => {
    if (currentDate) {
      setPanelOpen(true);
    }
  }, [currentDate]);

  // Handle keyboard shortcuts (Arrow navigations, Escape close, Ctrl+S is handled globally in AppContext)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        navigateMonth(-1);
      } else if (e.key === 'ArrowRight') {
        navigateMonth(1);
      } else if (e.key === 'Escape') {
        setPanelOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateMonth]);

  // Read upload files and trigger context imports
  const onFileImportChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        handleImportData(parsed);
      } catch (err) {
        console.error('Import parse error:', err);
      }
    };
    reader.readAsText(file);
    
    // Clear select input to allow uploading the same file name repeatedly
    e.target.value = '';
  };

  return (
    <div className="app-container">
      {/* 1. Magical drifting leaves background */}
      <div className="bokeh-overlay" aria-hidden="true">
        {Array.from({ length: 15 }).map((_, idx) => {
          const offsetLeft = Math.random() * 100; // 0% to 100%
          const speed = Math.random() * 20 + 18; // 18s to 38s
          const delayTime = Math.random() * -25; // Negative delay so they start scattered
          
          const leafOptions = ['🍃', '🌿', '🌱', '☘️'];
          const selectedLeaf = leafOptions[idx % leafOptions.length];

          return (
            <div
              key={idx}
              className="bokeh-bubble"
              style={{
                left: `${offsetLeft}%`,
                animationDuration: `${speed}s`,
                animationDelay: `${delayTime}s`
              }}
            >
              {selectedLeaf}
            </div>
          );
        })}
      </div>

      {/* 2. Global Header */}
      <header className="app-header glass-panel">
        <div className="header-logo-section" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Calendar className="logo-icon" size={24} style={{ color: 'var(--accent-green)' }} />
            <h1 className="logo-text">Pra-Calendar</h1>
          </div>
          
          <a
            href="https://prdipland.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="pro-land-badge"
            title="Visit Pro Land"
          >
            <span className="pro-bracket pro-bracket-left">[</span>
            <span className="pro-land-text">Pro Land</span>
            <span className="pro-bracket pro-bracket-right">]</span>
          </a>
        </div>

        <div className="header-navigation-controls">
          <button 
            type="button"
            className="glass-btn" 
            onClick={() => navigateMonth(-1)}
            title="Previous Month"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          
          <h2 className="nav-month-title">
            {getMonthName(viewMonth)} {viewYear}
          </h2>
          
          <button 
            type="button"
            className="glass-btn" 
            onClick={() => navigateMonth(1)}
            title="Next Month"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>

          <button 
            type="button"
            className="glass-btn glass-btn-primary" 
            onClick={goToToday}
            style={{ marginLeft: '0.4rem' }}
            title="Jump to Today"
          >
            Today
          </button>
        </div>

        <div className="header-right-actions">
          <button
            type="button"
            className="glass-btn"
            onClick={handleExportMonth}
            title="Export Month to JSON"
          >
            <Download size={16} /> Export
          </button>

          <div className="import-btn-wrapper">
            <button
              type="button"
              className="glass-btn"
              title="Import JSON Backup"
            >
              <Upload size={16} /> Import
              <input
                type="file"
                accept=".json"
                onChange={onFileImportChange}
                className="hidden-file-input"
                aria-label="Import data file"
              />
            </button>
          </div>

          <MonthTotalBadge />
        </div>
      </header>

      {/* 3. Main Workspace Area */}
      <main className="app-main">
        {/* Calendar Grid Section */}
        <section className={`calendar-section ${panelOpen ? 'shrink' : ''}`}>
          <div className="glass-panel" style={{ height: '100%' }}>
            <CalendarGrid />
          </div>
        </section>

        {/* Selected Day Details Panel */}
        <section className={`panel-section ${panelOpen ? 'open' : ''}`}>
          <Suspense fallback={
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', height: '100%' }}>
              <span className="fade-in">Opening details... ✨</span>
            </div>
          }>
            {panelOpen && <DayPanel onClose={() => setPanelOpen(false)} />}
          </Suspense>
        </section>
      </main>

      {/* 4. Global Alerts / Dialog Portals */}
      <Toast />
      <ConfirmModal />

      {/* 5. Custom Footer */}
      <footer className="app-footer">
        <span>
          Made with 🍃 by{' '}
          <a
            href="https://prradeepp.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--accent-green)',
              textDecoration: 'none',
              fontWeight: '700'
            }}
          >
            Pradeep
          </a>
        </span>
      </footer>
    </div>
  );
}
