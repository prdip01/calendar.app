import React, { useState, useEffect } from 'react';

const MOOD_LIST = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '🤩', label: 'Excited' },
  { emoji: '😴', label: 'Tired' }
];

/**
 * Renders the Diary writing component with mood selections and live character count.
 * Updates are saved automatically on change with a 300ms debounce.
 * Supports read-only lock state.
 */
export default function DiarySection({ diary, onUpdate, isLocked }) {
  const [journalText, setJournalText] = useState(diary.content || '');
  const [mood, setMood] = useState(diary.mood || '');

  // Sync state if date selection changes
  useEffect(() => {
    setJournalText(diary.content || '');
    setMood(diary.mood || '');
  }, [diary.content, diary.mood]);

  // Debounced auto-save on edit
  useEffect(() => {
    if (isLocked) return;
    if (journalText === diary.content && mood === diary.mood) return;

    const timer = setTimeout(() => {
      onUpdate({
        content: journalText,
        mood,
        createdAt: diary.createdAt || new Date().toISOString()
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [journalText, mood, onUpdate, diary.content, diary.mood, diary.createdAt, isLocked]);

  const handleMoodToggle = (emoji) => {
    if (isLocked) return;
    setMood((prevMood) => (prevMood === emoji ? '' : emoji));
  };

  const characterCount = journalText.length;

  return (
    <div className="detail-section diary-section">
      <h4 className="detail-section-title">📔 Diary Entry</h4>

      {/* Mood Selector Row */}
      <div className="diary-mood-selector-container">
        <span className="mood-row-label">Today's Mood:</span>
        <div className="diary-mood-row">
          {MOOD_LIST.map((m) => {
            const isActive = mood === m.emoji;
            return (
              <button
                key={m.label}
                type="button"
                disabled={isLocked}
                className={`mood-emoji-btn glass-card ${isActive ? 'mood-emoji-active' : ''} ${isLocked ? 'disabled-mood' : ''}`}
                onClick={() => handleMoodToggle(m.emoji)}
                title={isLocked ? `Locked (Mood: ${m.label})` : m.label}
              >
                <span className="mood-emoji-icon">{m.emoji}</span>
                <span className="mood-emoji-text">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <textarea
        value={journalText}
        onChange={(e) => setJournalText(e.target.value)}
        disabled={isLocked}
        placeholder={isLocked ? "This diary entry is locked." : "Dear Diary, today was..."}
        className="glass-input diary-textarea"
        maxLength={2000}
      />

      <div className="diary-footer-info">
        <span className="diary-char-counter">{characterCount} / 2000 characters</span>
        {isLocked && <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>Locked 🔒</span>}
      </div>
    </div>
  );
}
