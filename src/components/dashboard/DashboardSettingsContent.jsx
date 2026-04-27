import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Bell, CheckCircle2, ChevronRight, LogOut, Shield, UserCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const SETTINGS_STORAGE_KEY = 'coachvie.dashboard.preferences';

const DEFAULT_PREFERENCES = {
  inAppNotifications: true,
  weeklySummary: true,
  coachReminders: false,
};

const PREFERENCE_FIELDS = [
  {
    key: 'inAppNotifications',
    label: 'Notifications dans le tableau de bord',
    description: 'Afficher les nouveautés et les rappels dans le centre de notifications.',
  },
  {
    key: 'weeklySummary',
    label: 'Résumé hebdomadaire',
    description: 'Conserver un récapitulatif visible dans votre espace personnel.',
  },
  {
    key: 'coachReminders',
    label: 'Rappels d’accompagnement',
    description: 'Mettre en avant les rappels importants dès l’ouverture du dashboard.',
  },
];

const cardStyle = {
  background: 'var(--dash-card)',
  borderColor: 'var(--dash-border)',
  boxShadow: 'var(--dash-card-shadow)',
};

const heroStyle = {
  ...cardStyle,
  background:
    'linear-gradient(135deg, color-mix(in oklch, var(--dash-accent-muted) 80%, white), var(--dash-card) 62%)',
};

const tileStyle = {
  background: 'color-mix(in oklch, var(--dash-page) 24%, white)',
  borderColor: 'var(--dash-border)',
};

