import React, { useEffect, useRef } from 'react';
import useDismissibleLayer from '../../hooks/useDismissibleLayer';
import styles from './Drawer.module.css';

export default function Drawer({ isOpen, onClose, title, children }) {
  const innerRef = useDismissibleLayer(isOpen, onClose);
  const previouslyFocusedRef = useRef(typeof document !== 'undefined' ? document.activeElement : null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement;
    } else if (previouslyFocusedRef.current) {
      previouslyFocusedRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <aside
        ref={innerRef}
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fermer"
          >
            Fermer
          </button>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </aside>
    </div>
  );
}
