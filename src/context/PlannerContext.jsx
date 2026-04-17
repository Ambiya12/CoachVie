import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { apiGetCurrentPlan, apiUpdateItemStatus } from '../api/plan';

const PlannerContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function usePlanner() {
  return useContext(PlannerContext);
}

/**
 * Converts a plan_item from the backend into a calendar event object.
 * scheduled_date is "YYYY-MM-DD" string; we turn it into a Date at 08:00 local time.
 */
function itemToEvent(item) {
  const normalizedDate = String(item.scheduled_date).slice(0, 10);
  const [year, month, day] = normalizedDate.split('-').map(Number);
  const start = new Date(year, month - 1, day, 8, 0, 0, 0);
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + (item.duration_minutes ?? 60));

  return {
    id: String(item.id),
    type: item.pillar,
    title: item.title,
    description: item.description ?? '',
    start,
    end,
    status: item.status ?? 'todo',
    pillar: item.pillar,
    contentId: item.content_id ?? null,
    scheduledDate: normalizedDate,
    source: 'api',
  };
}

export function PlannerProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [events, setEvents] = useState([]);
  const [plan, setPlan] = useState(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [planError, setPlanError] = useState(null);

  const loadPlan = useCallback(async () => {
    setPlanLoading(true);
    setPlanError(null);
    try {
      const data = await apiGetCurrentPlan();
      const planData = data?.plan ?? null;
      const items = data?.items ?? [];

      setPlan(planData);
      setEvents(items.map(itemToEvent));

      return data;
    } catch (err) {
      setPlanError(err?.message ?? 'Erreur de chargement du plan.');
      throw err;
    } finally {
      setPlanLoading(false);
    }
  }, []);

  // Load the plan automatically once the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadPlan().catch(() => {
        // Not fatal — user may not have a plan yet (pre-diagnostic)
      });
    }
  }, [isAuthenticated, loadPlan]);

  const markDone = useCallback(async (itemId) => {
    try {
      await apiUpdateItemStatus(Number(itemId), 'done');
      setEvents((prev) =>
        prev.map((event) =>
          event.id === String(itemId) ? { ...event, status: 'done' } : event
        )
      );
    } catch (err) {
      console.error('Could not update item status:', err?.message);
    }
  }, []);

  const markTodo = useCallback(async (itemId) => {
    try {
      await apiUpdateItemStatus(Number(itemId), 'todo');
      setEvents((prev) =>
        prev.map((event) =>
          event.id === String(itemId) ? { ...event, status: 'todo' } : event
        )
      );
    } catch (err) {
      console.error('Could not update item status:', err?.message);
    }
  }, []);

  // Keep addEvent for manual scheduling from AlimentationView / SportView / MentalView
  const addEvent = useCallback((eventData) => {
    const start = eventData.start instanceof Date ? eventData.start : new Date(eventData.start);
    const end = eventData.end instanceof Date ? eventData.end : new Date(eventData.end);

    setEvents((prev) => [
      ...prev,
      {
        id: `manual-${Date.now()}`,
        type: eventData.type ?? 'mental',
        title: eventData.title ?? 'Rappel',
        description: eventData.description ?? '',
        start,
        end,
        status: 'todo',
        pillar: eventData.type ?? 'mind',
        contentId: null,
        scheduledDate: null,
        source: 'manual',
        exerciseId: eventData.exerciseId ?? null,
      },
    ]);
  }, []);

  const removeEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  }, []);

  return (
    <PlannerContext.Provider
      value={{
        events,
        plan,
        planLoading,
        planError,
        loadPlan,
        markDone,
        markTodo,
        addEvent,
        removeEvent,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
}
