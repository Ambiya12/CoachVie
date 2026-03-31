import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from '../styles/SharedFooter.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.divider} />
      <div className={styles.grid}>
        <div className={styles.brandCol}>
          <h2 className={styles.brandTitle}>Franck Chevalier</h2>
          <p className={styles.description}>
            L'expertise d'un accompagnement holistique, concu pour l'alignement profond de soi.
          </p>
        </div>

        <div className={styles.navCol}>
          <div className={styles.sectionTitle}>Navigation</div>
          <span className={styles.link}>Accueil</span>
          <span className={styles.link}>Programme</span>
          <span className={styles.link}>Contact</span>
        </div>

        <div className={styles.socialCol}>
          <div className={styles.sectionTitle}>Reseaux</div>
          <span className={styles.link}>
            Instagram <ArrowUpRight className={styles.icon} />
          </span>
          <span className={styles.link}>
            LinkedIn <ArrowUpRight className={styles.icon} />
          </span>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Franck Chevalier. Tous droits reserves.</span>
      </div>
    </footer>
  );
}
