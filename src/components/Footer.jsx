import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Send } from 'lucide-react';
import styles from '../styles/SharedFooter.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.divider} />
      <div className={styles.grid}>
        <div className={styles.brandCol}>
          <h2 className={styles.brandTitle}>Franck Chevalier</h2>
          <p className={styles.description}>Un cadre simple pour agir avec constance, clarté et résultats.</p>
          <Link to="/signup" className={styles.primaryAction}>
            Commencer mon diagnostic
            <ArrowUpRight size={16} className={styles.icon} />
          </Link>
        </div>

        <div className={styles.newsletterCol}>
          <div className={styles.sectionTitle}>Newsletter</div>
          <p className={styles.sectionBody}>
            Un email hebdomadaire: psychologie, nutrition et actions concrètes.
          </p>
          <div className={styles.newsletterInputWrapper}>
            <input type="email" placeholder="Votre adresse email..." className={styles.newsletterInput} />
            <button className={styles.newsletterBtn}>
              Rejoindre
              <Send size={14} />
            </button>
          </div>
        </div>

        <div className={styles.exploreCol}>
          <details className={styles.exploreDisclosure}>
            <summary className={styles.exploreSummary}>Explorer plus</summary>
            <div className={styles.exploreGroup}>
              <div className={styles.sectionTitle}>Navigation</div>
              <Link to="/" className={styles.link}>Accueil</Link>
              <Link to="/plan" className={styles.link}>Programme</Link>
              <Link to="/diagnostic" className={styles.link}>Diagnostic</Link>
            </div>
            <div className={styles.exploreGroup}>
              <div className={styles.sectionTitle}>Réseaux</div>
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
          </details>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Franck Chevalier. Tous droits réservés.</span>
      </div>
    </footer>
  );
}
