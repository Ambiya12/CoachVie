import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import styles from '../styles/Auth.module.css';

function validatePassword(password) {
  if (password.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères.';
  if (!/[A-Z]/.test(password)) return 'Le mot de passe doit contenir au moins une majuscule.';
  if (!/[0-9]/.test(password)) return 'Le mot de passe doit contenir au moins un chiffre.';
  return null;
}

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await signup(email, password);
      navigate('/diagnostic');
    } catch (err) {
      setError(err?.message ?? 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <Button asChild variant="ghost" className={styles.backLink}>
        <Link to="/">&larr; Retour</Link>
      </Button>

      <h1 className={styles.title}>Créez votre espace personnel</h1>
      <p className={styles.subtitle}>Accédez à un accompagnement sur mesure basé sur votre profil, votre énergie et vos objectifs.</p>
      
      <form onSubmit={handleSignup}>
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
            placeholder="Min. 8 caractères, 1 majuscule, 1 chiffre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        {error ? <p className={styles.errorText}>{error}</p> : null}
        
        <Button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? 'Création...' : 'Créer mon espace'}
        </Button>
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
