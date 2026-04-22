import { useMemo, useState } from 'react';
import {
  BOOKING_WINDOW_DAYS,
  addDays,
  toDateKey,
  formatSlotWindowLabel,
} from '@/lib/consultationUtils';

/**
 * Encapsulates all booking/consultation business logic.
 * Consumes the raw planner data and exposes derived state + handlers.
 */
export function useConsultation({ events, availabilitySlots, bookAvailabilitySlot }) {
  const [selectedSummaryId, setSelectedSummaryId] = useState(null);
  const [selectedDateKey, setSelectedDateKey] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [bookingNotice, setBookingNotice] = useState('');

  const now = useMemo(() => new Date(), []);

  const todayStart = useMemo(() => {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [now]);

  const bookingWindowEnd = useMemo(
    () => addDays(todayStart, BOOKING_WINDOW_DAYS),
    [todayStart]
  );

  const consultationEvents = useMemo(
    () =>
      events
        .filter((e) => e.type === 'consultation')
        .sort((a, b) => a.start.getTime() - b.start.getTime()),
    [events]
  );

  const upcomingConsultation = useMemo(
    () =>
      consultationEvents.find((e) => e.start.getTime() >= now.getTime()) ??
      consultationEvents[0] ??
      null,
    [consultationEvents, now]
  );

  const summaryItems = useMemo(
    () =>
      consultationEvents
        .filter((e) => Boolean(e.sessionSummary?.trim() || e.aiSummary?.trim()))
        .sort((a, b) => b.start.getTime() - a.start.getTime()),
    [consultationEvents]
  );

  const availableSlots = useMemo(
    () =>
      availabilitySlots
        .filter(
          (slot) =>
            slot.status === 'available' &&
            slot.start.getTime() >= now.getTime() &&
            slot.start.getTime() < bookingWindowEnd.getTime()
        )
        .sort((a, b) => a.start.getTime() - b.start.getTime()),
    [availabilitySlots, now, bookingWindowEnd]
  );

  const availableSlotsByDate = useMemo(() => {
    const map = new Map();
    for (const slot of availableSlots) {
      const key = toDateKey(slot.start);
      map.set(key, [...(map.get(key) ?? []), slot]);
    }
    return map;
  }, [availableSlots]);

  const bookingDates = useMemo(
    () => Array.from({ length: BOOKING_WINDOW_DAYS }, (_, i) => addDays(todayStart, i)),
    [todayStart]
  );

  const fallbackDateKey = useMemo(() => {
    const first = bookingDates.find(
      (d) => (availableSlotsByDate.get(toDateKey(d)) ?? []).length > 0
    );
    return first ? toDateKey(first) : toDateKey(bookingDates[0]);
  }, [availableSlotsByDate, bookingDates]);

  const activeDateKey = useMemo(() => {
    const isValid =
      selectedDateKey != null &&
      bookingDates.some((d) => toDateKey(d) === selectedDateKey);
    return isValid ? selectedDateKey : fallbackDateKey;
  }, [bookingDates, fallbackDateKey, selectedDateKey]);

  const selectedDate = useMemo(
    () => bookingDates.find((d) => toDateKey(d) === activeDateKey) ?? bookingDates[0],
    [activeDateKey, bookingDates]
  );

  const slotsForSelectedDate = useMemo(
    () => availableSlotsByDate.get(activeDateKey) ?? [],
    [activeDateKey, availableSlotsByDate]
  );

  const selectedSlot = useMemo(
    () =>
      selectedSlotId
        ? (slotsForSelectedDate.find((s) => s.id === selectedSlotId) ?? null)
        : null,
    [selectedSlotId, slotsForSelectedDate]
  );

  const selectedSummary = useMemo(
    () =>
      summaryItems.find((item) => item.id === selectedSummaryId) ??
      summaryItems[0] ??
      null,
    [summaryItems, selectedSummaryId]
  );

  const selectedDateHeadline = useMemo(
    () =>
      selectedDate?.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }) ?? '',
    [selectedDate]
  );

  const selectedSlotLabel = useMemo(
    () =>
      selectedSlot
        ? formatSlotWindowLabel(selectedSlot.start, selectedSlot.end)
        : '',
    [selectedSlot]
  );

  const handleDateSelect = (dateKey) => {
    setSelectedDateKey(dateKey);
    setSelectedSlotId(null);
    setBookingNotice('');
  };

  const handleSlotSelect = (slotId) => {
    setSelectedSlotId(slotId);
    setBookingNotice('');
  };

  const handleBookSlot = () => {
    if (!selectedSlot) return;
    const didBook = bookAvailabilitySlot(selectedSlot.id);
    if (didBook) {
      setSelectedSlotId(null);
      setBookingNotice('Creneau reserve. Retrouvez votre rendez-vous dans votre planning.');
    } else {
      setBookingNotice("Ce creneau n'est plus disponible. Selectionnez-en un autre.");
    }
  };

  return {
    upcomingConsultation,
    bookingDates,
    activeDateKey,
    availableSlotsByDate,
    selectedDate,
    selectedDateHeadline,
    slotsForSelectedDate,
    selectedSlot,
    selectedSlotLabel,
    hasAnyAvailability: availableSlots.length > 0,
    summaryItems,
    selectedSummaryId,
    setSelectedSummaryId,
    selectedSummary,
    bookingNotice,
    handleDateSelect,
    handleSlotSelect,
    handleBookSlot,
  };
}
