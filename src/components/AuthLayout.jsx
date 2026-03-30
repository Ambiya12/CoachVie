import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Auth.module.css';

export default function AuthLayout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link to="/" className={styles.brandName}>Franck Chevalier</Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.formWrapper}>
          {children}
        </div>
      </main>
    </div>
  );
}
