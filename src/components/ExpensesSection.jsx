import React, { useState } from 'react';
import { Plus, Trash2, Check, Edit2, X } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const CATEGORIES = [
  { name: 'Food', label: 'Food 🍔', color: '#FF6B6B' },
  { name: 'Transport', label: 'Transport 🚗', color: '#4D96FF' },
  { name: 'Shopping', label: 'Shopping 🛍️', color: '#F38181' },
  { name: 'Bills', label: 'Bills 📄', color: '#6BCB77' },
  { name: 'Entertainment', label: 'Entertainment 🎬', color: '#FFD700' },
  { name: 'Health', label: 'Health 💊', color: '#A760FF' },
  { name: 'Other', label: 'Other 📝', color: '#B5C0D0' }
];

/**
 * Manage daily expenses, tracking food, shopping, utilities, and more.
 * Outputs running daily expense totals and formats inputs.
 * Supports inline editing and read-only lock state.
 */
export default function ExpensesSection({ expenses, onUpdate, isLocked }) {
  const [itemText, setItemText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  // Inline editing states
  const [editingId, setEditingId] = useState(null);
  const [editingItem, setEditingItem] = useState('');
  const [editingAmount, setEditingAmount] = useState('');
  const [editingCategory, setEditingCategory] = useState('Food');

  const runningDailyTotal = expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (isLocked) return;
    if (!itemText.trim() || !amount || isNaN(parseFloat(amount))) return;

    const newExpense = {
      id: `exp_${Date.now()}`,
      item: itemText.trim(),
      amount: parseFloat(amount),
      category,
      createdAt: new Date().toISOString()
    };

    onUpdate([...expenses, newExpense]);
    setItemText('');
    setAmount('');
    setCategory('Food');
  };

  const handleDeleteExpense = (id) => {
    if (isLocked) return;
    const updated = expenses.filter((e) => e.id !== id);
    onUpdate(updated);
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleStartEdit = (exp) => {
    if (isLocked) return;
    setEditingId(exp.id);
    setEditingItem(exp.item);
    setEditingAmount(exp.amount.toString());
    setEditingCategory(exp.category);
  };

  const handleSaveEdit = (id) => {
    if (isLocked) return;
    if (!editingItem.trim() || !editingAmount || isNaN(parseFloat(editingAmount))) return;

    const updated = expenses.map((exp) => {
      if (exp.id === id) {
        return {
          ...exp,
          item: editingItem.trim(),
          amount: parseFloat(editingAmount),
          category: editingCategory
        };
      }
      return exp;
    });

    onUpdate(updated);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const getCategoryDetails = (catName) => {
    return CATEGORIES.find((c) => c.name === catName) || { label: 'Other 📝', color: '#B5C0D0' };
  };

  return (
    <div className="detail-section expenses-section">
      <div className="section-header-row">
        <h4 className="detail-section-title">💰 Expense Tracker</h4>
        <div className="running-daily-total glass-card">
          <span>Daily Total:</span>
          <strong>{formatCurrency(runningDailyTotal)}</strong>
        </div>
      </div>

      <form onSubmit={handleAddExpense} className="section-input-form flex-wrap gap-2">
        <input
          type="text"
          value={itemText}
          onChange={(e) => setItemText(e.target.value)}
          placeholder={isLocked ? "Day is locked" : "What did you buy?"}
          disabled={isLocked}
          className="glass-input flex-grow"
          style={{ minWidth: '150px' }}
        />
        
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={isLocked ? "🔒" : "Amount"}
          disabled={isLocked}
          className="glass-input"
          style={{ width: '100px' }}
        />
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isLocked}
          className="glass-input category-dropdown"
        >
          {CATEGORIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.label}
            </option>
          ))}
        </select>

        <button 
          type="submit" 
          disabled={isLocked || !itemText.trim() || !amount}
          className={`glass-btn glass-btn-primary ${isLocked ? 'disabled-btn' : ''}`}
        >
          <Plus size={18} />
        </button>
      </form>

      {expenses.length === 0 ? (
        <div className="empty-placeholder">
          No expenses recorded for today. 💸
        </div>
      ) : (
        <ul className="section-list">
          {expenses.map((exp) => {
            const isEditing = editingId === exp.id;
            const cat = getCategoryDetails(isEditing ? editingCategory : exp.category);
            
            return (
              <li key={exp.id} className="section-item expense-list-item">
                {isEditing ? (
                  <div style={{ display: 'flex', gap: '0.4rem', flex: 1, flexWrap: 'wrap' }}>
                    <input
                      type="text"
                      value={editingItem}
                      onChange={(e) => setEditingItem(e.target.value)}
                      className="glass-input flex-grow"
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.9rem', minWidth: '100px' }}
                      autoFocus
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={editingAmount}
                      onChange={(e) => setEditingAmount(e.target.value)}
                      className="glass-input"
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.9rem', width: '80px' }}
                    />
                    <select
                      value={editingCategory}
                      onChange={(e) => setEditingCategory(e.target.value)}
                      className="glass-input category-dropdown"
                      style={{ padding: '0.2rem 1.8rem 0.2rem 0.5rem', fontSize: '0.85rem' }}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <>
                    <div className="expense-item-info">
                      <span className="expense-item-name">{exp.item}</span>
                      <span 
                        className="expense-category-tag"
                        style={{
                          backgroundColor: `${cat.color}24`,
                          border: `1px solid ${cat.color}`,
                          color: cat.color
                        }}
                      >
                        {cat.label}
                      </span>
                    </div>
                    
                    <div className="expense-item-actions" style={{ marginRight: '0.5rem' }}>
                      <span className="expense-item-amount">{formatCurrency(exp.amount)}</span>
                    </div>
                  </>
                )}
                
                <div className="item-action-buttons" style={{ display: 'flex', gap: '0.4rem' }}>
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        className="panel-icon-btn"
                        style={{ color: 'var(--accent-green)', padding: '0.25rem' }}
                        onClick={() => handleSaveEdit(exp.id)}
                        title="Save edit"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        type="button"
                        className="panel-icon-btn"
                        style={{ color: '#EF5350', padding: '0.25rem' }}
                        onClick={handleCancelEdit}
                        title="Cancel edit"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled={isLocked}
                        className={`section-delete-btn ${isLocked ? 'disabled-btn' : ''}`}
                        onClick={() => handleDeleteExpense(exp.id)}
                        title="Delete expense"
                      >
                        <Trash2 size={16} />
                      </button>
                      
                      <button
                        type="button"
                        disabled={isLocked}
                        className={`section-edit-btn ${isLocked ? 'disabled-btn' : ''}`}
                        style={{
                          color: 'var(--text-secondary)',
                          opacity: 0,
                          transition: 'var(--transition-smooth)'
                        }}
                        onClick={() => handleStartEdit(exp)}
                        title="Edit expense"
                      >
                        <Edit2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
