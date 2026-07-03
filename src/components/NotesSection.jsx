import React, { useState, useEffect } from 'react';
import { parseMarkdown, getWordCount } from '../utils/formatters';
import { Eye, Edit3, HelpCircle } from 'lucide-react';

/**
 * Capture rich daily journaling notes.
 * Offers live preview for custom Markdown formats (headings, bold, colored text)
 * and autosaves input using a 300ms debounce.
 * Supports read-only lock state.
 */
export default function NotesSection({ notes, onUpdate, isLocked }) {
  const [inputText, setInputText] = useState(notes.content || '');
  const [previewMode, setPreviewMode] = useState(false);
  const [showMarkdownGuide, setShowMarkdownGuide] = useState(false);

  // Sync state if date shifts
  useEffect(() => {
    setInputText(notes.content || '');
  }, [notes.content]);

  // Debounced auto-save triggers 300ms after user pauses typing
  useEffect(() => {
    if (isLocked) return;
    if (inputText === notes.content) return;

    const timer = setTimeout(() => {
      onUpdate({
        content: inputText,
        updatedAt: new Date().toISOString()
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [inputText, onUpdate, notes.content, isLocked]);

  const wordCount = getWordCount(inputText);
  
  const savedTimeText = notes.updatedAt
    ? new Date(notes.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : 'No edits yet';

  const adjustTextareaHeight = (e) => {
    if (isLocked) return;
    setInputText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Automatically force previewMode to true when day is locked (optional but very user friendly!)
  useEffect(() => {
    if (isLocked) {
      setPreviewMode(true);
    }
  }, [isLocked]);

  return (
    <div className="detail-section notes-section">
      <div className="section-header-row">
        <h4 className="detail-section-title">📝 Daily Notes</h4>
        
        <div className="section-header-actions">
          <button 
            type="button"
            className="panel-icon-btn"
            onClick={() => setShowMarkdownGuide(!showMarkdownGuide)}
            title="Markdown Formatting Help"
          >
            <HelpCircle size={18} />
          </button>
          
          <button
            type="button"
            disabled={isLocked}
            className={`glass-btn glass-btn-primary ${isLocked ? 'disabled-btn' : ''}`}
            onClick={() => setPreviewMode(!previewMode)}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
          >
            {previewMode ? (
              <>
                <Edit3 size={14} /> Write
              </>
            ) : (
              <>
                <Eye size={14} /> Preview
              </>
            )}
          </button>
        </div>
      </div>

      {showMarkdownGuide && (
        <div className="markdown-guide-card glass-card">
          <p><strong>Pra-Calendar Style Guide:</strong></p>
          <ul>
            <li><code># Header Text</code> &rarr; Main heading</li>
            <li><code>## Subheader Text</code> &rarr; Subheading</li>
            <li><code>**bold text**</code> &rarr; <strong>bold text</strong></li>
            <li><code>[color:gold](gold text)</code> &rarr; <span style={{ color: 'gold' }}>gold text</span></li>
            <li><code>[color:#FF6B6B](red text)</code> &rarr; <span style={{ color: '#FF6B6B' }}>red text</span></li>
          </ul>
        </div>
      )}

      {previewMode ? (
        <div 
          className="markdown-preview-pane glass-input"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(inputText) || `<span style="opacity: 0.5;">${isLocked ? 'Locked (Empty entry)' : 'Empty entry. Toggle write mode to start typing...'}</span>` }}
        ></div>
      ) : (
        <textarea
          value={inputText}
          onChange={adjustTextareaHeight}
          disabled={isLocked}
          placeholder={isLocked ? "This day is locked." : "Jot down notes, links, or outlines. Supports headings, bold text, and inline colors..."}
          className="glass-input notes-textarea"
          style={{ height: 'auto', minHeight: '120px' }}
        />
      )}

      <div className="notes-footer-info">
        <span className="notes-counter">{wordCount} words</span>
        <span className="notes-save-time">{isLocked ? 'Locked 🔒' : `Saved: ${savedTimeText}`}</span>
      </div>
    </div>
  );
}
