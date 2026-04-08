import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  MENTAL_EXERCISE_SEQUENCE,
  getPathwayMeta,
  getPathwayPlan,
} from '../data/pathwayPlansData';

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
      source: eventData.source ?? 'manual',
      pathwayId: eventData.pathwayId ?? null,
      monthIndex: eventData.monthIndex ?? null,
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
      source: eventData.source ?? 'manual',
      pathwayId: eventData.pathwayId ?? null,
      monthIndex: eventData.monthIndex ?? null,
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

    return [];
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

  const populateCalendarForPathway = (pathwayId, startDate = new Date()) => {
    const plan = getPathwayPlan(pathwayId);
    const pathway = getPathwayMeta(pathwayId);
    const normalizedStart = new Date(startDate);
    normalizedStart.setHours(0, 0, 0, 0);

    if (Number.isNaN(normalizedStart.getTime())) {
      return;
    }

    const frequencyMap = {
      2: [1, 4],
      3: [1, 3, 5],
      4: [1, 2, 4, 6],
      5: [0, 1, 3, 4, 6],
      6: [0, 1, 2, 3, 4, 6],
    };

    const generatedEvents = [];

    plan.months.forEach((monthPlan, monthOffset) => {
      const monthBase = new Date(normalizedStart);
      monthBase.setDate(monthBase.getDate() + monthOffset * 30);

      const sportSlots = frequencyMap[monthPlan.sportFrequency] ?? frequencyMap[3];
      const activities = monthPlan.sportActivities;

      for (let week = 0; week < 4; week += 1) {
        sportSlots.forEach((dayOffset, index) => {
          const start = new Date(monthBase);
          start.setDate(start.getDate() + week * 7 + dayOffset);
          start.setHours(18, 0, 0, 0);

          const end = new Date(start);
          end.setMinutes(end.getMinutes() + monthPlan.sportDurationMin);

          generatedEvents.push({
            id: `auto-sport-${pathwayId}-${monthOffset}-${week}-${index}`,
            type: 'sport',
            title: `${activities[index % activities.length]} (${pathway.name})`,
            start,
            end,
            source: 'auto-pathway',
            pathwayId,
            monthIndex: monthPlan.monthIndex,
          });
        });

        [0, 2, 4].forEach((alimentationDay, index) => {
          const start = new Date(monthBase);
          start.setDate(start.getDate() + week * 7 + alimentationDay);
          start.setHours(8, 0, 0, 0);

          const end = new Date(start);
          end.setMinutes(end.getMinutes() + 30);

          generatedEvents.push({
            id: `auto-food-${pathwayId}-${monthOffset}-${week}-${index}`,
            type: 'alimentation',
            title: `Nutrition: ${monthPlan.alimentationFocus}`,
            start,
            end,
            source: 'auto-pathway',
            pathwayId,
            monthIndex: monthPlan.monthIndex,
          });
        });
      }
    });

    MENTAL_EXERCISE_SEQUENCE.forEach((exercise, index) => {
      const start = new Date(normalizedStart);
      start.setDate(start.getDate() + index * 15);
      start.setHours(11, 0, 0, 0);

      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 45);

      generatedEvents.push({
        id: `auto-mental-${pathwayId}-${index}`,
        type: 'mental',
        title: `Mental: ${exercise.title}`,
        start,
        end,
        exerciseId: exercise.id,
        source: 'auto-pathway',
        pathwayId,
        monthIndex: Math.min(4, Math.floor((index * 15) / 30) + 1),
      });
    });

    setEvents((prev) => {
      const manualEvents = prev.filter((event) => event.source !== 'auto-pathway');
      const normalizedGenerated = generatedEvents
        .map((eventData) => normalizeEvent(eventData))
        .filter(Boolean);

      return [...manualEvents, ...normalizedGenerated];
    });
  };

  return (
    <PlannerContext.Provider value={{ events, addEvent, removeEvent, populateCalendarForPathway }}>
      {children}
    </PlannerContext.Provider>
  );
}