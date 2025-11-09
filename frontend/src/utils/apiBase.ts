const envBase = process.env.REACT_APP_SHADOWCHAIN_API_BASE;
const trimmedBase = typeof envBase === 'string' ? envBase.trim() : undefined;

const defaultBase =
  trimmedBase !== undefined
    ? trimmedBase
    : process.env.NODE_ENV === 'production'
      ? ''
      : 'http://localhost:8899';

const normalizedBase =
  defaultBase && defaultBase !== '/'
    ? defaultBase.replace(/\/$/, '')
    : '';

export const API_BASE = normalizedBase;

const normalizePath = (path: string) => (path.startsWith('/') ? path : `/${path}`);

export function apiUrl(path: string): string {
  const normalizedPath = normalizePath(path);
  if (!API_BASE) {
    return normalizedPath;
  }

  return `${API_BASE}${normalizedPath}`;
}

export function wsUrl(path: string): string {
  const normalizedPath = normalizePath(path);

  if (API_BASE) {
    try {
      const url = new URL(API_BASE + normalizedPath);
      url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
      return url.toString();
    } catch {
      return (API_BASE + normalizedPath).replace(/^http/i, 'ws');
    }
  }

  if (typeof window !== 'undefined' && window.location) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${protocol}//${window.location.host}${normalizedPath}`;
  }

  return `ws://localhost:8899${normalizedPath}`;
}
