/**
 * Formats a Date object to local YYYY-MM-DD key.
 * @param {Date} date 
 * @returns {string} YYYY-MM-DD
 */
export const formatDateKey = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Returns the month name.
 * @param {number} monthIndex (0-11)
 * @returns {string}
 */
export const getMonthName = (monthIndex) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex];
};

/**
 * Checks if two date objects fall on the same day.
 * @param {Date} d1 
 * @param {Date} d2 
 * @returns {boolean}
 */
export const isSameDay = (d1, d2) => {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

/**
 * Checks if a date is today.
 * @param {Date} date 
 * @returns {boolean}
 */
export const isToday = (date) => {
  return isSameDay(new Date(), date);
};

/**
 * Generates the day blocks for the calendar month grid view.
 * Pads leading and trailing days from adjacent months to maintain a neat 7-column layout.
 * @param {number} year 
 * @param {number} month (0-11)
 * @returns {Array<{ date: Date, isCurrentMonth: boolean, dateKey: string }>}
 */
export const generateMonthGrid = (year, month) => {
  const grid = [];
  
  // First day of target month
  const firstDay = new Date(year, month, 1);
  // Get index of the first day (0 = Sunday, 6 = Saturday)
  const startDayOfWeek = firstDay.getDay();
  
  // Last day of target month
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  // 1. Pad preceding days from the previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthLastDay - i);
    grid.push({
      date: d,
      isCurrentMonth: false,
      dateKey: formatDateKey(d)
    });
  }
  
  // 2. Insert all days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    grid.push({
      date: d,
      isCurrentMonth: true,
      dateKey: formatDateKey(d)
    });
  }
  
  // 3. Pad succeeding days from the next month to complete the row
  // We align with a standard calendar block of 35 or 42 grid items
  const totalCells = grid.length <= 35 ? 35 : 42;
  const remainingCells = totalCells - grid.length;
  for (let i = 1; i <= remainingCells; i++) {
    const d = new Date(year, month + 1, i);
    grid.push({
      date: d,
      isCurrentMonth: false,
      dateKey: formatDateKey(d)
    });
  }
  
  return grid;
};

/**
 * Checks if a date falls on a weekend (Saturday or Sunday).
 * @param {Date} date 
 * @returns {boolean}
 */
export const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};
