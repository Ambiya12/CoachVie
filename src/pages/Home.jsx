import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import franckPhoto from '../assets/Franck.jpg';
import styles from './HomeOverrides.module.css';

const featureCards = [
  {
    id: 'cadre',
    tone: 'graphite',
    title: 'Cadre initial',
    text: 'Un point de depart clair pour lire votre contexte, vos contraintes et ce qui doit vraiment bouger.',
    variant: 'featureCard',
  },
  {
    id: 'lecture',
    tone: 'graphite',
    title: 'Lecture simple',
    text: 'Les priorites restent visibles, meme quand les semaines se chargent ou changent de rythme.',
    variant: 'featureCard',
  },
  {
    id: 'suivi',
    tone: 'graphite',
    title: 'Suivi direct',
    text: 'Chaque ajustement reste lie a une action concrete, sans couche de complexite en plus.',
    variant: 'featureCard',
  },
  {
    id: 'tenue',
    tone: 'graphite',
    title: 'Tenue dans le temps',
    text: 'Le coaching reste gratuit, disponible sur 6 ou 12 mois, avec un cadre fait pour durer.',
    variant: 'featureCard',
  },
];

const principles = [
  {
    title: 'Observer sans dramatiser',
    text: 'Vous voyez ce qui fatigue, ce qui disperse et ce qui tient vraiment.',
  },
  {
    title: 'Choisir un seul axe a la fois',
    text: 'Chaque semaine garde une priorite, pour avancer proprement sans bruit visuel ni mental.',
  },
  {
    title: 'Ajuster sans recommencer',
    text: 'Le cadre s adapte a votre contexte au lieu de casser des qu une semaine devient dense.',
  },
];

const faqs = [
  {
    question: 'A qui s adresse cet accompagnement ?',
    answer:
      'A des personnes qui veulent remettre de l ordre dans leur energie, leur corps et leur rythme de travail sans entrer dans un systeme trop demonstratif.',
  },
  {
    question: 'Que se passe-t-il pendant le premier echange ?',
    answer:
      'Vous exposez votre contexte, vos blocages actuels et ce que vous essayez deja. Le but est de savoir si un diagnostic court suffit ou si un suivi continu est plus juste.',
  },
  {
    question: 'Est-ce que le cadre est tres strict ?',
    answer:
      'Non. Il est net, mais il reste humain. La structure sert a rendre vos decisions plus simples, pas a vous enfermer.',
  },
];

const testimonials = [
  {
    name: 'Nora Bensaid',
    role: 'Fondatrice, studio de creation',
    quote:
      'J avais surtout besoin d une structure plus calme. Le travail a remis de l ordre dans mes semaines, pas seulement dans mon agenda.',
  },
  {
    name: 'Sarah El Atri',
    role: 'Consultante independante',
    quote:
      'Le changement n a pas ete spectaculaire. Il a surtout ete tenable, et c est la premiere fois que ca dure.',
  },
];

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 11L11 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
      <path d="M4 3H11V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

