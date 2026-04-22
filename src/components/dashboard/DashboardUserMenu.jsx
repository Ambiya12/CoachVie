import React, { useCallback, useMemo, useState } from 'react';
import { LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import useDismissibleLayer from '../../hooks/useDismissibleLayer';

const menuStyle = {
  width: 'min(18rem, calc(100vw - 2rem))',
  background: 'var(--dash-card)',
  borderColor: 'var(--dash-border)',
  boxShadow: 'var(--dash-card-shadow-strong)',
};

const tileStyle = {
  background: 'color-mix(in oklch, var(--dash-page) 24%, white)',
  borderColor: 'var(--dash-border)',
};

function getInitialsFromEmail(email) {
  const localPart = email?.split('@')[0] ?? '';
  const parts = localPart.split(/[._-]/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
  }

  return localPart.slice(0, 2).toUpperCase() || 'U';
}

function formatRoleLabel(role) {
  if (role === 'admin') {
    return 'Administrateur';
  }

  return 'Membre';
}

export default function DashboardUserMenu() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const initials = useMemo(() => getInitialsFromEmail(user?.email), [user?.email]);
  const roleLabel = useMemo(() => formatRoleLabel(user?.role), [user?.role]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      closeMenu();
      await logout();
      navigate('/login', { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  }, [closeMenu, isLoggingOut, logout, navigate]);

  const containerRef = useDismissibleLayer(isOpen, closeMenu);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full border transition-transform duration-200 hover:scale-[1.04]"
        style={{
          background: isOpen
            ? 'color-mix(in oklch, var(--dash-accent-muted) 72%, white)'
            : 'color-mix(in oklch, var(--dash-accent-muted) 60%, white)',
          borderColor: isOpen
            ? 'color-mix(in oklch, var(--dash-accent) 78%, white)'
            : 'color-mix(in oklch, var(--dash-accent) 65%, white)',
          boxShadow: 'var(--dash-card-shadow)',
        }}
        aria-label="Ouvrir le menu profil"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={handleToggle}
      >
        <span className="text-xs font-semibold leading-none" style={{ color: 'var(--dash-accent)' }}>
          {initials}
        </span>
      </button>

      {isOpen ? (
        <div
          className="absolute right-0 top-[calc(100%+0.75rem)] rounded-[var(--dash-card-radius)] border p-2"
          style={menuStyle}
          role="menu"
          aria-label="Menu profil"
        >
          <div className="rounded-[var(--dash-card-radius)] border px-3 py-3" style={tileStyle}>
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full border"
                style={{
                  background: 'color-mix(in oklch, var(--dash-accent-muted) 68%, white)',
                  borderColor: 'color-mix(in oklch, var(--dash-accent) 42%, white)',
                }}
              >
                <span className="text-sm font-semibold" style={{ color: 'var(--dash-accent)' }}>
                  {initials}
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--dash-text-3)' }}>
                  Session active
                </p>
                <p className="truncate text-sm font-semibold" style={{ color: 'var(--dash-text-1)' }}>
                  {user?.email ?? 'Compte connecté'}
                </p>
                <p className="text-sm" style={{ color: 'var(--dash-text-2)' }}>
                  {roleLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-1">
            <Link
              to="/dashboard/settings"
              className="flex items-center gap-2 rounded-[0.95rem] px-3 py-2 text-sm font-medium no-underline"
              style={{ color: 'var(--dash-text-1)' }}
              role="menuitem"
              onClick={closeMenu}
            >
              <Settings size={15} />
              Paramètres du compte
            </Link>

            <button
              type="button"
              className="flex items-center gap-2 rounded-[0.95rem] px-3 py-2 text-sm font-medium"
              style={{ color: '#A44034' }}
              role="menuitem"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut size={15} />
              {isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}