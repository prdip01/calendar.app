import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { generateMonthGrid } from '../utils/dateHelpers';
import DayBlock from './DayBlock';

/**
 * Renders the 7-column calendar monthly grid.
 * Displays weekday headings and generates day blocks.
 */
export default function CalendarGrid() {
  const { currentDate, setCurrentDate, viewMonth, viewYear, calendarData } = useApp();

  // Memoize grid computation to optimize rendering performance
  const gridDays = useMemo(() => {
    return generateMonthGrid(viewYear, viewMonth);
  }, [viewYear, viewMonth]);

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleSelectDate = (date) => {
    setCurrentDate(date);
  };

  return (
    <div className="calendar-grid-wrapper">
      {/* Days of the week header */}
      <div className="calendar-weekdays">
        {weekdays.map((day) => (
          <div key={day} className="calendar-weekday-lbl">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid items */}
      <div className="calendar-days-grid">
        {gridDays.map((dayInfo) => {
          // Determine if this day is selected
          const isSelected = 
            currentDate.getFullYear() === dayInfo.date.getFullYear() &&
            currentDate.getMonth() === dayInfo.date.getMonth() &&
            currentDate.getDate() === dayInfo.date.getDate();

          return (
            <DayBlock
              key={dayInfo.dateKey}
              dayInfo={dayInfo}
              isSelected={isSelected}
              onClick={handleSelectDate}
              data={calendarData[dayInfo.dateKey]}
            />
          );
        })}
      </div>
    </div>
  );
}
