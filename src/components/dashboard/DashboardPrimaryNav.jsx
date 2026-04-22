import React, { useCallback, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ALIMENTATION_PATH,
  DASHBOARD_HOME_PATH,
  EXERCISE_PATH,
  PLANNING_PATH,
  PROGRAMMES_PATH,
  SPORT_PATH,
  isProgrammesPath,
} from '@/router/paths';
import useDismissibleLayer from '../../hooks/useDismissibleLayer';

const baseLinkClassName = 'inline-flex min-h-10 items-center justify-center rounded-full border px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.08em] no-underline transition-colors duration-200 hover:bg-[var(--dash-bg)]';

const baseLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  color: 'var(--dash-text-2)',
  whiteSpace: 'nowrap',
  borderColor: 'transparent',
};

const activeLinkStyle = {
  color: 'var(--dash-text-1)',
  borderColor: 'color-mix(in oklch, var(--dash-accent) 44%, white)',
  background: 'color-mix(in oklch, var(--dash-accent-muted) 62%, white)',
};

const dropdownShellStyle = {
  borderColor: 'transparent',
};

const activeDropdownShellStyle = {
  borderColor: 'color-mix(in oklch, var(--dash-accent) 44%, white)',
  background: 'color-mix(in oklch, var(--dash-accent-muted) 62%, white)',
};

const submenuStyle = {
  background: 'var(--dash-card)',
  borderColor: 'var(--dash-border)',
  boxShadow: 'var(--dash-card-shadow-strong)',
};

const programmeLinks = [
  {
    to: EXERCISE_PATH,
    label: 'Exercise',
    description: 'Exercices et progression',
  },
  {
    to: ALIMENTATION_PATH,
    label: 'Alimentation',
    description: 'Nutrition et habitudes',
  },
  {
    to: SPORT_PATH,
    label: 'Sport',
    description: 'Mouvement et activite',
  },
];

function DashboardNavLink({ children, end = false, onClick, to }) {
  return (
    <NavLink
      end={end}
      to={to}
      className={baseLinkClassName}
      onClick={onClick}
      style={({ isActive }) => ({
        ...baseLinkStyle,
        ...(isActive ? activeLinkStyle : {}),
      })}
    >
      {children}
    </NavLink>
  );
}

function ProgrammeMenuLink({ closeMenu, description, isActive, label, to }) {
  return (
    <Link
      to={to}
      className="rounded-[1rem] border px-3 py-3 no-underline transition-colors duration-200 hover:bg-[var(--dash-bg)]"
      style={{
        borderColor: isActive ? 'color-mix(in oklch, var(--dash-accent) 34%, white)' : 'transparent',
        background: isActive ? 'color-mix(in oklch, var(--dash-accent-muted) 58%, white)' : 'transparent',
      }}
      role="menuitem"
      onClick={closeMenu}
    >
      <p className="text-sm font-semibold text-[var(--dash-text-1)]">{label}</p>
      <p className="mt-1 text-xs leading-5 text-[var(--dash-text-2)]">{description}</p>
    </Link>
  );
};

export default function DashboardPrimaryNav() {
  const location = useLocation();
  const [isProgrammesOpen, setIsProgrammesOpen] = useState(false);
  const isProgrammesRoute = isProgrammesPath(location.pathname);

  const closeProgrammesMenu = useCallback(() => {
    setIsProgrammesOpen(false);
  }, []);

  const toggleProgrammesMenu = useCallback(() => {
    setIsProgrammesOpen((current) => !current);
  }, []);

  const openProgrammesMenu = useCallback(() => {
    setIsProgrammesOpen(true);
  }, []);

  const menuRef = useDismissibleLayer(isProgrammesOpen, closeProgrammesMenu);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Navigation principale du tableau de bord">
      <DashboardNavLink end to={DASHBOARD_HOME_PATH} onClick={closeProgrammesMenu}>
        Mon espace
      </DashboardNavLink>

      <div
        ref={menuRef}
        className="relative flex items-center rounded-full border p-1"
        style={{
          ...dropdownShellStyle,
          ...(isProgrammesRoute || isProgrammesOpen ? activeDropdownShellStyle : {}),
        }}
        onMouseEnter={openProgrammesMenu}
        onMouseLeave={closeProgrammesMenu}
      >
        <NavLink
          to={PROGRAMMES_PATH}
          className="inline-flex min-h-8 items-center rounded-full px-3 text-[0.75rem] font-semibold uppercase tracking-[0.08em] no-underline transition-colors duration-200"
          style={{
            color: isProgrammesRoute ? 'var(--dash-text-1)' : 'var(--dash-text-2)',
          }}
          onClick={closeProgrammesMenu}
        >
          Programmes
        </NavLink>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-[var(--dash-bg)]"
          style={{ color: isProgrammesRoute || isProgrammesOpen ? 'var(--dash-text-1)' : 'var(--dash-text-2)' }}
          onClick={toggleProgrammesMenu}
          aria-label="Afficher les sous-pages Programmes"
          aria-expanded={isProgrammesOpen}
          aria-haspopup="menu"
          aria-controls="dashboard-programmes-menu"
        >
          <ChevronDown size={15} className={isProgrammesOpen ? 'rotate-180 transition-transform duration-200' : 'transition-transform duration-200'} />
        </button>

        {isProgrammesOpen ? (
          <div
            id="dashboard-programmes-menu"
            className="absolute left-0 top-[calc(100%+0.75rem)] z-30 flex min-w-[17rem] flex-col gap-1 rounded-[1.25rem] border p-2"
            style={submenuStyle}
            role="menu"
            aria-label="Sous-navigation Programmes"
          >
            {programmeLinks.map((link) => (
              <ProgrammeMenuLink
                key={link.to}
                {...link}
                isActive={location.pathname === link.to}
                closeMenu={closeProgrammesMenu}
              />
            ))}
          </div>
        ) : null}
      </div>

      <DashboardNavLink
        to={PLANNING_PATH}
        onClick={closeProgrammesMenu}
      >
        Planning
      </DashboardNavLink>
    </nav>
  );
}