const DETAILING_ADMIN_SESSION_KEY = "detailingAdminSession";

export interface DetailingAdminSession {
  email: string;
  name: string;
  loggedInAt: string;
}

export function isDetailingAdminAuthed(): boolean {
  if (typeof sessionStorage === "undefined") return false;
  return sessionStorage.getItem(DETAILING_ADMIN_SESSION_KEY) !== null;
}

export function getDetailingAdminSession(): DetailingAdminSession | null {
  const raw = sessionStorage.getItem(DETAILING_ADMIN_SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DetailingAdminSession;
  } catch {
    return null;
  }
}

export function loginDetailingAdmin(email: string, name: string) {
  const session: DetailingAdminSession = {
    email,
    name,
    loggedInAt: new Date().toISOString(),
  };
  sessionStorage.setItem(DETAILING_ADMIN_SESSION_KEY, JSON.stringify(session));
}

export function logoutDetailingAdmin() {
  sessionStorage.removeItem(DETAILING_ADMIN_SESSION_KEY);
}
