import { apiFetch } from './client';

export function apiGetCurrentPlan() {
  return apiFetch('/plan/current');
}

/**
 * @param {string} date - ISO date string YYYY-MM-DD
 */
export function apiGetDayItems(date) {
  return apiFetch(`/plan/${date}/items`);
}

/**
 * @param {number} itemId
 * @param {'todo'|'done'} status
 */
export function apiUpdateItemStatus(itemId, status) {
  return apiFetch(`/plan/item/${itemId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
