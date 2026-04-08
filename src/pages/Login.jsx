import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Auth.module.css';

export default function Login() {
  const navigate = useNavigate();
  const { login, demoCredentials } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setError('');
    navigate('/dashboard');
  };

  return (
    <AuthLayout>
      <Link to="/" className={styles.backLink}>
        &larr; Retour
      </Link>
      
      <h1 className={styles.title}>Connexion</h1>
      <p className={styles.subtitle}>Accédez à votre espace membre.</p>

      <p className={styles.helperText}>
        Compte test: {demoCredentials.email} / {demoCredentials.password}
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input 
            className={styles.input} 
            type="email" 
            id="email" 
            placeholder="votre@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        {error ? <p className={styles.errorText}>{error}</p> : null}
        
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
