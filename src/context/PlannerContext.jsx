import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const PlannerContext = createContext(null);

const EVENTS_STORAGE_KEY = 'coachvie_planner_events';
const SLOTS_STORAGE_KEY = 'coachvie_consultation_availability_slots';

function addDays(baseDate, offset) {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + offset);
  return date;
}

function withTime(baseDate, hours, minutes = 0) {
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function addMinutes(baseDate, minutes) {
  const date = new Date(baseDate);
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}

function toSlotId(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `slot-${year}${month}${day}-${hours}${minutes}`;
}

function normalizeSummary(event) {
  if (typeof event.sessionSummary === 'string') {
    return event.sessionSummary;
  }

  if (typeof event.aiSummary === 'string') {
    return event.aiSummary;
  }

  return '';
}

function normalizeEvent(rawEvent) {
  const sessionSummary = normalizeSummary(rawEvent);
  return {
    ...rawEvent,
    start: rawEvent.start instanceof Date ? rawEvent.start : new Date(rawEvent.start),
    sessionSummary,
    aiSummary: sessionSummary,
  };
}

function createMockEvents() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const consultationYesterday = addDays(today, -1);
  const consultationTomorrow = addDays(today, 1);
  const consultationInFiveDays = addDays(today, 5);
  const exerciseToday = addDays(today, 0);
  const exerciseTomorrow = addDays(today, 1);
  const exerciseInFiveDays = addDays(today, 5);

  return [
    {
      id: 'consultation-yesterday',
      start: withTime(consultationYesterday, 18, 0),
      status: 'done',
      type: 'consultation',
      title: 'Consultation de suivi',
      source: 'coach',
      meetingUrl: 'https://meet.google.com/abc-defg-hij',
      exerciseOfDay: 'Respiration 4-7-8',
      checkInStatus: 'oui',
      sessionSummary:
        'Le focus a ete mis sur la regularite. Continuer la respiration consciente 10 minutes par jour et conserver le rituel du matin.',
    },
    {
      id: 'consultation-tomorrow',
      start: withTime(consultationTomorrow, 19, 30),
      status: 'todo',
      type: 'consultation',
      title: 'Consultation performance',
      source: 'coach',
      meetingUrl: 'https://zoom.us/j/1234567890',
      exerciseOfDay: 'Marche consciente 20 minutes',
      checkInStatus: 'non',
      sessionSummary: '',
    },
    {
      id: 'consultation-next-week',
      start: withTime(consultationInFiveDays, 17, 0),
      status: 'todo',
      type: 'consultation',
      title: 'Consultation strategie',
      source: 'coach',
      meetingUrl: 'https://meet.google.com/jkl-mnop-qr',
      exerciseOfDay: 'Visualisation 12 minutes',
      checkInStatus: 'oui',
      sessionSummary: '',
    },
    {
      id: 'exercise-today',
      start: withTime(exerciseToday, 7, 30),
      status: 'todo',
      type: 'exercise',
      title: 'Routine matinale de mobilite',
      source: 'system',
      exerciseName: 'Routine matinale de mobilite',
    },
    {
      id: 'exercise-tomorrow',
      start: withTime(exerciseTomorrow, 7, 30),
      status: 'todo',
      type: 'exercise',
      title: 'Travail de souffle et posture',
      source: 'system',
      exerciseName: 'Travail de souffle et posture',
    },
    {
      id: 'exercise-next-week',
      start: withTime(exerciseInFiveDays, 7, 30),
      status: 'todo',
      type: 'exercise',
      title: 'Sequence concentration active',
      source: 'system',
      exerciseName: 'Sequence concentration active',
    },
  ];
}

function createMockAvailabilitySlots() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const slotStarts = [
    withTime(addDays(today, 1), 11, 0),
    withTime(addDays(today, 1), 16, 30),
    withTime(addDays(today, 2), 9, 30),
    withTime(addDays(today, 3), 18, 0),
    withTime(addDays(today, 4), 12, 30),
    withTime(addDays(today, 6), 10, 0),
  ];

  return slotStarts.map((start) => ({
    id: toSlotId(start),
    start,
    end: addMinutes(start, 30),
    status: 'available',
    mode: 'video',
  }));
}

