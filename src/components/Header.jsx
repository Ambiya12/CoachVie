import React, { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    if (!isProfileOpen) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isProfileOpen]);

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

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    navigate('/');
  };

  const handleGoToProfile = () => {
    setIsProfileOpen(false);
    navigate('/dashboard?tab=espace');
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
            <nav className={styles.nav}>
              <Link to="/dashboard?tab=espace" className={getTabClassName('espace')}>
                Mon espace
              </Link>
              <Link to="/dashboard?tab=alimentation" className={getTabClassName('alimentation')}>
                Alimentation
              </Link>
              <Link to="/dashboard?tab=sport" className={getTabClassName('sport')}>
                Sport
              </Link>
              <Link to="/dashboard?tab=mental" className={getTabClassName('mental')}>
                Liberation esprit
              </Link>
            </nav>

            <div className={styles.profileMenuContainer} ref={profileMenuRef}>
              <button
                type="button"
                className={styles.profileTrigger}
                onClick={() => setIsProfileOpen((prevState) => !prevState)}
                aria-expanded={isProfileOpen}
                aria-haspopup="menu"
                aria-label="Ouvrir le menu profil"
              >
                <User size={16} />
                <ChevronDown size={14} className={isProfileOpen ? styles.chevronOpen : ''} />
              </button>

              {isProfileOpen ? (
                <div className={styles.profileMenu} role="menu">
                  <button type="button" className={styles.profileMenuItem} onClick={handleGoToProfile}>
                    Profil
                  </button>
                  <button type="button" className={styles.profileMenuItem} onClick={handleLogout}>
                    Deconnexion
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
      <div className={styles.divider} />
    </header>
  );
}
