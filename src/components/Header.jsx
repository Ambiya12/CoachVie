import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/SharedHeader.module.css';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const profileTriggerRef = useRef(null);
  const firstProfileItemRef = useRef(null);
  const secondProfileItemRef = useRef(null);

  const closeProfileMenu = useCallback((restoreFocus = false) => {
    setIsProfileOpen(false);

    if (restoreFocus) {
      requestAnimationFrame(() => {
        profileTriggerRef.current?.focus();
      });
    }
  }, []);

  useEffect(() => {
    if (!isProfileOpen) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        closeProfileMenu();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeProfileMenu(true);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    requestAnimationFrame(() => {
      firstProfileItemRef.current?.focus();
    });

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isProfileOpen, closeProfileMenu]);

  const isDashboardTabActive = (tab) => {
    if (location.pathname !== '/dashboard') {
      return false;
    }

    const params = new URLSearchParams(location.search);
    const currentTab = params.get('tab') || 'espace';
    return currentTab === tab;
  };

  const getTabClassName = (tab) =>
    `${styles.navLink} ${isDashboardTabActive(tab) ? styles.active : ''}`.trim();

  const getTabAriaCurrent = (tab) => (isDashboardTabActive(tab) ? 'page' : undefined);

  const handleLogout = () => {
    closeProfileMenu();
    logout();
    navigate('/');
  };

  const handleGoToProfile = () => {
    closeProfileMenu();
    navigate('/dashboard?tab=espace');
  };

  const handleProfileTriggerKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      setIsProfileOpen(true);
    }
  };

  const handleProfileMenuKeyDown = (event) => {
    if (event.key === 'Tab') {
      closeProfileMenu();
      return;
    }

    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }

    event.preventDefault();

    const menuItems = [firstProfileItemRef.current, secondProfileItemRef.current].filter(Boolean);

    if (!menuItems.length) {
      return;
    }

    const activeIndex = menuItems.findIndex((item) => item === document.activeElement);
    const delta = event.key === 'ArrowDown' ? 1 : -1;
    const nextIndex = activeIndex === -1 ? 0 : (activeIndex + delta + menuItems.length) % menuItems.length;
    menuItems[nextIndex]?.focus();
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
                ref={profileTriggerRef}
                className={styles.profileTrigger}
                onClick={() => setIsProfileOpen((prevState) => !prevState)}
                onKeyDown={handleProfileTriggerKeyDown}
                aria-expanded={isProfileOpen}
                aria-haspopup="menu"
                aria-controls="header-profile-menu"
                aria-label="Ouvrir le menu profil"
              >
                <User size={16} />
                <ChevronDown size={14} className={isProfileOpen ? styles.chevronOpen : ''} />
              </button>

              {isProfileOpen ? (
                <div
                  id="header-profile-menu"
                  className={styles.profileMenu}
                  role="menu"
                  aria-label="Actions du profil"
                  onKeyDown={handleProfileMenuKeyDown}
                >
                  <button
                    type="button"
                    className={styles.profileMenuItem}
                    role="menuitem"
                    ref={firstProfileItemRef}
                    onClick={handleGoToProfile}
                  >
                    Profil
                  </button>
                  <button
                    type="button"
                    className={styles.profileMenuItem}
                    role="menuitem"
                    ref={secondProfileItemRef}
                    onClick={handleLogout}
                  >
                    Deconnexion
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
