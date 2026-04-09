import React from 'react';
import { ArrowUpRight, Send } from 'lucide-react';
import styles from '../styles/SharedFooter.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.divider} />
      <div className={styles.grid}>
        <div className={styles.brandCol}>
          <h2 className={styles.brandTitle}>Franck Chevalier</h2>
          <p className={styles.description}>
            L'expertise d'un accompagnement holistique, conçu pour l'alignement profond de soi.
          </p>
        </div>

        <div className={styles.newsletterCol}>
          <div className={styles.sectionTitle}>Newsletter</div>
          <p className={styles.description} style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
            Rejoignez ma liste privée pour recevoir des conseils exclusifs sur la mentalité et la nutrition.
          </p>
          <div className={styles.newsletterInputWrapper}>
            <input type="email" placeholder="Votre adresse email..." className={styles.newsletterInput} />
            <button className={styles.newsletterBtn}>Rejoindre</button>
          </div>
        </div>

        <div className={styles.navCol}>
          <div className={styles.sectionTitle}>Navigation</div>
          <span className={styles.link}>Accueil</span>
          <span className={styles.link}>Programme</span>
          <span className={styles.link}>Contact</span>
        </div>

        <div className={styles.socialCol}>
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
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Franck Chevalier. Tous droits réservés.</span>
      </div>
    </footer>
  );
}
