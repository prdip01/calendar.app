import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

/**
 * Toast notifications. Supports success, error, and info types.
 * Styled to float above other elements with custom glassmorphism.
 */
export default function Toast() {
  const { toast, closeToast } = useApp();

  // Auto-dismiss after 4 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        closeToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show, closeToast]);

  if (!toast.show) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle style={{ color: '#4BB543' }} size={20} />;
      case 'error':
        return <AlertCircle style={{ color: '#FF6B6B' }} size={20} />;
      case 'info':
      default:
        return <Info style={{ color: '#FFD700' }} size={20} />;
    }
  };

  return (
    <div className={`toast-alert scale-up ${toast.type}`}>
      <div className="toast-alert-content">
        <span className="toast-alert-icon">{getIcon()}</span>
        <span className="toast-alert-text">{toast.message}</span>
        <button 
          className="toast-alert-close" 
          onClick={closeToast}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
