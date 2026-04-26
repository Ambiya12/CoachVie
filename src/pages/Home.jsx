import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Check, Compass, Zap } from 'lucide-react';
import franckPhoto from '../assets/Franck.jpg';
import styles from './HomeOverrides.module.css';

const audiencePoints = [
  'Vous vous sentez bloque malgre votre envie d avancer.',
  'Vous manquez d energie, de clarte ou de constance dans votre quotidien.',
  'Vous ressentez le besoin de reprendre votre vie en main avec un cadre concret.',
  'Vous cherchez un accompagnement a la fois humain, structure et profond.',
];

const missionCards = [
  {
    index: '01',
    title: 'Appel decouverte',
    text: 'Un premier echange pour comprendre votre situation, vos besoins et verifier si l accompagnement est juste pour vous.',
  },
  {
    index: '02',
    title: 'Coaching individuel',
    text: 'Un suivi personnel pour remettre de la clarte dans votre quotidien et avancer avec une structure simple.',
  },
  {
    index: '03',
    title: 'Stage immersif',
    text: 'Un temps fort pour sortir du rythme habituel, prendre du recul et enclencher un mouvement plus net.',
  },
  {
    index: '04',
    title: 'Formation',
    text: 'Des reperes concrets pour comprendre les mecanismes de changement et les integrer dans la duree.',
  },
];

const methodologyCards = [
  {
    index: '01',
    Icon: Zap,
    title: 'Energie et alimentation',
    text: 'Retrouver une base physique stable grace a une alimentation plus juste et a des habitudes durables.',
  },
  {
    index: '02',
    Icon: Brain,
    title: 'Liberation de l esprit',
    text: 'Identifier les schemas limitants pour avancer avec plus de lucidite, de calme et de constance.',
  },
  {
    index: '03',
    Icon: Compass,
    title: 'Activation du corps',
    text: 'Transformer l intention en action avec une progression simple, concrete et mesurable.',
  },
];

const testimonials = [
  {
    quote: 'J ai retrouve un cadre simple pour reprendre de l energie sans me juger a chaque faux pas.',
    name: 'Claire M.',
    role: 'Entrepreneure',
    avatar: 'https://i.pravatar.cc/120?img=32',
  },
  {
    quote: 'Chaque rendez-vous m a aide a clarifier mes priorites et a remettre du mouvement dans mon quotidien.',
    name: 'Thomas R.',
    role: 'Chef de projet',
    avatar: 'https://i.pravatar.cc/120?img=14',
  },
  {
    quote: 'Je me sens plus stable, plus lucide et surtout capable de tenir dans la duree.',
    name: 'Sarah L.',
    role: 'Consultante',
    avatar: 'https://i.pravatar.cc/120?img=47',
  },
];

const steps = [
  {
    index: '01',
    title: 'Premier echange',
    text: 'Nous faisons le point sur votre situation, vos blocages et vos objectifs.',
  },
  {
    index: '02',
    title: 'Clarification',
    text: 'Nous identifions ensemble les leviers prioritaires pour avancer.',
  },
  {
    index: '03',
    title: 'Accompagnement personnalise',
    text: 'Vous avancez avec un cadre clair, adapte a votre rythme.',
  },
  {
    index: '04',
    title: 'Transformation durable',
    text: 'Vous installez de nouveaux reperes dans votre corps, votre esprit et votre quotidien.',
  },
];

const reassurancePoints = [
  'Accompagnement individuel',
  'Espace confidentiel',
  'Approche structuree',
  'Progression a votre rythme',
];

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 11L11 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
      <path d="M4 3H11V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

