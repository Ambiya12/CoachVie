import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import styles from '../styles/Auth.module.css';

export default function Login() {
  return (
    <AuthLayout>
      <Link to="/" className={styles.backLink}>
        &larr; Retour
      </Link>
      
      <h1 className={styles.title}>Connexion</h1>
      <p className={styles.subtitle}>Accédez à votre espace membre.</p>
      
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input 
              className={styles.input} 
              type="email" 
              id="email" 
              placeholder="votre@email.com" 
              required 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Mot de passe</label>
            <input 
              className={styles.input} 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              required 
            />
          </div>
        </div>
        
        <button type="submit" className={styles.submitBtn}>
          Se connecter
        </button>
      </form>
      
      <p className={styles.footerText}>
        Pas encore membre ?
        <Link to="/signup" className={styles.link}>
          Démarrez le coaching
        </Link>
      </p>
    </AuthLayout>
  );
}
