import React from 'react';
import { useApp } from '../context/AppContext';
import useDateData from '../hooks/useDateData';
import GoalsSection from './GoalsSection';
import TasksSection from './TasksSection';
import NotesSection from './NotesSection';
import ExpensesSection from './ExpensesSection';
import DiarySection from './DiarySection';
import { formatDateKey } from '../utils/dateHelpers';
import { X, RotateCcw, Lock, Unlock } from 'lucide-react';

/**
 * Slide-in detailed editor panel for the active date.
 * Hosts locks to toggle edit capability for this specific date.
 */
export default function DayPanel({ onClose }) {
  const { currentDate, resetDate, showConfirm, showToast } = useApp();
  const dateKey = formatDateKey(currentDate);
  const { 
    dateData, 
    updateGoals, 
    updateTasks, 
    updateNotes, 
    updateExpenses, 
    updateDiary,
    updateLocked
  } = useDateData(dateKey);

  const formattedDate = currentDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleResetDay = () => {
    if (dateData.locked) return;
    showConfirm(
      'Reset Day Data?',
      'Are you sure you want to clear all tasks, goals, expenses, diary, and notes for this day? This cannot be undone.',
      () => resetDate(dateKey)
    );
  };

  const handleToggleLock = () => {
    const nextLocked = !dateData.locked;
    updateLocked(nextLocked);
    showToast(
      nextLocked 
        ? 'Day locked! Edits are now disabled. 🔒' 
        : 'Day unlocked! Edits are now enabled. 🔓', 
      'info'
    );
  };

  return (
    <div className="day-panel glass-panel">
      {/* Panel header bar */}
      <div className="day-panel-header">
        <div className="day-panel-title-container">
          <h3 className="day-panel-title">{formattedDate}</h3>
        </div>
        
        <div className="day-panel-header-buttons">
          {/* Lock/Unlock toggle button */}
          <button
            type="button"
            onClick={handleToggleLock}
            className={`panel-icon-btn ${dateData.locked ? 'lock-active-btn' : ''}`}
            title={dateData.locked ? "Unlock edits for this day" : "Lock day to prevent edits"}
            aria-label={dateData.locked ? "Unlock day" : "Lock day"}
          >
            {dateData.locked ? (
              <Lock size={18} style={{ color: 'var(--accent-gold)' }} />
            ) : (
              <Unlock size={18} />
            )}
          </button>

          <button 
            type="button"
            onClick={handleResetDay}
            disabled={dateData.locked}
            className={`panel-icon-btn text-danger-btn ${dateData.locked ? 'disabled-btn' : ''}`}
            title={dateData.locked ? "Cannot reset locked day" : "Reset all sections for this day"}
            aria-label="Reset day data"
          >
            <RotateCcw size={18} />
          </button>
          
          <button 
            type="button"
            onClick={onClose}
            className="panel-icon-btn"
            title="Close editor panel"
            aria-label="Close detail panel"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main scrolling details form list */}
      <div className="day-panel-body glass-scroll">
        <GoalsSection 
          goals={dateData.goals} 
          onUpdate={updateGoals} 
          isLocked={dateData.locked}
        />
        
        <TasksSection 
          tasks={dateData.tasks} 
          onUpdate={updateTasks} 
          isLocked={dateData.locked}
        />
        
        <NotesSection 
          notes={dateData.notes} 
          onUpdate={updateNotes} 
          isLocked={dateData.locked}
        />
        
        <ExpensesSection 
          expenses={dateData.expenses} 
          onUpdate={updateExpenses} 
          isLocked={dateData.locked}
        />
        
        <DiarySection 
          diary={dateData.diary} 
          onUpdate={updateDiary} 
          isLocked={dateData.locked}
        />
      </div>
    </div>
  );
}
