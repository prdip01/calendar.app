import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle } from 'lucide-react';

/**
 * Sweetalert-style custom modal dialog for confirmation prompts.
 * Prevents destructive actions without double verification.
 */
export default function ConfirmModal() {
  const { confirmModal } = useApp();

  if (!confirmModal.show) return null;

  return (
    <div className="modal-backdrop fade-in" onClick={confirmModal.onCancel}>
      <div 
        className="modal-box glass-panel scale-up" 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card body
      >
        <div className="modal-icon-container">
          <AlertTriangle size={36} className="modal-warn-icon" />
        </div>
        <h3 className="modal-title">{confirmModal.title}</h3>
        <p className="modal-desc">{confirmModal.message}</p>
        <div className="modal-btn-row">
          <button 
            type="button"
            className="glass-btn" 
            onClick={confirmModal.onCancel}
          >
            Cancel
          </button>
          <button 
            type="button"
            className="glass-btn glass-btn-danger" 
            onClick={confirmModal.onConfirm}
          >
            Yes, Reset
          </button>
        </div>
      </div>
    </div>
  );
}
