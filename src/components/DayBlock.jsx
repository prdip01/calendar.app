import React from 'react';
import { isToday, isWeekend } from '../utils/dateHelpers';
import { Lock } from 'lucide-react';

/**
 * Individual Day block cell in the calendar.
 * Shows day numbers, weekend shading, indicators, and handles click events.
 * Shows lock status indicator and selection overlays.
 */
export default function DayBlock({ dayInfo, isSelected, onClick, data }) {
  const { date, isCurrentMonth } = dayInfo;
  
  const dayNum = date.getDate();
  const currentToday = isToday(date);
  const currentWeekend = isWeekend(date);

  // Extract indicator state
  const hasGoals = data?.goals && data.goals.length > 0;
  const hasTasks = data?.tasks && data.tasks.length > 0;
  const hasNotes = data?.notes && data.notes.content && data.notes.content.trim().length > 0;
  const hasExpenses = data?.expenses && data.expenses.length > 0;
  const moodEmoji = data?.diary?.mood;
  const isLocked = !!data?.locked;

  // Build styling classes dynamically
  let blockClasses = 'day-block glass-panel';
  if (!isCurrentMonth) {
    blockClasses += ' day-block-other-month';
  } else {
    blockClasses += ' glass-panel-hover';
  }
  
  if (isSelected) {
    blockClasses += ' day-block-selected glass-active';
  }
  
  if (currentToday) {
    blockClasses += ' day-block-today'; // today pulse-glow is handled in CSS
  }
  
  if (currentWeekend && isCurrentMonth) {
    blockClasses += ' day-block-weekend';
  }

  return (
    <button 
      type="button"
      className={blockClasses} 
      onClick={() => onClick(date)}
      aria-label={`Select date ${date.toDateString()}`}
    >
      <div className="day-block-header">
        {isSelected ? (
          <span className="day-block-number day-block-number-selected">{dayNum}</span>
        ) : (
          <span className="day-block-number">{dayNum}</span>
        )}
        
        <div className="day-block-header-right">
          {isLocked && (
            <span className="day-lock-icon-wrapper" title="Day is Locked">
              <Lock size={12} style={{ color: 'var(--accent-green)' }} />
            </span>
          )}
          {moodEmoji && (
            <span className="day-block-mood" title={`Mood: ${moodEmoji}`}>
              {moodEmoji}
            </span>
          )}
        </div>
      </div>
      
      {isSelected && (
        <span className="selected-leaf-deco" aria-hidden="true">
          🍃
        </span>
      )}
      
      <div className="day-block-indicators">
        {hasGoals && (
          <span className="day-dot day-dot-goal" title="Goals set"></span>
        )}
        {hasTasks && (
          <span className="day-dot day-dot-task" title="Tasks pending"></span>
        )}
        {hasExpenses && (
          <span className="day-dot day-dot-expense" title="Expenses tracked"></span>
        )}
        {hasNotes && (
          <span className="day-dot day-dot-note" title="Notes captured"></span>
        )}
      </div>
    </button>
  );
}
