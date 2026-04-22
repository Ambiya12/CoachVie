import React, { useCallback, useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardActionButton from './DashboardActionButton';
import useDismissibleLayer from '../../hooks/useDismissibleLayer';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'settings-ready',
    title: 'Centre de paramètres prêt',
    description: 'Retrouvez vos préférences et votre sécurité dans un espace dédié.',
    href: '/dashboard/settings',
    actionLabel: 'Ouvrir les paramètres',
  },
];

const menuStyle = {
  width: 'min(19rem, calc(100vw - 2rem))',
  background: 'var(--dash-card)',
  borderColor: 'var(--dash-border)',
  boxShadow: 'var(--dash-card-shadow-strong)',
};

const panelStyle = {
  background: 'color-mix(in oklch, var(--dash-page) 24%, white)',
  borderColor: 'var(--dash-border)',
};

export default function DashboardNotificationsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => INITIAL_NOTIFICATIONS);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const handleClearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const handleDismiss = useCallback((notificationId) => {
    setNotifications((current) => current.filter((notification) => notification.id !== notificationId));
  }, []);

  const containerRef = useDismissibleLayer(isOpen, closeMenu);
  const hasNotifications = notifications.length > 0;

  return (
    <div ref={containerRef} className="relative">
      <DashboardActionButton
        aria-label="Afficher les notifications"
        onClick={handleToggle}
        active={isOpen}
        className="relative"
      >
        <Bell size={16} />
        {hasNotifications ? (
          <span
            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full"
            style={{ background: 'var(--dash-accent)' }}
          />
        ) : null}
      </DashboardActionButton>

      {isOpen ? (
        <div
          className="absolute right-0 top-[calc(100%+0.75rem)] rounded-[var(--dash-card-radius)] border p-2"
          style={menuStyle}
        >
          <div className="flex items-center justify-between px-3 pb-2 pt-1">
            <div>
              <p
                className="text-[0.7rem] font-semibold uppercase tracking-[0.12em]"
                style={{ color: 'var(--dash-text-3)' }}
              >
                Notifications
              </p>
              <p className="text-sm font-medium" style={{ color: 'var(--dash-text-1)' }}>
                {hasNotifications ? 'Nouveautés de votre espace' : 'Tout est à jour'}
              </p>
            </div>

            {hasNotifications ? (
              <button
                type="button"
                className="text-xs font-medium"
                style={{ color: 'var(--dash-text-2)' }}
                onClick={handleClearAll}
              >
                Tout effacer
              </button>
            ) : null}
          </div>

          {hasNotifications ? (
            <div className="flex flex-col gap-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="rounded-[var(--dash-card-radius)] border px-3 py-3"
                  style={panelStyle}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: 'var(--dash-accent)' }}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-5" style={{ color: 'var(--dash-text-1)' }}>
                        {notification.title}
                      </p>
                      <p className="mt-1 text-sm leading-5" style={{ color: 'var(--dash-text-2)' }}>
                        {notification.description}
                      </p>
                      <Link
                        to={notification.href}
                        className="mt-2 inline-flex text-sm font-medium no-underline"
                        style={{ color: 'var(--dash-accent)' }}
                        onClick={closeMenu}
                      >
                        {notification.actionLabel}
                      </Link>
                    </div>

                    <button
                      type="button"
                      className="shrink-0 rounded-full p-1"
                      style={{ color: 'var(--dash-text-3)' }}
                      onClick={() => handleDismiss(notification.id)}
                      aria-label={`Masquer ${notification.title}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[var(--dash-card-radius)] border px-3 py-4" style={panelStyle}>
              <p className="text-sm font-semibold" style={{ color: 'var(--dash-text-1)' }}>
                Aucune nouvelle notification
              </p>
              <p className="mt-1 text-sm leading-5" style={{ color: 'var(--dash-text-2)' }}>
                Les rappels et les nouveautés du tableau de bord apparaîtront ici.
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}