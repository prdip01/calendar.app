import React, { useState } from 'react';
import { Plus, Trash2, Check, GripVertical, Edit2, X } from 'lucide-react';

/**
 * Manages daily task lists including priority tagging and drag-and-drop sorting.
 * Supports inline editing and read-only lock state.
 */
export default function TasksSection({ tasks, onUpdate, isLocked }) {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [activeDragIndex, setActiveDragIndex] = useState(null);

  // Inline editing states
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [editingPriority, setEditingPriority] = useState('Medium');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (isLocked) return;
    if (!taskText.trim()) return;

    const task = {
      id: `task_${Date.now()}`,
      text: taskText.trim(),
      completed: false,
      priority,
      order: tasks.length,
      createdAt: new Date().toISOString()
    };

    onUpdate([...tasks, task]);
    setTaskText('');
    setPriority('Medium');
  };

  const handleToggleTask = (id) => {
    if (isLocked) return;
    const updated = tasks.map((t) => {
      if (t.id === id) return { ...t, completed: !t.completed };
      return t;
    });
    onUpdate(updated);
  };

  const handleDeleteTask = (id) => {
    if (isLocked) return;
    const updated = tasks.filter((t) => t.id !== id);
    onUpdate(updated);
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleStartEdit = (t) => {
    if (isLocked) return;
    setEditingId(t.id);
    setEditingText(t.text);
    setEditingPriority(t.priority);
  };

  const handleSaveEdit = (id) => {
    if (isLocked) return;
    if (!editingText.trim()) return;

    const updated = tasks.map((t) => {
      if (t.id === id) {
        return { 
          ...t, 
          text: editingText.trim(),
          priority: editingPriority 
        };
      }
      return t;
    });
    
    onUpdate(updated);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  // Drag and Drop Handling (Native HTML5)
  const onDragStart = (e, index) => {
    if (isLocked || editingId !== null) return; // Prevent drag during editing
    setActiveDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('task-item-dragging');
  };

  const onDragOver = (e, index) => {
    e.preventDefault();
    if (isLocked || editingId !== null) return;
    if (activeDragIndex === null || activeDragIndex === index) return;

    // Rearrange item positions in the copy
    const items = [...tasks];
    const itemToMove = items[activeDragIndex];
    
    items.splice(activeDragIndex, 1);
    items.splice(index, 0, itemToMove);

    setActiveDragIndex(index);
    onUpdate(items);
  };

  const onDragEnd = (e) => {
    setActiveDragIndex(null);
    e.currentTarget.classList.remove('task-item-dragging');
  };

  const getPriorityColor = (lvl) => {
    switch (lvl) {
      case 'High':
        return '#FF6B6B';
      case 'Medium':
        return '#FFD700';
      case 'Low':
      default:
        return '#4BB543';
    }
  };

  return (
    <div className="detail-section tasks-section">
      <h4 className="detail-section-title">✅ Daily Tasks</h4>

      <form onSubmit={handleAddTask} className="section-input-form flex-wrap gap-2">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder={isLocked ? "Day is locked" : "New task summary..."}
          disabled={isLocked}
          className="glass-input flex-grow"
        />
        
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={isLocked}
          className="glass-input priority-dropdown"
        >
          <option value="Low">Low 🟢</option>
          <option value="Medium">Medium 🟡</option>
          <option value="High">High 🔴</option>
        </select>

        <button 
          type="submit" 
          disabled={isLocked || !taskText.trim()}
          className={`glass-btn glass-btn-primary ${isLocked ? 'disabled-btn' : ''}`}
        >
          <Plus size={18} />
        </button>
      </form>

      {tasks.length === 0 ? (
        <div className="empty-placeholder">
          No tasks yet. Enjoy your day! ☀️
        </div>
      ) : (
        <ul className="section-list">
          {tasks.map((task, idx) => {
            const isEditing = editingId === task.id;
            const priorityColor = getPriorityColor(isEditing ? editingPriority : task.priority);
            
            return (
              <li
                key={task.id}
                draggable={!isLocked && !isEditing}
                onDragStart={(e) => onDragStart(e, idx)}
                onDragOver={(e) => onDragOver(e, idx)}
                onDragEnd={onDragEnd}
                className={`section-item ${task.completed ? 'section-item-completed' : ''} ${activeDragIndex === idx ? 'task-item-dragging' : ''}`}
              >
                <div 
                  className="task-drag-grip" 
                  style={{ cursor: (isLocked || isEditing) ? 'not-allowed' : 'grab' }}
                  title={(isLocked || isEditing) ? "Cannot reorder" : "Drag to reorder"}
                >
                  <GripVertical size={16} />
                </div>
                
                <button
                  type="button"
                  className={`custom-checkbox-btn ${task.completed ? 'checked' : ''} ${isLocked || isEditing ? 'disabled-check' : ''}`}
                  onClick={() => handleToggleTask(task.id)}
                  disabled={isLocked || isEditing}
                  aria-label={task.completed ? "Mark task incomplete" : "Mark task complete"}
                >
                  {task.completed && <Check size={14} />}
                </button>
                
                {isEditing ? (
                  <div style={{ display: 'flex', gap: '0.4rem', flex: 1, flexWrap: 'wrap' }}>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="glass-input flex-grow"
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.9rem', minWidth: '100px' }}
                      autoFocus
                    />
                    <select
                      value={editingPriority}
                      onChange={(e) => setEditingPriority(e.target.value)}
                      className="glass-input priority-dropdown"
                      style={{ padding: '0.2rem 1.8rem 0.2rem 0.5rem', fontSize: '0.85rem' }}
                    >
                      <option value="Low">Low 🟢</option>
                      <option value="Medium">Medium 🟡</option>
                      <option value="High">High 🔴</option>
                    </select>
                  </div>
                ) : (
                  <>
                    <span className="section-item-text">{task.text}</span>
                    <span 
                      className="priority-label-badge"
                      style={{
                        backgroundColor: `${priorityColor}1F`,
                        border: `1px solid ${priorityColor}`,
                        color: priorityColor
                      }}
                    >
                      {task.priority}
                    </span>
                  </>
                )}

                <div className="item-action-buttons" style={{ display: 'flex', gap: '0.4rem', marginLeft: 'auto' }}>
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        className="panel-icon-btn"
                        style={{ color: 'var(--accent-green)', padding: '0.25rem' }}
                        onClick={() => handleSaveEdit(task.id)}
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
                        onClick={() => handleDeleteTask(task.id)}
                        title="Delete task"
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
                        onClick={() => handleStartEdit(task)}
                        title="Edit task"
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
