import React, { createContext, useContext, useEffect, useState } from 'react';

const SESSION_KEY = 'coachvie-planner-events';

const DAY_INDEX = {
  Lundi: 0,
  Mardi: 1,
  Mercredi: 2,
  Jeudi: 3,
  Vendredi: 4,
  Samedi: 5,
  Dimanche: 6,
};

function getStartOfWeekMonday(referenceDate = new Date()) {
  const start = new Date(referenceDate);
  start.setHours(0, 0, 0, 0);
  const day = start.getDay();
  const distanceToMonday = (day + 6) % 7;
  start.setDate(start.getDate() - distanceToMonday);
  return start;
}

function toDateFromLegacy(day, time) {
  const timeValue = typeof time === 'string' && time ? time : '08:00';
  const [hoursRaw = '8', minutesRaw = '0'] = timeValue.split(':');
  const hours = Number.parseInt(hoursRaw, 10);
  const minutes = Number.parseInt(minutesRaw, 10);
  const weekStart = getStartOfWeekMonday();
  const dayOffset = Number.isInteger(DAY_INDEX[day]) ? DAY_INDEX[day] : 0;

  const start = new Date(weekStart);
  start.setDate(start.getDate() + dayOffset);
  start.setHours(Number.isNaN(hours) ? 8 : hours, Number.isNaN(minutes) ? 0 : minutes, 0, 0);

  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 60);

  return { start, end };
}

function toDateValue(value, fallback) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  return fallback;
}

function normalizeEvent(eventData) {
  if (!eventData) {
    return null;
  }

  if ('start' in eventData) {
    const start = toDateValue(eventData.start, new Date());
    const fallbackEnd = new Date(start);
    fallbackEnd.setMinutes(fallbackEnd.getMinutes() + 60);
    const end = toDateValue(eventData.end, fallbackEnd);

    return {
      id: eventData.id ?? Date.now().toString(),
      type: eventData.type ?? 'mental',
      title: eventData.title ?? 'Rappel',
      start,
      end,
      exerciseId: eventData.exerciseId ?? null,
    };
  }

  if ('day' in eventData || 'time' in eventData) {
    const { start, end } = toDateFromLegacy(eventData.day, eventData.time);

    return {
      id: eventData.id ?? Date.now().toString(),
      type: eventData.type ?? 'mental',
      title: eventData.title ?? 'Rappel',
      start,
      end,
      exerciseId: eventData.exerciseId ?? null,
    };
  }

  return null;
}

function readStoredEvents() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((event) => normalizeEvent(event))
      .filter(Boolean);
  } catch {
    return [];
  }
}

const PlannerContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function usePlanner() {
  return useContext(PlannerContext);
}

export function PlannerProvider({ children }) {
  const [events, setEvents] = useState(() => {
    const storedEvents = readStoredEvents();
    if (storedEvents.length > 0) {
      return storedEvents;
    }

    return [
      normalizeEvent({ id: '1', type: 'mental', title: 'Rappel: Responsabilite', day: 'Lundi', time: '11:00' }),
      normalizeEvent({ id: '2', type: 'alimentation', title: 'Graines de chia', day: 'Mardi', time: '08:00' }),
    ].filter(Boolean);
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const payload = events.map((event) => ({
      ...event,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
    }));

    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  }, [events]);

  const addEvent = (eventData) => {
    const normalized = normalizeEvent({ ...eventData, id: Date.now().toString() });

    if (!normalized) {
      return;
    }

    setEvents((prev) => [...prev, normalized]);
  };

  const removeEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <PlannerContext.Provider value={{ events, addEvent, removeEvent }}>
      {children}
    </PlannerContext.Provider>
  );
}