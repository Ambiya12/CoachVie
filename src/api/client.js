const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4001/api';

export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details ?? null;
  }
}

export async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  // Handle no-content responses
  if (response.status === 204) {
    return null;
  }

  let body;
  try {
    body = await response.json();
  } catch {
    if (!response.ok) {
      throw new ApiError(response.status, `HTTP ${response.status}`);
    }
    return null;
  }

  if (!response.ok) {
    // Fire a global event on 401 so the app can log the user out
    if (response.status === 401) {
      window.dispatchEvent(new CustomEvent('auth:expired'));
    }

    throw new ApiError(
      response.status,
      body?.error?.message ?? body?.message ?? body?.error ?? `HTTP ${response.status}`,
      body?.error?.details ?? body?.details ?? null
    );
  }

  if (body && typeof body === 'object' && 'success' in body && 'data' in body) {
    return body.data;
  }

  return body;
}
