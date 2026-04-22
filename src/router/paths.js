export const DASHBOARD_HOME_PATH = '/dashboard';
export const DASHBOARD_SETTINGS_PATH = '/dashboard/settings';
export const PROGRAMMES_PATH = '/programmes';
export const EXERCISE_PATH = '/programmes/exercise';
export const ALIMENTATION_PATH = '/programmes/alimentation';
export const SPORT_PATH = '/programmes/sport';
export const PLANNING_PATH = '/planning';
export const CONSULTATION_PATH = '/consultation';

export function isProgrammesPath(pathname = '') {
  return pathname === PROGRAMMES_PATH || pathname.startsWith(`${PROGRAMMES_PATH}/`);
}

export function isPlanningPath(pathname = '') {
  return pathname === PLANNING_PATH || pathname.startsWith(`${PLANNING_PATH}/`);
}

export function isConsultationPath(pathname = '') {
  return pathname === CONSULTATION_PATH || pathname.startsWith(`${CONSULTATION_PATH}/`);
}

export function isDashboardShellPath(pathname = '') {
  return pathname === DASHBOARD_HOME_PATH
    || pathname.startsWith(`${DASHBOARD_HOME_PATH}/`)
    || isProgrammesPath(pathname)
    || isPlanningPath(pathname)
    || isConsultationPath(pathname);
}