function SectionEyebrow({ children }) {
  return <p className={styles.sectionEyebrow}>{children}</p>;
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
        threshold: 0.12,
        rootMargin: '0px 0px -6% 0px',
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.shell}>
          <div className={`${styles.heroLayout} ${styles.reveal}`} data-reveal>
            <div className={styles.heroContent}>
              <SectionEyebrow>Accompagnement individuel</SectionEyebrow>
              <h1 className={styles.heroTitle}>
                Reprenez votre vie en main, avec <span className={styles.accent}>clarte</span>, structure et profondeur.
              </h1>
              <p className={styles.heroLead}>
                Un accompagnement individuel pour sortir des blocages, retrouver votre elan et construire un changement durable dans votre quotidien.
              </p>

              <div className={styles.heroActions}>
                <Link to="/signup" className={`${styles.primaryButton} ${styles.heroPrimaryButton}`}>
                  Reserver un appel decouverte
                  <ArrowIcon />
                </Link>
              </div>
            </div>

            <aside className={styles.heroProfileCard}>
              <div className={styles.heroImageFrame}>
                <img src={franckPhoto} alt="Franck Chevalier" className={styles.heroImage} />
              </div>
              <div className={styles.heroBioBlock}>
                <p className={styles.profileName}>Franck Chevalier</p>
                <p className={styles.profileText}>
                  Franck Chevalier accompagne les personnes qui veulent retrouver de l energie, apaiser leur esprit et remettre du mouvement dans leur vie. Son approche repose sur trois dimensions complementaires : l alimentation, la liberation de l esprit et l activation du corps.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.section} id="mission">
        <div className={styles.shell}>
          <div className={`${styles.sectionStack} ${styles.audienceSection} ${styles.reveal}`} data-reveal>
            <div className={styles.sectionHeadingRow}>
              <div className={styles.sectionHeadingText}>
                <SectionEyebrow>Pour qui</SectionEyebrow>
                <h2 className={styles.sectionTitle}>Cet accompagnement est fait pour vous si...</h2>
              </div>
            </div>

            <div className={styles.audienceGrid}>
              {audiencePoints.map((point, index) => (
                <article key={point} className={styles.audienceCard}>
                  <div className={styles.audienceCardHeader}>
                    <span className={styles.audienceCheck}>
                      <Check size={16} strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    <span className={styles.cardMeta}>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <p className={styles.listText}>{point}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="deroulement">
        <div className={styles.shell}>
          <div className={`${styles.sectionStack} ${styles.reveal}`} data-reveal>
            <div className={styles.sectionHeadingRow}>
              <div className={styles.sectionHeadingText}>
                <SectionEyebrow>Mission</SectionEyebrow>
                <h2 className={styles.sectionTitle}>
                  Derriere chaque envie de changement, il y a souvent un frein interieur a comprendre et a depasser.
                </h2>
              </div>
              <p className={styles.sectionLead}>
                L objectif n est pas de vous brusquer, mais de vous aider a retrouver un equilibre solide, un esprit plus clair et une capacite d action plus stable.
              </p>
            </div>

            <div className={styles.missionGrid}>
              {missionCards.map((card) => (
                <article key={card.title} className={styles.missionCard}>
                  <span className={styles.cardMeta}>{card.index}</span>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardText}>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="methodologie">
        <div className={styles.shell}>
          <div className={`${styles.methodSection} ${styles.reveal}`} data-reveal>
            <div className={styles.methodIntro}>
              <SectionEyebrow>Methodologie</SectionEyebrow>
              <h2 className={styles.methodTitleDisplay}>
                Trois dimensions
                <br />
                pour une transformation <span className={styles.methodAccent}>durable</span>
              </h2>
              <p className={styles.methodLead}>
                Une methode simple, profonde et concrete pour retrouver votre stabilite, votre clarte et votre capacite d action.
              </p>
            </div>

            <div className={styles.methodGrid}>
              {methodologyCards.map((card) => {
                const Icon = card.Icon;

                return (
                  <article key={card.title} className={styles.methodCard}>
                    <div className={styles.methodCardTop}>
                      <span className={styles.methodIcon}>
                        <Icon size={22} strokeWidth={2.35} aria-hidden="true" />
                      </span>
                      <span className={styles.cardMeta}>{card.index}</span>
                    </div>
                    <h3 className={styles.methodCardTitle}>{card.title}</h3>
                    <p className={styles.methodText}>{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={`${styles.testimonialsSection} ${styles.reveal}`} data-reveal>
            <div className={styles.sectionHeadingRow}>
              <div className={styles.sectionHeadingText}>
                <SectionEyebrow>Temoignages</SectionEyebrow>
                <h2 className={styles.sectionTitle}>Ce que mes clients retrouvent quand le cadre devient enfin clair.</h2>
              </div>
              <p className={styles.sectionLead}>
                Des retours simples, humains et directs sur ce qui change quand le travail devient durable dans le corps, l esprit et l action.
              </p>
            </div>

            <div className={styles.testimonialsGrid}>
              <blockquote className={styles.impactQuote}>
                "J ai arrete de chercher a en faire plus. J ai recommence a avancer avec calme, clarte et constance."
              </blockquote>

              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className={styles.testimonialCard}>
                  <div className={styles.testimonialIdentity}>
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className={styles.testimonialAvatar}
                      loading="lazy"
                    />
                    <div className={styles.testimonialPerson}>
                      <p className={styles.testimonialName}>{testimonial.name}</p>
                      <p className={styles.testimonialRole}>{testimonial.role}</p>
                    </div>
                  </div>
                  <p className={styles.testimonialQuote}>{testimonial.quote}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={`${styles.sectionStack} ${styles.reveal}`} data-reveal>
            <div className={styles.sectionHeadingRow}>
              <div className={styles.sectionHeadingText}>
                <SectionEyebrow>Deroulement</SectionEyebrow>
                <h2 className={styles.sectionTitle}>Comment se deroule l accompagnement ?</h2>
              </div>
            </div>

            <div className={styles.stepsList}>
              {steps.map((step) => (
                <article key={step.title} className={styles.stepRow}>
                  <span className={styles.listIndex}>{step.index}</span>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.cardText}>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={`${styles.reassuranceSection} ${styles.reveal}`} data-reveal>
            <div className={styles.sectionHeadingText}>
              <SectionEyebrow>Cadre</SectionEyebrow>
              <h2 className={styles.sectionTitle}>Un cadre clair, humain et sans jugement.</h2>
            </div>

            <div className={styles.reassuranceGrid}>
              {reassurancePoints.map((item, index) => (
                <article key={item} className={styles.reassuranceCard}>
                  <span className={styles.cardMeta}>{String(index + 1).padStart(2, '0')}</span>
                  <p className={styles.reassuranceText}>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.shell}>
          <div className={`${styles.ctaPanel} ${styles.reveal}`} data-reveal>
            <div className={styles.ctaContent}>
              <SectionEyebrow>Premier echange</SectionEyebrow>
              <h2 className={styles.ctaTitle}>
                Vous n avez pas besoin d en faire plus. Vous avez besoin d avancer autrement.
              </h2>
              <p className={styles.ctaLead}>
                Si vous sentez qu il est temps de retrouver votre direction, votre energie et votre stabilite, commencons par un premier echange.
              </p>
            </div>

            <div className={styles.ctaActions}>
              <Link to="/signup" className={`${styles.primaryButton} ${styles.ctaButton}`}>
                Prendre rendez-vous
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
