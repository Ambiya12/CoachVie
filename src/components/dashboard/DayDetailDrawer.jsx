import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, RotateCcw, Trash2 } from 'lucide-react';
import styles from '../../styles/DayDetailDrawer.module.css';

const EVENT_TYPE_LABELS = {
  alimentation: 'Alimentation',
  sport: 'Sport',
  mental: 'Esprit',
};

const EVENT_TYPE_COLORS = {
  alimentation: '#8fbc8f',
  sport: '#a9bbd1',
  mental: '#c0b0d0',
};

function toDayLabel(date) {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function startOfDay(date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

export default function DayDetailDrawer({
  isOpen,
  selectedDate,
  selectedDateEvents,
  upcomingEvents,
  onClose,
  onToggleDone,
  onRemoveEvent,
  onNavigateToDate,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.aside
            key="drawer-panel"
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32, mass: 0.85 }}
            aria-label="Détails du jour sélectionné"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className={styles.drawerHeader}>
              <div className={styles.drawerTitleBlock}>
                <h3 className={styles.dateTitle}>{toDayLabel(selectedDate)}</h3>
                <p className={styles.dateMeta}>
                  {selectedDateEvents.length > 0
                    ? `${selectedDateEvents.length} action${selectedDateEvents.length > 1 ? 's' : ''} prévue${selectedDateEvents.length > 1 ? 's' : ''}`
                    : 'Aucune action prévue'}
                </p>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Fermer le panneau"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className={styles.drawerContent}>
              {selectedDateEvents.length === 0 ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyText}>
                    Aucune action prévue.
                  </p>

                  {upcomingEvents.length > 0 && (
                    <div className={styles.upcomingSection}>
                      <p className={styles.upcomingLabel}>À venir</p>
                      <div className={styles.upcomingList}>
                        {upcomingEvents.map((event) => (
                          <button
                            key={`upcoming-${event.id}`}
                            type="button"
                            className={styles.upcomingItem}
                            onClick={() => {
                              onNavigateToDate(startOfDay(event.start));
                            }}
                          >
                            <span className={styles.upcomingDate}>
                              {event.start.toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                            <span className={styles.upcomingTitle}>{event.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.eventList}>
                  {selectedDateEvents.map((event) => (
                    <article
                      key={event.id}
                      className={`${styles.eventItem} ${event.status === 'done' ? styles.eventItemDone : ''}`}
                    >
                      <span
                        className={styles.eventDot}
                        style={{ background: EVENT_TYPE_COLORS[event.type] ?? '#c0b0d0' }}
                        aria-hidden="true"
                      />

                      <div className={styles.eventBody}>
                        <div className={styles.eventMeta}>
                          <span className={styles.eventTime}>
                            {event.start.toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <span className={styles.eventTypeBadge}>
                            {EVENT_TYPE_LABELS[event.type] ?? event.type}
                          </span>
                        </div>

                        <p
                          className={`${styles.eventTitle} ${event.status === 'done' ? styles.eventTitleDone : ''}`}
                        >
                          {event.title}
                        </p>

                        {event.description ? (
                          <p className={styles.eventDescription}>{event.description}</p>
                        ) : null}
                      </div>

                      <div className={styles.eventActions}>
                        {event.source !== 'manual' ? (
                          <button
                            type="button"
                            className={`${styles.actionBtn} ${
                              event.status === 'done'
                                ? styles.actionBtnUndo
                                : styles.actionBtnDone
                            }`}
                            onClick={() => onToggleDone(event)}
                            aria-label={
                              event.status === 'done'
                                ? 'Remettre à faire'
                                : 'Marquer comme fait'
                            }
                          >
                            {event.status === 'done' ? (
                              <RotateCcw size={13} strokeWidth={1.5} />
                            ) : (
                              <Check size={13} strokeWidth={1.5} />
                            )}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className={`${styles.actionBtn} ${styles.actionBtnRemove}`}
                            onClick={() => onRemoveEvent(event.id)}
                            aria-label="Supprimer l'événement"
                          >
                            <Trash2 size={13} strokeWidth={1.5} />
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
