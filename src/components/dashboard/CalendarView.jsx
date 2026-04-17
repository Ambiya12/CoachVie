import React, { useMemo, useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import ContinuousCalendar from '../calendar/ContinuousCalendar';
import DayDetailDrawer from './DayDetailDrawer';
import styles from '../../styles/DashboardTabs.module.css';

function startOfDay(date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function CalendarView() {
  const { events, removeEvent, markDone, markTodo } = usePlanner();
  const [selectedDate, setSelectedDate] = useState(() => startOfDay(new Date()));
  const [isPanelOpen, setIsPanelOpen] = useState(false);

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
    const selectedKey = toDateKey(selectedDate);
    return sortedEvents.filter((event) => toDateKey(event.start) === selectedKey);
  }, [selectedDate, sortedEvents]);

  const upcomingEvents = useMemo(() => {
    const selectedStart = startOfDay(selectedDate);

    return sortedEvents
      .filter((event) => startOfDay(event.start).getTime() >= selectedStart.getTime())
      .slice(0, 3);
  }, [selectedDate, sortedEvents]);

  const handleDayClick = (day, month, year) => {
    const nextSelectedDate = new Date(year, month, day);
    nextSelectedDate.setHours(0, 0, 0, 0);
    setSelectedDate(nextSelectedDate);
    setIsPanelOpen(true);
  };

  const handleNavigateToDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <section className={styles.calendarSection}>
      <div className={styles.calendarIntro}>
        <h2 className={styles.calendarTitle}>Mon planning</h2>
        <p className={styles.calendarHint}>Cliquez sur une date pour consulter vos actions.</p>
      </div>

      <div className={styles.calendarContainer}>
        <ContinuousCalendar
          events={sortedEvents}
          onDayClick={handleDayClick}
          selectedDateKey={toDateKey(selectedDate)}
        />
      </div>

      {events.length === 0 ? (
        <p className={styles.emptyPlannerMessage}>
          Votre planning est vide. Completez le diagnostic pour generer votre programme personnalise.
        </p>
      ) : null}

      <DayDetailDrawer
        isOpen={isPanelOpen}
        selectedDate={selectedDate}
        selectedDateEvents={selectedDateEvents}
        upcomingEvents={upcomingEvents}
        onClose={() => setIsPanelOpen(false)}
        onToggleDone={handleToggleDone}
        onRemoveEvent={handleRemoveEvent}
        onNavigateToDate={handleNavigateToDate}
      />
    </section>
  );
}