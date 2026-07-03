import React from 'react';
import { useApp } from '../context/AppContext';
import useMonthTotal from '../hooks/useMonthTotal';
import { formatCurrency } from '../utils/formatters';
import { getMonthName } from '../utils/dateHelpers';
import { Wallet } from 'lucide-react';

/**
 * Sticky global expense summary badge displaying overall month budget.
 * Uses custom glassmorphic styling and updates reactively.
 */
export default function MonthTotalBadge() {
  const { viewMonth, viewYear } = useApp();
  const total = useMonthTotal(viewYear, viewMonth);

  return (
    <div className="month-total-badge glass-card">
      <div className="month-total-icon">
        <Wallet size={18} style={{ color: 'var(--accent-gold)' }} />
      </div>
      <div className="month-total-info">
        <span className="month-total-lbl">{getMonthName(viewMonth)} Total</span>
        <span className="month-total-val">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