function WindowChrome() {
  return (
    <div className={styles.windowChrome} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function QuoteSwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeQuote = testimonials[activeIndex];

  return (
    <section className={styles.quotePanel} data-reveal>
      <div className={styles.sectionHeaderCompact}>
        <p className={styles.sectionEyebrow}>Retour d experience</p>
        <h2 className={styles.sectionTitleSmall}>Un cadre plus calme donne souvent de meilleurs resultats.</h2>
      </div>

      <blockquote className={styles.quoteCard}>
        <p className={styles.quoteText}>&ldquo;{activeQuote.quote}&rdquo;</p>
        <footer className={styles.quoteFooter}>
          <div>
            <div className={styles.quoteName}>{activeQuote.name}</div>
            <div className={styles.quoteRole}>{activeQuote.role}</div>
          </div>

          <div className={styles.quoteTabs}>
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={`${styles.quoteTab} ${index === activeIndex ? styles.quoteTabActive : ''}`.trim()}
                onClick={() => setActiveIndex(index)}
              >
                {String(index + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
        </footer>
      </blockquote>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.ambientLayer} aria-hidden="true" />

      <section className={styles.hero}>
        <div className={styles.shell}>
          <div className={`${styles.heroLayout} ${styles.reveal}`} data-reveal>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroTitle}>Le meme calme que votre dashboard, des la premiere page.</h1>
              <p className={styles.heroLead}>
                Un accompagnement structure comme un espace de travail propre: lisible, direct, et pense pour avancer sans friction inutile.
              </p>

              <div className={styles.heroActions}>
                <Link to="/signup" className={styles.primaryAction}>
                  Commencer
                  <ArrowIcon />
                </Link>
              </div>
            </div>

            <aside className={styles.heroWorkbench}>
              <WindowChrome />
              <div className={styles.workbenchBody}>
                <figure className={styles.heroPortrait}>
                  <img src={franckPhoto} alt="Franck Chevalier" className={styles.heroPortraitImage} />
                  <figcaption className={styles.heroPortraitCaption}>
                    <span className={styles.heroPortraitName}>Franck Chevalier</span>
                    <span className={styles.heroPortraitRole}>Coaching individuel. Structure claire. Rythme durable.</span>
                    <p className={styles.heroPortraitBio}>
                      Il accompagne des routines denses avec une methode sobre, concrete et assez stable pour tenir dans la vraie vie.
                    </p>
                  </figcaption>
                </figure>

                <div className={styles.workbenchSection}>
                  <p className={styles.workbenchLabel}>Cadre de travail</p>
                  <h2 className={styles.workbenchTitle}>Une structure lisible pour des semaines chargees.</h2>
                </div>

                <div className={styles.workbenchGrid}>
                  <article className={styles.workbenchCard}>
                    <p className={styles.cardMeta}>Rythme</p>
                    <p className={styles.cardValue}>1 priorite par semaine</p>
                    <p className={styles.cardCopy}>On retire le surplus avant de chercher plus d intensite.</p>
                  </article>

                  <article className={styles.workbenchCard}>
                    <p className={styles.cardMeta}>Points de controle</p>
                    <ul className={styles.workbenchList}>
                      <li>energie</li>
                      <li>alimentation</li>
                      <li>mouvement</li>
                    </ul>
                  </article>
                </div>

                <div className={styles.shortcutRow}>
                  <span className={styles.shortcutLabel}>Repere quotidien</span>
                  <div className={styles.kbdRow}>
                    <kbd>R</kbd>
                    <kbd>E</kbd>
                    <kbd>V</kbd>
                    <span>respirer, evaluer, valider</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={`${styles.sectionHeader} ${styles.reveal}`} data-reveal>
            <p className={styles.sectionEyebrow}>Method</p>
            <h2 className={styles.sectionTitle}>Une methode compacte, sobre et facile a tenir.</h2>
            <p className={styles.sectionLead}>
              Quatre blocs suffisent pour expliquer le fonctionnement: un cadre net, une lecture simple, un suivi direct, puis une tenue dans le temps.
            </p>
          </div>

          <div className={styles.bentoGrid}>
            {featureCards.map((card, index) => (
              <article
                key={card.id}
                className={`${styles.bentoCard} ${styles[card.variant]} ${styles.reveal}`.trim()}
                data-reveal
                style={{ '--index': index }}
              >
                <span className={`${styles.tag} ${styles[`tag${card.tone.charAt(0).toUpperCase()}${card.tone.slice(1)}`]}`}>
                  {card.title}
                </span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.processSection}`}>
        <div className={styles.shell}>
          <div className={styles.processLayout}>
            <div className={`${styles.processIntro} ${styles.reveal}`} data-reveal>
              <p className={styles.sectionEyebrow}>Methode</p>
              <h2 className={styles.sectionTitle}>Un systeme simple a lire, puis facile a tenir.</h2>
              <p className={styles.sectionLead}>
                Chaque section garde une densite proche du dashboard: moins d air perdu, des blocs mieux relies, et une lecture qui reste stable du debut a la fin.
              </p>
            </div>

            <div className={styles.principlesList}>
              {principles.map((item, index) => (
                <article
                  key={item.title}
                  className={`${styles.principleItem} ${styles.reveal}`.trim()}
                  data-reveal
                  style={{ '--index': index }}
                >
                  <div className={styles.principleNumber}>{String(index + 1).padStart(2, '0')}</div>
                  <div>
                    <h3 className={styles.principleTitle}>{item.title}</h3>
                    <p className={styles.principleText}>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.editorialGrid}>
            <figure className={`${styles.imagePanel} ${styles.reveal}`.trim()} data-reveal>
              <img src={franckPhoto} alt="Franck Chevalier pendant une seance de coaching" className={styles.editorialImage} />
              <figcaption className={styles.imageCaption}>
                L accompagnement cherche une forme de stabilite, pas une demonstration visuelle.
              </figcaption>
            </figure>

            <QuoteSwitcher />
          </div>
        </div>
      </section>

      <section id="formats" className={styles.section}>
        <div className={styles.shell}>
          <div className={`${styles.offerPanel} ${styles.reveal}`} data-reveal>
            <div className={styles.sectionHeaderCompact}>
                <p className={styles.sectionEyebrow}>Formats</p>
                <h2 className={styles.sectionTitleSmall}>Deux points d entree nets, dans la meme logique produit.</h2>
              </div>

            <div className={styles.offerGrid}>
              <article className={styles.offerCard}>
                <p className={styles.cardMeta}>Format libre</p>
                <h3 className={styles.offerTitle}>Accompagnement 6 mois</h3>
                <p className={styles.offerText}>Un cadre gratuit pour installer des bases nettes, retrouver du rythme et stabiliser les habitudes essentielles.</p>
                <Link to="/signup" className={styles.inlineLink}>
                  Rejoindre
                  <ArrowIcon />
                </Link>
              </article>

              <article className={styles.offerCard}>
                <p className={styles.cardMeta}>Format libre</p>
                <h3 className={styles.offerTitle}>Accompagnement 12 mois</h3>
                <p className={styles.offerText}>Une version gratuite plus longue pour garder un cap stable, affiner les ajustements et tenir la progression dans le temps.</p>
                <Link to="/signup" className={styles.inlineLink}>
                  Commencer
                  <ArrowIcon />
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.faqSection}`}>
        <div className={styles.shellNarrow}>
          <div className={`${styles.sectionHeaderCompact} ${styles.reveal}`} data-reveal>
            <p className={styles.sectionEyebrow}>Questions</p>
            <h2 className={styles.sectionTitleSmall}>Les points a clarifier avant de prendre rendez-vous.</h2>
          </div>

          <div className={styles.faqList}>
            {faqs.map((item, index) => (
              <details key={item.question} className={`${styles.faqItem} ${styles.reveal}`.trim()} data-reveal style={{ '--index': index }}>
                <summary className={styles.faqSummary}>
                  <span>{item.question}</span>
                  <span className={styles.faqToggle} aria-hidden="true" />
                </summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
