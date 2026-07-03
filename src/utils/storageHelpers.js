const STORAGE_KEY = 'marta-calendar-data';

/**
 * Loads entire database from LocalStorage.
 * @returns {Object}
 */
export const loadCalendarData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error('Error reading localStorage calendar data:', error);
    return {};
  }
};

/**
 * Saves entire database to LocalStorage.
 * @param {Object} data 
 */
export const saveCalendarData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Dispatch a custom event to notify other tabs/components on the same page
    window.dispatchEvent(new Event('calendar-data-updated'));
  } catch (error) {
    console.error('Error writing localStorage calendar data:', error);
  }
};

/**
 * Retrieves records for a specific date.
 * Ensures properties are initialized if they don't exist.
 * @param {string} dateKey YYYY-MM-DD
 * @returns {Object}
 */
export const getDateData = (dateKey) => {
  const db = loadCalendarData();
  const defaultEntry = {
    goals: [],
    tasks: [],
    notes: { content: '', updatedAt: null },
    expenses: [],
    diary: { content: '', mood: '', createdAt: null }
  };
  return db[dateKey] ? { ...defaultEntry, ...db[dateKey] } : defaultEntry;
};

/**
 * Saves data for a specific date and section.
 * @param {string} dateKey YYYY-MM-DD
 * @param {string} sectionKey 'goals' | 'tasks' | 'notes' | 'expenses' | 'diary'
 * @param {any} sectionData 
 */
export const saveDateSectionData = (dateKey, sectionKey, sectionData) => {
  const db = loadCalendarData();
  if (!db[dateKey]) {
    db[dateKey] = {};
  }
  db[dateKey][sectionKey] = sectionData;
  saveCalendarData(db);
};

/**
 * Resets/deletes data for a specific date.
 * @param {string} dateKey 
 */
export const resetDateData = (dateKey) => {
  const db = loadCalendarData();
  if (db[dateKey]) {
    delete db[dateKey];
    saveCalendarData(db);
  }
};

/**
 * Exports data of the current month as a JSON file download.
 * @param {number} year 
 * @param {number} monthIndex (0-11)
 */
export const exportMonthData = (year, monthIndex) => {
  const db = loadCalendarData();
  const prefix = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
  
  // Filter only keys belonging to the requested month
  const monthData = {};
  Object.keys(db).forEach((key) => {
    if (key.startsWith(prefix)) {
      monthData[key] = db[key];
    }
  });

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(monthData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `pra_calendar_data_${prefix}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

/**
 * Imports JSON file and merges it into local storage.
 * @param {Object} importedData 
 * @returns {boolean} Whether import was successful.
 */
export const importCalendarData = (importedData) => {
  if (!importedData || typeof importedData !== 'object') return false;
  
  const db = loadCalendarData();
  
  // Basic structural validation: keys should look like dates YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  let validCount = 0;
  
  Object.keys(importedData).forEach((dateKey) => {
    if (dateRegex.test(dateKey)) {
      // Merge elements
      db[dateKey] = {
        goals: importedData[dateKey].goals || [],
        tasks: importedData[dateKey].tasks || [],
        notes: importedData[dateKey].notes || { content: '', updatedAt: null },
        expenses: importedData[dateKey].expenses || [],
        diary: importedData[dateKey].diary || { content: '', mood: '', createdAt: null }
      };
      validCount++;
    }
  });
  
  if (validCount > 0) {
    saveCalendarData(db);
    return true;
  }
  
  return false;
};
