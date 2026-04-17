import React from 'react';
import styles from '../../styles/ComingSoon.module.css';

export default function ComingSoon({ title, icon: Icon }) {
  return (
    <div className={styles.shell}>
      <div className={styles.block}>
        <hr className={styles.rule} />

        <div className={styles.inner}>
          <div className={styles.statusRow}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span className={styles.statusLabel}>En cours de conception</span>
          </div>

          <div className={styles.titleRow}>
            <h2 className={styles.title}>{title}</h2>
            {Icon && (
              <div className={styles.iconWrap} aria-hidden="true">
                <Icon size={16} strokeWidth={1.25} />
              </div>
            )}
          </div>

          <p className={styles.description}>
            Cette section est en cours de développement.<br />
            Elle sera bientôt disponible.
          </p>

          <div className={styles.sweepTrack} aria-hidden="true">
            <div className={styles.sweepLine} />
          </div>
        </div>

        <hr className={styles.rule} />
      </div>
    </div>
  );
}
