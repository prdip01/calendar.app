import { useMemo } from 'react';
import { useApp } from '../context/AppContext';

/**
 * Custom hook to calculate total expenses for a specific month and year.
 * @param {number} year 
 * @param {number} monthIndex (0-11)
 * @returns {number} Sum of all expenses
 */
export default function useMonthTotal(year, monthIndex) {
  const { calendarData } = useApp();

  const total = useMemo(() => {
    let sum = 0;
    const monthPrefix = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;

    // Loop through all keys in localStorage db
    Object.keys(calendarData).forEach((dateKey) => {
      if (dateKey.startsWith(monthPrefix)) {
        const dayData = calendarData[dateKey];
        if (dayData && Array.isArray(dayData.expenses)) {
          dayData.expenses.forEach((exp) => {
            const amt = parseFloat(exp.amount);
            if (!isNaN(amt)) {
              sum += amt;
            }
          });
        }
      }
    });

    return sum;
  }, [calendarData, year, monthIndex]);

  return total;
}
