import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import styles from '../styles/Auth.module.css';

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <AuthLayout>
      <Link to="/" className={styles.backLink}>
        &larr; Retour
      </Link>

      <h1 className={styles.title}>Créez votre espace personnel</h1>
      <p className={styles.subtitle}>Accédez à un accompagnement sur mesure basé sur votre profil, votre énergie et vos objectifs.</p>
      
      <form onSubmit={handleSignup}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">Nom</label>
          <input 
            className={styles.input} 
            type="text" 
            id="name" 
            placeholder="Nom"
            required 
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="surname">Prénom</label>
          <input 
            className={styles.input} 
            type="text" 
            id="surname" 
            placeholder="Prénom" 
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

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="phone">Téléphone (optionnel)</label>
          <input 
            className={styles.input} 
            type="tel" 
            id="phone" 
            placeholder="+33 6 12 34 56 78" 
          />
        </div>
        
        <button type="submit" className={styles.submitBtn}>
          Créer mon espace
        </button>
      </form>
      
      <p className={styles.footerText} style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
        Vos informations restent strictement confidentielles.
      </p>

      <p className={styles.footerText}>
        Déjà membre ?
        <Link to="/login" className={styles.link}>
          Se connecter
        </Link>
      </p>
    </AuthLayout>
  );
}
