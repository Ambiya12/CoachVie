export const BOOKING_WINDOW_DAYS = 14;

export function formatDateLabel(date) {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatTimeLabel(date) {
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function addDays(baseDate, offset) {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + offset);
  return date;
}

export function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatMiniDayLabel(date) {
  return date.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '');
}

export function formatDateChipLabel(date) {
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export function formatSlotWindowLabel(start, end) {
  return `${formatTimeLabel(start).replace(':', 'h')} a ${formatTimeLabel(end).replace(':', 'h')}`;
}
