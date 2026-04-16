import { apiFetch } from './client';

export function apiLogin(email, password) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function apiSignup(email, password) {
  return apiFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function apiLogout() {
  return apiFetch('/auth/logout', { method: 'POST' });
}

export function apiGetMe() {
  return apiFetch('/auth/me');
}
