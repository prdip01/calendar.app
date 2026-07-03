import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { formatDateKey } from '../utils/dateHelpers';
import { exportMonthData, importCalendarData } from '../utils/storageHelpers';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // 1. Current selected date (Date Object)
  const [currentDate, setCurrentDate] = useState(() => new Date());

  // 2. Active calendar view month & year (helps track month view separately if desired)
  const [viewMonth, setViewMonth] = useState(() => currentDate.getMonth());
  const [viewYear, setViewYear] = useState(() => currentDate.getFullYear());

  // Keep view in sync when selected date changes
  useEffect(() => {
    setViewMonth(currentDate.getMonth());
    setViewYear(currentDate.getFullYear());
  }, [currentDate]);

  // 3. Global localStorage database state
  const [calendarData, setCalendarData] = useLocalStorage('marta-calendar-data', {});

  // 4. Custom Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
  }, []);
  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  // Keyboard shortcut listener for Ctrl+S / Cmd+S
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        showToast('All changes are auto-saved instantly! ✨', 'info');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showToast]);

  // 5. Custom Modal State (SweetAlert style confirmation dialog)
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null
  });

  const showConfirm = useCallback((title, message, onConfirm) => {
    return new Promise((resolve) => {
      setConfirmModal({
        show: true,
        title,
        message,
        onConfirm: () => {
          setConfirmModal((prev) => ({ ...prev, show: false }));
          onConfirm();
          resolve(true);
        },
        onCancel: () => {
          setConfirmModal((prev) => ({ ...prev, show: false }));
          resolve(false);
        }
      });
    });
  }, []);

  // 6. Navigation Helpers
  const navigateMonth = useCallback((direction) => {
    setViewMonth((prevMonth) => {
      let nextMonth = prevMonth + direction;
      let nextYear = viewYear;
      
      if (nextMonth < 0) {
        nextMonth = 11;
        nextYear -= 1;
        setViewYear(nextYear);
      } else if (nextMonth > 11) {
        nextMonth = 0;
        nextYear += 1;
        setViewYear(nextYear);
      }
      
      // Update selected date to 1st day of the newly loaded month to prevent overflow errors
      setCurrentDate(new Date(nextYear, nextMonth, 1));
      return nextMonth;
    });
  }, [viewYear]);

  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentDate(today);
    setViewMonth(today.getMonth());
    setViewYear(today.getFullYear());
    showToast('Returned to today! 📅', 'success');
  }, [showToast]);

  // 7. Database Updates
  const updateDateSection = useCallback((dateKey, sectionKey, sectionData) => {
    setCalendarData((prevData) => {
      const updatedDateData = {
        goals: [],
        tasks: [],
        notes: { content: '', updatedAt: null },
        expenses: [],
        diary: { content: '', mood: '', createdAt: null },
        ...(prevData[dateKey] || {}),
        [sectionKey]: sectionData
      };
      
      return {
        ...prevData,
        [dateKey]: updatedDateData
      };
    });
  }, [setCalendarData]);

  const resetDate = useCallback((dateKey) => {
    setCalendarData((prevData) => {
      const updated = { ...prevData };
      delete updated[dateKey];
      return updated;
    });
    showToast('Day data reset successfully.', 'success');
  }, [setCalendarData, showToast]);

  // 8. Import/Export Action Handlers
  const handleExportMonth = useCallback(() => {
    exportMonthData(viewYear, viewMonth);
    showToast('Month data exported successfully! 📥', 'success');
  }, [viewYear, viewMonth, showToast]);

  const handleImportData = useCallback((jsonData) => {
    const success = importCalendarData(jsonData);
    if (success) {
      // Force reload state from localStorage
      const reloaded = localStorage.getItem('marta-calendar-data');
      if (reloaded) {
        setCalendarData(JSON.parse(reloaded));
      }
      showToast('Data imported and merged successfully! 📤', 'success');
    } else {
      showToast('Invalid data file structure.', 'error');
    }
  }, [setCalendarData, showToast]);

  // Memoized value container
  const contextValue = useMemo(() => ({
    currentDate,
    setCurrentDate,
    viewMonth,
    viewYear,
    navigateMonth,
    goToToday,
    calendarData,
    updateDateSection,
    resetDate,
    handleExportMonth,
    handleImportData,
    toast,
    showToast,
    closeToast,
    confirmModal,
    showConfirm
  }), [
    currentDate,
    viewMonth,
    viewYear,
    navigateMonth,
    goToToday,
    calendarData,
    updateDateSection,
    resetDate,
    handleExportMonth,
    handleImportData,
    toast,
    showToast,
    closeToast,
    confirmModal,
    showConfirm
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
