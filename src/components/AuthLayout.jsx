import React from 'react';
import styles from '../styles/Auth.module.css';

export default function AuthLayout({ children }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.formWrapper}>
          {children}
        </div>
      </main>
    </div>
  );
}
