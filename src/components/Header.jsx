import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/SharedHeader.module.css';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const profileMenuRef = useRef(null);

  const isDashboardTabActive = (tab) => {
    if (location.pathname !== '/dashboard') return false;
    const params = new URLSearchParams(location.search);
    return (params.get('tab') || 'espace') === tab;
  };

  const getTabClassName = (tab) =>
    `${styles.navLink} ${isDashboardTabActive(tab) ? styles.active : ''}`.trim();

  const getTabAriaCurrent = (tab) => (isDashboardTabActive(tab) ? 'page' : undefined);

  useEffect(() => {
    if (!isProfileMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isProfileMenuOpen]);

  const handleOpenProfile = () => {
    setIsProfileMenuOpen(false);
    navigate('/dashboard?tab=espace');
  };

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await logout();
      setIsProfileMenuOpen(false);
      navigate('/login', { replace: true });
      window.location.replace('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          Franck Chevalier
        </Link>

        {!isAuthenticated ? (
          <Link to="/login" className={styles.accountLink}>
            Mon Compte
          </Link>
        ) : (
          <div className={styles.authNavGroup}>
            <nav className={styles.nav} aria-label="Navigation du tableau de bord">
              <Link
                to="/dashboard?tab=espace"
                className={getTabClassName('espace')}
                aria-current={getTabAriaCurrent('espace')}
              >
                Mon espace
              </Link>
              <Link
                to="/dashboard?tab=alimentation"
                className={getTabClassName('alimentation')}
                aria-current={getTabAriaCurrent('alimentation')}
              >
                Alimentation
              </Link>
              <Link
                to="/dashboard?tab=sport"
                className={getTabClassName('sport')}
                aria-current={getTabAriaCurrent('sport')}
              >
                Sport
              </Link>
              <Link
                to="/dashboard?tab=mental"
                className={getTabClassName('mental')}
                aria-current={getTabAriaCurrent('mental')}
              >
                Libération esprit
              </Link>
            </nav>

            <div className={styles.profileMenuContainer} ref={profileMenuRef}>
                <button
                  type="button"
                  className={styles.profileTrigger}
                  aria-label="Ouvrir le menu profil"
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="menu"
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                >
                  <User size={16} />
                  <ChevronDown size={14} className={isProfileMenuOpen ? styles.chevronOpen : ''} />
                </button>
              {isProfileMenuOpen ? (
                <div className={styles.profileMenu} role="menu" aria-label="Menu profil">
                  <button
                    type="button"
                    className={styles.profileMenuItem}
                    role="menuitem"
                    onClick={handleOpenProfile}
                  >
                    Profil
                  </button>
                  <button
                    type="button"
                    className={styles.profileMenuItem}
                    role="menuitem"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
