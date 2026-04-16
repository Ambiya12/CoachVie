import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import styles from '../styles/Auth.module.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message ?? 'Identifiants invalides. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <Button asChild variant="ghost" className={styles.backLink}>
        <Link to="/">&larr; Retour</Link>
      </Button>
      
      <h1 className={styles.title}>Connexion</h1>
      <p className={styles.subtitle}>Accédez à votre espace membre.</p>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <Label className={styles.label} htmlFor="email">Email</Label>
          <Input
            className={styles.input}
            type="email"
            id="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <Label className={styles.label} htmlFor="password">Mot de passe</Label>
          <Input
            className={styles.input}
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {error ? <p className={styles.errorText}>{error}</p> : null}
        
        <Button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? 'Connexion...' : 'Se connecter'}
        </Button>
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
