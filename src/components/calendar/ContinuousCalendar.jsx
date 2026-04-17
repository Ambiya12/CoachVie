import React, { useCallback, useMemo, useState } from 'react';
import styles from '../../styles/ContinuousCalendar.module.css';

const DAY_NAMES = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTH_NAMES = [
  'Janvier',
  'Fevrier',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Decembre',
];

const EVENT_TYPE_CLASS = {
  alimentation: styles.eventAlimentation,
  sport: styles.eventSport,
  mental: styles.eventMental,
};

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function buildCalendarMonth(year, month) {
  const cells = [];
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstOfMonth.getDay() + 6) % 7;

  for (let index = 0; index < startOffset; index += 1) {
    cells.push({
      key: `empty-start-${year}-${month}-${index}`,
      isPlaceholder: true,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    cells.push({
      key: toDateKey(date),
      date,
      day,
      month,
      year,
      isPlaceholder: false,
    });
  }

  const tailOffset = (7 - (cells.length % 7)) % 7;
  for (let index = 0; index < tailOffset; index += 1) {
    cells.push({
      key: `empty-end-${year}-${month}-${index}`,
      isPlaceholder: true,
    });
  }

  return cells;
}

export default function ContinuousCalendar({
  events,
  onDayClick,
  selectedDateKey,
}) {
  const today = useMemo(() => new Date(), []);
  const todayKey = toDateKey(today);

  const [year, setYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const calendarCells = useMemo(() => buildCalendarMonth(year, currentMonth), [year, currentMonth]);

  const eventsByDate = useMemo(() => {
    const grouped = new Map();

    events.forEach((event) => {
      const startDate = event.start instanceof Date ? event.start : new Date(event.start);
      if (Number.isNaN(startDate.getTime())) {
        return;
      }

      const key = toDateKey(startDate);
      const current = grouped.get(key) ?? [];
      current.push(event);
      grouped.set(key, current);
    });

    grouped.forEach((list) => {
      list.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    });

    return grouped;
  }, [events]);

  const monthOptions = useMemo(
    () => MONTH_NAMES.map((name, value) => ({ name, value })),
    []
  );

  const handleToday = useCallback(() => {
    setYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  }, [today]);

  const handleMonthChange = useCallback(
    (event) => {
      const month = Number.parseInt(event.target.value, 10);
      if (Number.isNaN(month)) {
        return;
      }

      setCurrentMonth(month);
    },
    []
  );

  const handleDayClick = useCallback(
    (cell) => {
      if (cell.isPlaceholder) {
        return;
      }

      if (typeof onDayClick === 'function') {
        onDayClick(cell.day, cell.month, cell.year);
      }
    },
    [onDayClick]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <div className={styles.controlsGroup}>
          <select
            aria-label="Aller a un mois"
            className={styles.select}
            value={currentMonth}
            onChange={handleMonthChange}
          >
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          <button type="button" className={styles.secondaryBtn} onClick={handleToday}>
            Aujourd'hui
          </button>
          <div className={styles.yearControls}>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Annee precedente"
              onClick={() => setYear((value) => value - 1)}
            >
              ‹
            </button>
            <div className={styles.yearLabel}>{year}</div>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Annee suivante"
              onClick={() => setYear((value) => value + 1)}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div className={styles.weekHeader}>
        {DAY_NAMES.map((day) => (
          <span key={day} className={styles.weekHeaderCell}>
            {day}
          </span>
        ))}
      </div>

      <div className={styles.calendarBody}>
        <div className={styles.grid}>
          {calendarCells.map((cell) => {
            if (cell.isPlaceholder) {
              return <div key={cell.key} className={styles.dayCellPlaceholder} aria-hidden="true" />;
            }

            const dayEvents = eventsByDate.get(cell.key) ?? [];
            const isToday = cell.key === todayKey;
            const isSelected = cell.key === selectedDateKey;

            return (
              <button
                key={cell.key}
                type="button"
                className={[
                  styles.dayCell,
                  isSelected ? styles.dayCellSelected : '',
                ].filter(Boolean).join(' ')}
                onClick={() => handleDayClick(cell)}
                aria-label={`Voir le detail du ${cell.day} ${MONTH_NAMES[cell.month]} ${cell.year}`}
                aria-pressed={isSelected}
              >
                <span className={`${styles.dayNumber} ${isToday ? styles.dayNumberToday : ''}`.trim()}>
                  {cell.day}
                </span>

                {dayEvents.length > 0 ? (
                  <div className={styles.eventsLayer}>
                    {dayEvents.slice(0, 2).map((event) => {
                      const start = new Date(event.start);
                      const time = start.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      });

                      return (
                        <div key={event.id} className={styles.eventRow}>
                          <span
                            className={`${styles.eventDot} ${EVENT_TYPE_CLASS[event.type] ?? styles.eventMental}`.trim()}
                            aria-hidden="true"
                          />
                          <span className={styles.eventLabel} title={`${time} ${event.title}`}>
                            {time} {event.title}
                          </span>
                        </div>
                      );
                    })}
                    {dayEvents.length > 2 ? (
                      <span className={styles.moreEvents}>+{dayEvents.length - 2} autres</span>
                    ) : null}
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
