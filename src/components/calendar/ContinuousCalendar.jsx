import React, { useCallback, useMemo, useState } from 'react';
import styles from './ContinuousCalendar.module.css';

const DAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function ContinuousCalendar({ events = [], onDayClick, selectedDate }) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewYear, setViewYear] = useState(() => today.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => today.getMonth());

  const eventsByDay = useMemo(() => {
    const map = new Map();
    for (const event of events) {
      if (!event.start) continue;
      const key = toDateKey(new Date(event.start));
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(event);
    }
    return map;
  }, [events]);

  const cells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0);
    const startDow = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const result = [];
    for (let i = 0; i < startDow; i++) result.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) {
      result.push(new Date(viewYear, viewMonth, d));
    }
    return result;
  }, [viewYear, viewMonth]);

  const todayKey = toDateKey(today);
  const selectedKey = selectedDate ? toDateKey(selectedDate) : null;

  const prevMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const goToday = useCallback(() => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
  }, [today]);

  const handleDayClick = useCallback(
    (date) => {
      if (!date) return;
      if (onDayClick) {
        onDayClick(date.getDate(), date.getMonth(), date.getFullYear());
      }
    },
    [onDayClick]
  );

  return (
    <div className={styles.calendarCard}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={prevMonth}
          aria-label="Mois précédent"
        >
          ‹
        </button>

        <div className={styles.headerCenter}>
          <span className={styles.monthLabel}>
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <button type="button" className={styles.todayBtn} onClick={goToday}>
            Aujourd'hui
          </button>
        </div>

        <button
          type="button"
          className={styles.navBtn}
          onClick={nextMonth}
          aria-label="Mois suivant"
        >
          ›
        </button>
      </div>

      <div className={styles.dayRow}>
        {DAY_LABELS.map((d) => (
          <div key={d} className={styles.dayLabel}>
            {d}
          </div>
        ))}
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {cells.map((date, i) => {
            if (!date) {
              return <div key={`gap-${i}`} className={styles.empty} />;
            }

            const key = toDateKey(date);
            const dayEvents = eventsByDay.get(key) ?? [];
            const isToday = key === todayKey;
            const isSelected = key === selectedKey;
            const hasConsultation = dayEvents.some((e) => e.type === 'consultation');
            const hasMultipleEvents = dayEvents.length > 1;

            return (
              <button
                key={key}
                type="button"
                aria-label={`${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`}
                className={[
                  styles.day,
                  isToday ? styles.today : '',
                  isSelected ? styles.selectedDay : '',
                  dayEvents.length > 0 ? styles.hasEvents : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleDayClick(date)}
              >
                <span className={styles.dayNumWrapper}>
                  <span className={styles.dayNum}>{date.getDate()}</span>
                </span>

                {dayEvents.length > 0 && (
                  <span className={styles.indicatorRail}>
                    <span
                      className={[
                        styles.eventIndicator,
                        hasConsultation ? styles.eventIndicatorConsultation : '',
                        hasMultipleEvents ? styles.eventIndicatorHalo : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
