import { useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';

/**
 * Custom hook to interact with database records for a specific date.
 * Exposes goals, tasks, notes, expenses, diary and locked state.
 * @param {string} dateKey YYYY-MM-DD
 */
export default function useDateData(dateKey) {
  const { calendarData, updateDateSection } = useApp();

  // Extract date structure with default values
  const dateData = useMemo(() => {
    const entry = calendarData[dateKey] || {};
    return {
      goals: entry.goals || [],
      tasks: entry.tasks || [],
      notes: entry.notes || { content: '', updatedAt: null },
      expenses: entry.expenses || [],
      diary: entry.diary || { content: '', mood: '', createdAt: null },
      locked: !!entry.locked
    };
  }, [calendarData, dateKey]);

  // Section setters
  const updateGoals = useCallback((goals) => {
    updateDateSection(dateKey, 'goals', goals);
  }, [updateDateSection, dateKey]);

  const updateTasks = useCallback((tasks) => {
    updateDateSection(dateKey, 'tasks', tasks);
  }, [updateDateSection, dateKey]);

  const updateNotes = useCallback((notes) => {
    updateDateSection(dateKey, 'notes', notes);
  }, [updateDateSection, dateKey]);

  const updateExpenses = useCallback((expenses) => {
    updateDateSection(dateKey, 'expenses', expenses);
  }, [updateDateSection, dateKey]);

  const updateDiary = useCallback((diary) => {
    updateDateSection(dateKey, 'diary', diary);
  }, [updateDateSection, dateKey]);

  const updateLocked = useCallback((locked) => {
    updateDateSection(dateKey, 'locked', locked);
  }, [updateDateSection, dateKey]);

  return {
    dateData,
    updateGoals,
    updateTasks,
    updateNotes,
    updateExpenses,
    updateDiary,
    updateLocked
  };
}
