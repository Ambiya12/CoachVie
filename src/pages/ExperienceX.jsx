import React from 'react';
import { Target, Users, Eye, ArrowRight } from 'lucide-react';
import styles from '../styles/ExperienceX.module.css';

const cards = [
  {
    icon: <Target size={22} strokeWidth={1.5} />,
    title: 'Coach de Vie',
    desc: 'Libérez-vous de vos blocages intérieurs par la simple observation consciente.',
    label: 'Explorer',
    href: '#',
  },
  {
    icon: <Users size={22} strokeWidth={1.5} />,
    title: 'Stages',
    desc: 'Immersions collectives transformatrices pour dissoudre les conditionnements.',
    label: "S'inscrire",
    href: '#',
  },
  {
    icon: <Eye size={22} strokeWidth={1.5} />,
    title: 'Formation',
    desc: "Apprendre à voir l'inconscient en soi et chez les autres avec clarté.",
    label: 'En savoir plus',
    href: '#',
  },
];

export default function ExperienceX() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <span className={styles.brand}>Franck Chevalier</span>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          {/* Hero */}
          <section className={styles.heroWrap}>
            <div className={styles.heroInner}>
              <h1 className={styles.heroHeading}>
                Ne gache plus un seul instant de ta vie,&nbsp;vie tous a fond.
              </h1>
              <p className={styles.heroSubtitle}>
                Vous n&apos;avez pas à vous transformer, mais à vous reconnaître.
              </p>
            </div>
          </section>

          {/* Cards */}
          <section className={styles.cardsSection}>
            <hr className={styles.cardsDivider} />
            <div className={styles.cards}>
              {cards.map((card) => (
                <div key={card.title} className={styles.card}>
                  <div className={styles.cardIcon}>{card.icon}</div>
                  <h2 className={styles.cardTitle}>{card.title}</h2>
                  <p className={styles.cardDesc}>{card.desc}</p>
                  <a href={card.href} className={styles.cardLink}>
                    {card.label}&nbsp;<ArrowRight size={11} strokeWidth={2} />
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CTA Band */}
        <div className={styles.ctaOuter}>
          <div className={styles.cta}>
            <p className={styles.ctaHeading}>Êtes-vous prêt à vous reconnaître&nbsp;?</p>
            <div className={styles.ctaActions}>
              <a href="mailto:contact@franckchevalier.com" className={styles.ctaBtnPrimary}>
                Prendre contact
              </a>
              <a href="#" className={styles.ctaBtnGhost}>
                Découvrir la méthode
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
