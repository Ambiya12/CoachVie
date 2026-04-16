import { apiFetch } from './client';

export function apiStartDiagnostic() {
  return apiFetch('/diagnostic/start', { method: 'POST' });
}

/**
 * @param {number} stepNumber - 1, 2, or 3
 * @param {number} sessionId
 * @param {Array<{ questionCode: string, value: number }>} answers
 */
export function apiSaveStep(stepNumber, sessionId, answers) {
  return apiFetch(`/diagnostic/step/${stepNumber}`, {
    method: 'POST',
    body: JSON.stringify({ sessionId, answers }),
  });
}

export function apiSubmitDiagnostic(sessionId) {
  return apiFetch('/diagnostic/submit', {
    method: 'POST',
    body: JSON.stringify({ sessionId }),
  });
}

export function apiGetDiagnosticHistory() {
  return apiFetch('/diagnostic/history');
}
