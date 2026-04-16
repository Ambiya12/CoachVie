import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import styles from '../styles/SharedFooter.module.css';

export default function Footer() {
  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.divider} />
      <div className={styles.grid}>
        <section className={styles.brandCol} aria-labelledby="footer-brand-title">
          <h2 id="footer-brand-title" className={styles.brandTitle}>Franck Chevalier</h2>
          <p className={styles.description}>Un cadre simple pour agir avec constance, clarté et résultats.</p>
          <Button asChild className={styles.primaryAction} variant="secondary">
            <Link to="/signup">
              Commencer mon diagnostic
              <ArrowUpRight size={16} className={styles.icon} />
            </Link>
          </Button>
        </section>

        <section className={styles.newsletterCol} aria-labelledby="footer-newsletter-title">
          <h3 id="footer-newsletter-title" className={styles.sectionTitle}>Newsletter</h3>
          <p id="footer-newsletter-help" className={styles.sectionBody}>
            Un email hebdomadaire: psychologie, nutrition et actions concrètes.
          </p>
          <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
            <label className={styles.srOnly} htmlFor="footer-newsletter-email">
              Votre adresse email
            </label>
            <Input
              id="footer-newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Votre adresse email"
              className={styles.newsletterInput}
              aria-describedby="footer-newsletter-help"
            />
            <Button type="submit" className={styles.newsletterBtn} aria-label="Rejoindre la newsletter">
              Rejoindre
              <Send size={14} />
            </Button>
          </form>
        </section>

        <nav className={styles.exploreCol} aria-label="Liens utiles">
          <div className={styles.exploreGroup}>
            <h3 className={styles.sectionTitle}>Navigation</h3>
            <Link to="/" className={styles.link}>Accueil</Link>
            <Link to="/plan" className={styles.link}>Programme</Link>
            <Link to="/diagnostic" className={styles.link}>Diagnostic</Link>
          </div>
          <div className={styles.exploreGroup}>
            <h3 className={styles.sectionTitle}>Réseaux</h3>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
              Instagram <ArrowUpRight size={16} className={styles.icon} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
              LinkedIn <ArrowUpRight size={16} className={styles.icon} />
            </a>
            <a href="https://tiktok.com/@franck.chevalier" target="_blank" rel="noopener noreferrer" className={styles.link}>
              TikTok <ArrowUpRight size={16} className={styles.icon} />
            </a>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Franck Chevalier. Tous droits réservés.</span>
      </div>
    </footer>
  );
}
