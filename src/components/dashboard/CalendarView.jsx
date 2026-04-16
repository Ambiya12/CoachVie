import React, { useMemo, useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import ContinuousCalendar from '../calendar/ContinuousCalendar';
import styles from '../../styles/DashboardTabs.module.css';

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function toDayLabel(date) {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function CalendarView() {
  const { events, removeEvent, markDone, markTodo } = usePlanner();
  const [selectedDate, setSelectedDate] = useState(null);

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => a.start.getTime() - b.start.getTime()),
    [events]
  );

  const handleRemoveEvent = (eventId) => {
    const event = sortedEvents.find((item) => item.id === eventId);
    if (!event) {
      return;
    }

    const shouldRemove = window.confirm(
      `Supprimer cet evenement ?\n\n${event.title}`
    );

    if (shouldRemove) {
      removeEvent(event.id);
    }
  };

  const handleToggleDone = (event) => {
    if (event.status === 'done') {
      markTodo(event.id);
    } else {
      markDone(event.id);
    }
  };

  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) {
      return [];
    }

    const selectedKey = toDateKey(selectedDate);
    return sortedEvents.filter((event) => toDateKey(event.start) === selectedKey);
  }, [selectedDate, sortedEvents]);

  const handleDayClick = (day, month, year) => {
    const nextSelectedDate = new Date(year, month, day);
    nextSelectedDate.setHours(0, 0, 0, 0);
    setSelectedDate(nextSelectedDate);
  };

  return (
    <section className={styles.calendarSection}>
      <div className={styles.calendarIntro}>
        <h2 className={styles.calendarTitle}>Mon planning</h2>
      </div>

      <div className={styles.calendarContainer}>
        <ContinuousCalendar
          events={sortedEvents}
          onDayClick={handleDayClick}
          onRemoveEvent={handleRemoveEvent}
        />
      </div>

      {selectedDate ? (
        <section className={styles.dayDetailsPanel}>
          <div className={styles.dayDetailsHeader}>
            <h3 className={styles.dayDetailsTitle}>{toDayLabel(selectedDate)}</h3>
            <button
              type="button"
              className={styles.dayDetailsCloseBtn}
              onClick={() => setSelectedDate(null)}
            >
              Fermer
            </button>
          </div>

          {selectedDateEvents.length === 0 ? (
            <p className={styles.dayDetailsEmpty}>
              Aucun evenement programme pour cette date.
            </p>
          ) : (
            <div className={styles.dayDetailsList}>
              {selectedDateEvents.map((event) => (
                <article
                  key={event.id}
                  className={`${styles.dayDetailsItem} ${event.status === 'done' ? styles.dayDetailsItemDone : ''}`}
                >
                  <div>
                    <span className={styles.dayDetailsTime}>
                      {event.start.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <p className={`${styles.dayDetailsEventTitle} ${event.status === 'done' ? styles.dayDetailsEventTitleDone : ''}`}>
                      {event.status === 'done' ? '✓ ' : ''}{event.title}
                    </p>
                    <span className={styles.dayDetailsType}>{event.type}</span>
                    {event.exerciseId ? (
                      <span className={styles.dayDetailsType}>Exercice: {event.exerciseId}</span>
                    ) : null}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {event.source !== 'manual' ? (
                      <button
                        type="button"
                        className={event.status === 'done' ? styles.dayDetailsUndoBtn : styles.dayDetailsDoneBtn}
                        onClick={() => handleToggleDone(event)}
                      >
                        {event.status === 'done' ? 'À faire' : 'Fait ✓'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={styles.dayDetailsRemoveBtn}
                        onClick={() => handleRemoveEvent(event.id)}
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      ) : null}

      {events.length === 0 ? (
        <p className={styles.emptyPlannerMessage}>
          Votre planning est vide. Completez le diagnostic pour generer votre programme personnalise.
        </p>
      ) : null}
    </section>
  );
}