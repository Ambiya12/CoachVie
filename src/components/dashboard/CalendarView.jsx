import React, { useMemo, useState } from 'react';
import { Calendar, CheckCircle, FileText, Video } from 'lucide-react';
import { usePlanner } from '../../context/PlannerContext';
import ContinuousCalendar from '../calendar/ContinuousCalendar';
import Drawer from '../ui/Drawer';
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

function toCheckInLabel(status) {
  if (status === 'oui') {
    return 'Oui';
  }

  if (status === 'non') {
    return 'Non';
  }

  return 'Non renseigne';
}

export default function CalendarView() {
  const { events } = usePlanner();
  const [selectedDate, setSelectedDate] = useState(null);

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => a.start.getTime() - b.start.getTime()),
    [events]
  );

  const eventsByDate = useMemo(() => {
    const map = new Map();

    for (const event of sortedEvents) {
      const key = toDateKey(event.start);
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(event);
    }

    return map;
  }, [sortedEvents]);

  const consultationsByDate = useMemo(() => {
    const map = new Map();

    for (const [key, dayEvents] of eventsByDate.entries()) {
      const consultationEvent = dayEvents.find(
        (event) => event.type === 'consultation'
      );

      if (consultationEvent) {
        map.set(key, consultationEvent);
      }
    }

    return map;
  }, [eventsByDate]);

  const selectedDateKey = selectedDate ? toDateKey(selectedDate) : null;

  const selectedDayDetail = useMemo(() => {
    if (!selectedDateKey) {
      return null;
    }

    const consultation = consultationsByDate.get(selectedDateKey);
    if (!consultation) {
      return null;
    }

    const dayEvents = eventsByDate.get(selectedDateKey) ?? [];
    const exerciseEvent = dayEvents.find((event) => event.type === 'exercise');
    const exerciseOfDay =
      exerciseEvent?.exerciseName ||
      consultation.exerciseOfDay ||
      'Aucun exercice renseigne';
    const checkInStatus = consultation.checkInStatus;
    const sessionSummary = (
      consultation.sessionSummary || consultation.aiSummary || ''
    ).trim();

    return {
      consultation,
      exerciseOfDay,
      checkInStatus,
      sessionSummary,
    };
  }, [consultationsByDate, eventsByDate, selectedDateKey]);

  const handleDayClick = (day, month, year) => {
    const nextSelectedDate = new Date(year, month, day);
    nextSelectedDate.setHours(0, 0, 0, 0);

    const key = toDateKey(nextSelectedDate);

    if (!consultationsByDate.has(key)) {
      setSelectedDate(null);
      return;
    }

    if (selectedDateKey === key) {
      setSelectedDate(null);
      return;
    }

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
          selectedDate={selectedDate}
        />
      </div>

      <Drawer
        isOpen={Boolean(selectedDayDetail)}
        onClose={() => setSelectedDate(null)}
        title={selectedDate ? toDayLabel(selectedDate) : ''}
      >
        {selectedDayDetail ? (
          <div className={styles.dayDetailStack}>
            <article className={styles.dayDetailCard}>
              <p className={styles.dayDetailHeading}>
                <Video size={16} />
                Consultation
              </p>
              <p className={styles.dayDetailValue}>
                {selectedDayDetail.consultation.start.toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>

              {selectedDayDetail.consultation.meetingUrl ? (
                <a
                  className={styles.dayDetailJoinBtn}
                  href={selectedDayDetail.consultation.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Rejoindre l'appel
                </a>
              ) : null}
            </article>

            <article className={styles.dayDetailCard}>
              <p className={styles.dayDetailHeading}>
                <Calendar size={16} />
                Exercice du jour
              </p>
              <p className={styles.dayDetailValue}>{selectedDayDetail.exerciseOfDay}</p>
            </article>

            <article className={styles.dayDetailCard}>
              <p className={styles.dayDetailHeading}>
                <CheckCircle size={16} />
                Check-in
              </p>
              <p
                className={`${styles.dayDetailCheckInBadge} ${
                  selectedDayDetail.checkInStatus === 'oui'
                    ? styles.dayDetailCheckInBadgePositive
                    : styles.dayDetailCheckInBadgeMuted
                }`}
              >
                {toCheckInLabel(selectedDayDetail.checkInStatus)}
              </p>
            </article>

            <article className={styles.dayDetailCard}>
              <p className={styles.dayDetailHeading}>
                <FileText size={16} />
                Resume de session
              </p>

              {selectedDayDetail.sessionSummary ? (
                <p className={styles.dayDetailSummary}>{selectedDayDetail.sessionSummary}</p>
              ) : (
                <p className={styles.dayDetailMuted}>
                  Aucun resume disponible pour cette consultation.
                </p>
              )}
            </article>
          </div>
        ) : (
          <p className={styles.dayDetailsEmpty}>
            Selectionnez une date avec consultation pour afficher les details.
          </p>
        )}
      </Drawer>

      {events.length === 0 ? (
        <p className={styles.emptyPlannerMessage}>
          Votre planning est vide. Completez le diagnostic pour generer votre programme personnalise.
        </p>
      ) : null}
    </section>
  );
}