function loadPreferences() {
  if (typeof window === 'undefined') {
    return DEFAULT_PREFERENCES;
  }

  try {
    const storedPreferences = window.localStorage.getItem(SETTINGS_STORAGE_KEY);

    if (!storedPreferences) {
      return DEFAULT_PREFERENCES;
    }

    return {
      ...DEFAULT_PREFERENCES,
      ...JSON.parse(storedPreferences),
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

function formatRoleLabel(role) {
  if (role === 'admin') {
    return 'Administrateur';
  }

  return 'Membre';
}

function PreferenceToggle({ checked, description, label, onToggle }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className="flex w-full items-center justify-between gap-4 rounded-[var(--dash-card-radius)] border px-4 py-4 text-left"
      style={tileStyle}
      onClick={onToggle}
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold" style={{ color: 'var(--dash-text-1)' }}>
          {label}
        </span>
        <span className="mt-1 block text-sm leading-5" style={{ color: 'var(--dash-text-2)' }}>
          {description}
        </span>
      </span>

      <span
        className="relative h-7 w-12 shrink-0 rounded-full border transition-colors"
        style={{
          background: checked
            ? 'color-mix(in oklch, var(--dash-accent-muted) 86%, white)'
            : 'color-mix(in oklch, var(--dash-page) 65%, white)',
          borderColor: checked
            ? 'color-mix(in oklch, var(--dash-accent) 36%, white)'
            : 'var(--dash-border)',
        }}
      >
        <span
          className="absolute top-0.5 h-5.5 w-5.5 rounded-full transition-all"
          style={{
            left: checked ? '1.45rem' : '0.2rem',
            background: checked ? 'var(--dash-accent)' : 'white',
            boxShadow: '0 4px 12px rgba(26, 35, 55, 0.14)',
          }}
        />
      </span>
    </button>
  );
}

function SettingsMetaRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-[var(--dash-card-radius)] border px-4 py-4" style={tileStyle}>
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full border"
        style={{
          background: 'color-mix(in oklch, var(--dash-page) 24%, white)',
          borderColor: 'var(--dash-border)',
          color: 'var(--dash-accent)',
        }}
      >
        {React.createElement(icon, { size: 18 })}
      </span>

      <div className="min-w-0">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--dash-text-3)' }}>
          {label}
        </p>
        <p className="truncate text-sm font-semibold" style={{ color: 'var(--dash-text-1)' }}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default function DashboardSettingsContent() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [preferences, setPreferences] = useState(() => loadPreferences());
  const [saveState, setSaveState] = useState('idle');

  const roleLabel = useMemo(() => formatRoleLabel(user?.role), [user?.role]);

  const handleTogglePreference = useCallback((preferenceKey) => {
    setPreferences((current) => ({
      ...current,
      [preferenceKey]: !current[preferenceKey],
    }));
    setSaveState('idle');
  }, []);

  const handleSavePreferences = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(preferences));
      setSaveState('saved');
    } catch {
      setSaveState('error');
    }
  }, [preferences]);

  const handleLogout = useCallback(async () => {
    await logout();
    navigate('/login', { replace: true });
  }, [logout, navigate]);

  useEffect(() => {
    if (saveState !== 'saved') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setSaveState('idle');
    }, 2200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [saveState]);

  return (
    <div className="flex flex-col gap-5 xl:gap-6">
      <section className="rounded-[var(--dash-card-radius)] border p-5 md:p-7" style={heroStyle}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--dash-text-3)' }}>
              Paramètres
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] md:text-[2.35rem]" style={{ color: 'var(--dash-text-1)' }}>
              Pilotez votre espace personnel
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 md:text-base" style={{ color: 'var(--dash-text-2)' }}>
              Gérez vos préférences locales, consultez les informations de votre session et sortez proprement de votre espace.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium no-underline"
              style={{
                color: 'var(--dash-text-1)',
                borderColor: 'var(--dash-border)',
                background: 'var(--dash-card)',
              }}
            >
              Retour à l’accueil
              <ChevronRight size={15} />
            </Link>

            <button
              type="button"
              className="rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                color: '#f7f4ee',
                background: 'var(--dash-accent)',
                boxShadow: '0 14px 28px rgba(19, 81, 170, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--dash-accent-strong)';
                e.currentTarget.style.boxShadow = '0 18px 34px rgba(19, 81, 170, 0.24)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--dash-accent)';
                e.currentTarget.style.boxShadow = '0 14px 28px rgba(19, 81, 170, 0.2)';
              }}
              onClick={handleSavePreferences}
            >
              Enregistrer mes préférences
            </button>
          </div>
        </div>

        <div className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-sm" style={tileStyle}>
          {saveState === 'saved' ? <CheckCircle2 size={16} style={{ color: 'var(--dash-accent)' }} /> : <Bell size={16} style={{ color: 'var(--dash-accent)' }} />}
          <span style={{ color: saveState === 'error' ? '#A44034' : 'var(--dash-text-1)' }}>
            {saveState === 'saved' && 'Préférences enregistrées sur cet appareil.'}
            {saveState === 'error' && 'Impossible d’enregistrer les préférences localement.'}
            {saveState === 'idle' && 'Les préférences sont enregistrées localement pour le moment.'}
          </span>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] xl:gap-6">
        <section className="rounded-[var(--dash-card-radius)] border p-5" style={cardStyle}>
          <div className="flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full border"
              style={{
                background: 'color-mix(in oklch, var(--dash-accent-muted) 65%, white)',
                borderColor: 'color-mix(in oklch, var(--dash-accent) 36%, white)',
                color: 'var(--dash-accent)',
              }}
            >
              <UserCircle2 size={20} />
            </span>

            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--dash-text-3)' }}>
                Compte
              </p>
              <h2 className="text-xl font-extrabold tracking-[-0.045em]" style={{ color: 'var(--dash-text-1)', lineHeight: 0.98 }}>
                Informations de session
              </h2>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <SettingsMetaRow icon={UserCircle2} label="Adresse email" value={user?.email ?? 'Non disponible'} />
            <SettingsMetaRow icon={Shield} label="Rôle" value={roleLabel} />
            <SettingsMetaRow icon={Bell} label="Stockage" value="Préférences locales sur cet appareil" />
          </div>
        </section>

        <section className="rounded-[var(--dash-card-radius)] border p-5" style={cardStyle}>
          <div className="flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full border"
              style={{
                background: 'color-mix(in oklch, var(--dash-page) 28%, white)',
                borderColor: 'var(--dash-border)',
                color: 'var(--dash-accent)',
              }}
            >
              <Bell size={19} />
            </span>

            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--dash-text-3)' }}>
                Préférences locales
              </p>
              <h2 className="text-xl font-extrabold tracking-[-0.045em]" style={{ color: 'var(--dash-text-1)', lineHeight: 0.98 }}>
                Ajustez le fonctionnement de votre dashboard
              </h2>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {PREFERENCE_FIELDS.map((field) => (
              <PreferenceToggle
                key={field.key}
                checked={preferences[field.key]}
                description={field.description}
                label={field.label}
                onToggle={() => handleTogglePreference(field.key)}
              />
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-[var(--dash-card-radius)] border p-5" style={cardStyle}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--dash-text-3)' }}>
              Sécurité
            </p>
            <h2 className="mt-1 text-xl font-extrabold tracking-[-0.045em]" style={{ color: 'var(--dash-text-1)', lineHeight: 0.98 }}>
              Terminer la session ou revenir au tableau de bord
            </h2>
            <p className="mt-2 text-sm leading-6" style={{ color: 'var(--dash-text-2)' }}>
              La déconnexion efface votre session active immédiatement. Les préférences sauvegardées ici restent locales à cet appareil.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium no-underline"
              style={{
                color: 'var(--dash-text-1)',
                borderColor: 'var(--dash-border)',
                background: 'var(--dash-card)',
              }}
            >
              Revenir au dashboard
            </Link>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                color: 'white',
                background: '#A44034',
                boxShadow: '0 14px 28px rgba(164, 64, 52, 0.18)',
              }}
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