function serializeEvents(events) {
  return JSON.stringify(
    events.map((event) => {
      const sessionSummary = normalizeSummary(event);
      return {
        ...event,
        start: event.start.toISOString(),
        sessionSummary,
        aiSummary: sessionSummary,
      };
    })
  );
}

function serializeSlots(slots) {
  return JSON.stringify(
    slots.map((slot) => ({
      ...slot,
      start: slot.start.toISOString(),
      end: slot.end.toISOString(),
    }))
  );
}

function deserializeEvents(raw) {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((event) => normalizeEvent(event)) : [];
  } catch {
    return [];
  }
}

function deserializeSlots(raw) {
  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((slot) => ({
      ...slot,
      start: new Date(slot.start),
      end: new Date(slot.end),
    }));
  } catch {
    return [];
  }
}

export function PlannerProvider({ children }) {
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
    const hydratedEvents = stored ? deserializeEvents(stored) : [];
    const mockEvents = createMockEvents().map((event) => normalizeEvent(event));
    return hydratedEvents.length > 0 ? hydratedEvents : mockEvents;
  });

  const [availabilitySlots, setAvailabilitySlots] = useState(() => {
    const stored = localStorage.getItem(SLOTS_STORAGE_KEY);
    const hydratedSlots = stored ? deserializeSlots(stored) : [];
    return hydratedSlots.length > 0 ? hydratedSlots : createMockAvailabilitySlots();
  });

  useEffect(() => {
    localStorage.setItem(EVENTS_STORAGE_KEY, serializeEvents(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(SLOTS_STORAGE_KEY, serializeSlots(availabilitySlots));
  }, [availabilitySlots]);

  const addEvent = useCallback((event) => {
    setEvents((prev) => [...prev, normalizeEvent(event)]);
  }, []);

  const removeEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const markDone = useCallback((id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'done' } : e))
    );
  }, []);

  const markTodo = useCallback((id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'todo' } : e))
    );
  }, []);

  const bookAvailabilitySlot = useCallback((slotId) => {
    const selectedSlot = availabilitySlots.find((slot) => slot.id === slotId);

    if (!selectedSlot || selectedSlot.status !== 'available') {
      return false;
    }

    setAvailabilitySlots((prev) =>
      prev.map((slot) =>
        slot.id === slotId
          ? { ...slot, status: 'booked', bookedAt: new Date().toISOString() }
          : slot
      )
    );

    setEvents((prev) => {
      const alreadyBooked = prev.some((event) => event.bookingSlotId === slotId);

      if (alreadyBooked) {
        return prev;
      }

      const summary = '';

      return [
        ...prev,
        {
          id: `consultation-booked-${slotId}`,
          bookingSlotId: slotId,
          start: new Date(selectedSlot.start),
          status: 'todo',
          type: 'consultation',
          title: 'Consultation reservee',
          source: 'client',
          meetingUrl: '',
          exerciseOfDay: '',
          checkInStatus: '',
          sessionSummary: summary,
          aiSummary: summary,
        },
      ];
    });

    return true;
  }, [availabilitySlots]);

  const updateAvailabilitySlot = useCallback((slotId, patch) => {
    setAvailabilitySlots((prev) =>
      prev.map((slot) => (slot.id === slotId ? { ...slot, ...patch } : slot))
    );
  }, []);

  const value = useMemo(
    () => ({
      events,
      availabilitySlots,
      addEvent,
      removeEvent,
      markDone,
      markTodo,
      bookAvailabilitySlot,
      updateAvailabilitySlot,
    }),
    [
      events,
      availabilitySlots,
      addEvent,
      removeEvent,
      markDone,
      markTodo,
      bookAvailabilitySlot,
      updateAvailabilitySlot,
    ]
  );

  return (
    <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePlanner() {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used within PlannerProvider');
  }
  return context;
}
