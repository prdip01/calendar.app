import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Check, Edit2, X } from 'lucide-react';

/**
 * Manages daily goals including progress tracking and completion confetti sparkles.
 * Supports inline editing and read-only lock state.
 */
export default function GoalsSection({ goals, onUpdate, isLocked }) {
  const [newGoalText, setNewGoalText] = useState('');
  const [triggerSparkles, setTriggerSparkles] = useState(false);
  
  // Inline editing states
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const previousGoals = useRef(goals);

  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.completed).length;
  const completionPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  // Fire sparkles if goals are fully completed
  useEffect(() => {
    const wasCompleted = previousGoals.current.length > 0 && previousGoals.current.every((g) => g.completed);
    const isCompleted = totalGoals > 0 && goals.every((g) => g.completed);

    if (!wasCompleted && isCompleted) {
      setTriggerSparkles(true);
      const timer = setTimeout(() => setTriggerSparkles(false), 2500);
      return () => clearTimeout(timer);
    }
    previousGoals.current = goals;
  }, [goals, totalGoals]);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (isLocked) return;
    if (!newGoalText.trim()) return;

    const goal = {
      id: `goal_${Date.now()}`,
      text: newGoalText.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    onUpdate([...goals, goal]);
    setNewGoalText('');
  };

  const handleToggleGoal = (id) => {
    if (isLocked) return;
    const updated = goals.map((g) => {
      if (g.id === id) return { ...g, completed: !g.completed };
      return g;
    });
    onUpdate(updated);
  };

  const handleDeleteGoal = (id) => {
    if (isLocked) return;
    const updated = goals.filter((g) => g.id !== id);
    onUpdate(updated);
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleStartEdit = (g) => {
    if (isLocked) return;
    setEditingId(g.id);
    setEditingText(g.text);
  };

  const handleSaveEdit = (id) => {
    if (isLocked) return;
    if (!editingText.trim()) return;

    const updated = goals.map((g) => {
      if (g.id === id) return { ...g, text: editingText.trim() };
      return g;
    });
    
    onUpdate(updated);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="detail-section goals-section">
      {triggerSparkles && (
        <div className="sparkles-container">
          {[...Array(16)].map((_, idx) => (
            <span 
              key={idx} 
              className="sparkle-particle"
              style={{
                left: `${Math.random() * 85 + 5}%`,
                top: `${Math.random() * 85 + 5}%`,
                animationDelay: `${Math.random() * 0.6}s`
              }}
            >
              ✨
            </span>
          ))}
        </div>
      )}

      <h4 className="detail-section-title">🎯 Daily Goals</h4>

      {/* Progress Bar */}
      <div className="section-progress-row">
        <div className="progress-bar-track">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <span className="progress-label">
          {completionPercentage}% ({completedGoals}/{totalGoals})
        </span>
      </div>

      <form onSubmit={handleAddGoal} className="section-input-form">
        <input
          type="text"
          value={newGoalText}
          onChange={(e) => setNewGoalText(e.target.value)}
          placeholder={isLocked ? "Day is locked" : "What is your main goal today?"}
          disabled={isLocked}
          className="glass-input flex-grow"
        />
        <button 
          type="submit" 
          disabled={isLocked || !newGoalText.trim()}
          className={`glass-btn glass-btn-primary ${isLocked ? 'disabled-btn' : ''}`}
        >
          <Plus size={18} />
        </button>
      </form>

      {totalGoals === 0 ? (
        <div className="empty-placeholder">
          No goals yet. Make today count! ✨
        </div>
      ) : (
        <ul className="section-list">
          {goals.map((g) => {
            const isEditing = editingId === g.id;

            return (
              <li 
                key={g.id} 
                className={`section-item ${g.completed ? 'section-item-completed' : ''}`}
              >
                <button
                  type="button"
                  className={`custom-checkbox-btn ${g.completed ? 'checked' : ''} ${isLocked ? 'disabled-check' : ''}`}
                  onClick={() => handleToggleGoal(g.id)}
                  disabled={isLocked || isEditing}
                  aria-label={g.completed ? "Mark goal incomplete" : "Mark goal complete"}
                >
                  {g.completed && <Check size={14} />}
                </button>
                
                {isEditing ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="glass-input flex-grow"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.9rem' }}
                    autoFocus
                  />
                ) : (
                  <span className="section-item-text">{g.text}</span>
                )}
                
                <div className="item-action-buttons" style={{ display: 'flex', gap: '0.4rem', marginLeft: 'auto' }}>
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        className="panel-icon-btn"
                        style={{ color: 'var(--accent-green)', padding: '0.25rem' }}
                        onClick={() => handleSaveEdit(g.id)}
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
                        onClick={() => handleDeleteGoal(g.id)}
                        title="Delete goal"
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
                        onClick={() => handleStartEdit(g)}
                        title="Edit goal"
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
