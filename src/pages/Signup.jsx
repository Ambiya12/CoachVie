import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import styles from '../styles/Auth.module.css';

export default function Signup() {
  return (
    <AuthLayout>
      <Link to="/" className={styles.backLink}>
        &larr; Retour
      </Link>

      <h1 className={styles.title}>Inscription</h1>
      <p className={styles.subtitle}>Démarrez votre coaching dès aujourd'hui.</p>
      
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Nom complet</label>
            <input 
              className={styles.input} 
              type="text" 
              id="name" 
              placeholder="John Doe" 
              required 
            />
          </div>

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
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="phone">Numéro de téléphone (optionnel)</label>
            <input 
              className={styles.input} 
              type="tel" 
              id="phone" 
              placeholder="+33 6 12 34 56 78" 
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
          Créer mon compte
        </button>
      </form>
      
      <p className={styles.footerText}>
        Déjà membre ?
        <Link to="/login" className={styles.link}>
          Se connecter
        </Link>
      </p>
    </AuthLayout>
  );
}
