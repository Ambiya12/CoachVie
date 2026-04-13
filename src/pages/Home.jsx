import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Brain, Activity, Flame, CheckCircle2 } from 'lucide-react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import heroVideo from '../assets/calm.mp4';
import tiktokVideo from '../assets/tiktok.mp4';
import franckPhoto from '../assets/Franck.jpg';
import franckVideo from '../assets/Franck.mp4';
import forestVideo from '../assets/forest.mp4';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/900.css';
import overrides from './HomeOverrides.module.css';

const missionCards = [
  {
    title: 'Retrouver le calme intérieur',
    mediaType: 'video',
    src: forestVideo,
  },
  {
    title: "Passer à l'action",
    mediaType: 'video',
    src: franckVideo,
  },
  {
    title: 'Construire un socle solide',
    mediaType: 'image',
    src: franckPhoto,
    objectPosition: '50% 20%',
  },
  {
    title: 'Tenir dans la durée',
    mediaType: 'image',
    src: franckPhoto,
    objectPosition: '50% 75%',
  },
];

const missionProofs = [
  {
    title: 'Diagnostic initial clair',
    text: "Vous identifiez où agir dès la première semaine.",
  },
  {
    title: 'Rythme hebdomadaire concret',
    text: 'Chaque action est claire, mesurable et tenable.',
  },
  {
    title: 'Suivi humain direct',
    text: 'Vous avancez avec un cadre réel, jamais générique.',
  },
];

const methodologySteps = [
  {
    id: '01',
    title: 'Énergie et alimentation',
    description: "Stabiliser votre base physique et installer des routines nettes pour soutenir vos décisions.",
    Icon: Flame,
  },
  {
    id: '02',
    title: "Libération de l'esprit",
    description: 'Identifier les scénarios limitants pour décider avec lucidité et constance.',
    Icon: Brain,
  },
  {
    id: '03',
    title: 'Activation du corps',
    description: "Transformer l'intention en action avec une progression simple, concrète et mesurable.",
    Icon: Activity,
  },
];

const plans = [
  {
    name: 'Pack Équilibre',
    subtitle: "6 mois d'engagement pour retrouver un rythme solide.",
    price: '1080€',
    decisionFit: 'Adapté si vous voulez poser des bases stables sans vous disperser.',
    features: ['1 consultation mensuelle (visio)', 'Suivi sport et nutrition'],
    cardType: 'dark',
  },
  {
    name: 'Pack Immersion',
    subtitle: '12 mois de transformation pour atteindre un changement durable.',
    price: '1700€',
    decisionFit: 'Adapté si vous voulez un cadre long terme avec un accès direct en continu.',
    features: ['1 consultation mensuelle (visio)', 'Suivi sport et nutrition ultra-personnalisé', 'Accès direct WhatsApp'],
    cardType: 'light',
    badge: 'Recommandé',
  },
];

const trustCues = [
  'Commencez par le diagnostic pour valider le bon format.',
  'Si nécessaire, vous ajustez ensuite avec un accompagnement direct.',
];

const aboutProofs = [
  'Méthode en 3 dimensions appliquée en accompagnement individuel.',
  'Suivi centré sur des actions tenables dans la vraie vie.',
  "Cadre clair pour transformer l'intention en résultats concrets.",
];

function reveal(shouldReduceMotion, delay = 0) {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }

  return {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.2, 1, 0.3, 1],
      },
    },
  };
}

const viewConfig = { once: true, amount: 0.22 };

function Hero({ shouldReduceMotion }) {
  return (
    <section className={overrides.hero}>
      <div className={`${overrides.container} ${overrides.heroShell}`}>
        <div className={overrides.heroFrame}>
          <video autoPlay loop muted playsInline className={overrides.heroVideoBg}>
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className={overrides.heroOverlayBg} aria-hidden="true" />

          <div className={overrides.heroLayout}>
            <Motion.div
              className={overrides.heroContent}
              initial="hidden"
              whileInView="visible"
              viewport={viewConfig}
              variants={reveal(shouldReduceMotion)}
            >
              <h1 className={overrides.heroTitle}>Tu es prêt à transformer ta vie ?</h1>
              <p className={overrides.heroSubtitle}>
                Un cadre direct pour sortir des scénarios limitants et reprendre la main sur votre trajectoire.
              </p>
              <div className={`${overrides.ctaRow} ${overrides.heroCtaRow}`}>
                <Link to="/signup" className={`${overrides.cta} ${overrides.ctaPrimary} ${overrides.heroCta}`}>
                  Démarrez le coaching
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </Motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission({ shouldReduceMotion }) {
  return (
    <section className={`${overrides.sectionDark} ${overrides.sectionRhythmTight}`}>
      <div className={`${overrides.container} ${overrides.missionShell}`}>
        <Motion.h2
          className={overrides.sectionTitleDark}
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          variants={reveal(shouldReduceMotion)}
        >
          On ne vous change pas. On retire ce qui vous éloigne de vous-même.
        </Motion.h2>

        <Motion.p
          className={overrides.missionLead}
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          variants={reveal(shouldReduceMotion, 0.04)}
        >
          Cette méthode repose sur des actions réelles: observer, ajuster et agir avec constance.
        </Motion.p>

        <div className={overrides.missionProofRow}>
          {missionProofs.map((proof, index) => (
            <Motion.article
              key={proof.title}
              className={overrides.missionProofCard}
              initial="hidden"
              whileInView="visible"
              viewport={viewConfig}
              variants={reveal(shouldReduceMotion, index * 0.05)}
            >
              <p className={overrides.missionProofTag}>Preuve {index + 1}</p>
              <h3 className={overrides.missionProofTitle}>{proof.title}</h3>
              <p className={overrides.missionProofText}>{proof.text}</p>
            </Motion.article>
          ))}
        </div>

        <div className={overrides.missionGrid}>
          {missionCards.map((card, index) => (
            <Motion.article
              key={card.title}
              className={overrides.missionCard}
              initial="hidden"
              whileInView="visible"
              viewport={viewConfig}
              variants={reveal(shouldReduceMotion, index * 0.06)}
            >
              {card.mediaType === 'video' ? (
                <video className={overrides.missionImage} autoPlay loop muted playsInline preload="metadata">
                  <source src={card.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={card.src}
                  alt={card.title}
                  className={overrides.missionImage}
                  loading="lazy"
                  style={card.objectPosition ? { objectPosition: card.objectPosition } : undefined}
                />
              )}
              <h3 className={overrides.missionCardTitle}>{card.title}</h3>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Methodology({ shouldReduceMotion }) {
  return (
    <section className={`${overrides.sectionDark} ${overrides.sectionRhythmWide}`}>
      <div className={overrides.container}>
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          variants={reveal(shouldReduceMotion)}
        >
          <p className={overrides.kicker}>La méthode</p>
          <h2 className={overrides.sectionTitleLight}>Trois dimensions inébranlables</h2>
          <p className={overrides.sectionLeadLight}>
            Une approche structurée pour reconnecter l'énergie, l'esprit et l'action dans un même élan.
          </p>
        </Motion.div>

        <div className={overrides.methodGrid}>
          {methodologySteps.map((step, index) => (
            <Motion.article
              key={step.id}
              className={overrides.methodCard}
              initial="hidden"
              whileInView="visible"
              viewport={viewConfig}
              variants={reveal(shouldReduceMotion, index * 0.06)}
            >
              <div className={overrides.methodIconWrap}>
                <step.Icon size={24} strokeWidth={2} />
              </div>
              <p className={overrides.methodNumber}>{step.id}</p>
              <h3 className={overrides.methodTitle}>{step.title}</h3>
              <p className={overrides.methodText}>{step.description}</p>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Programs({ shouldReduceMotion }) {
  return (
    <section className={`${overrides.sectionLight} ${overrides.sectionRhythmMedium}`}>
      <div className={overrides.container}>
        <Motion.div
          className={overrides.programsHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          variants={reveal(shouldReduceMotion)}
        >
          <h2 className={overrides.sectionTitleDark}>Choisissez votre parcours</h2>
          <p className={overrides.programsGuidance}>Un choix simple: un format 6 mois ou un cadre 12 mois.</p>
        </Motion.div>

        <Motion.ul
          className={overrides.trustCueRow}
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          variants={reveal(shouldReduceMotion, 0.05)}
        >
          {trustCues.map((cue, index) => (
            <Motion.li
              key={cue}
              className={overrides.trustCueCard}
              initial="hidden"
              whileInView="visible"
              viewport={viewConfig}
              variants={reveal(shouldReduceMotion, index * 0.04)}
            >
              <CheckCircle2 size={15} />
              <span>{cue}</span>
            </Motion.li>
          ))}
        </Motion.ul>

        <div className={overrides.programsGrid}>
          {plans.map((plan, index) => (
            <Motion.article
              key={plan.name}
              className={`${overrides.programCard} ${plan.cardType === 'light' ? overrides.programCardLight : overrides.programCardDark} ${plan.badge ? overrides.programCardFeatured : ''}`}
              initial="hidden"
              whileInView="visible"
              viewport={viewConfig}
              variants={reveal(shouldReduceMotion, index * 0.06)}
            >
              {plan.badge ? <span className={overrides.programBadge}>{plan.badge}</span> : null}
              <h3 className={overrides.programTitle}>{plan.name}</h3>
              <p className={overrides.programSubtitle}>{plan.subtitle}</p>
              <p className={overrides.programFit}>{plan.decisionFit}</p>
              <p className={overrides.programPrice}>{plan.price}</p>

              <details className={overrides.programDisclosure}>
                <summary className={overrides.programDisclosureSummary}>Voir le détail du suivi</summary>
                <ul className={overrides.programFeatures}>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </details>

              <Link
                to="/signup"
                className={`${overrides.cta} ${plan.cardType === 'light' ? overrides.ctaDark : overrides.ctaPrimary} ${overrides.ctaFull}`}
              >
                Choisir ce format
                <ArrowUpRight size={16} />
              </Link>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialMedia({ shouldReduceMotion }) {
  return (
    <section className={`${overrides.sectionDarkSoft} ${overrides.sectionRhythmTight}`}>
      <div className={`${overrides.container} ${overrides.socialLayout}`}>
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          variants={reveal(shouldReduceMotion)}
        >
          <p className={overrides.kicker}>Psychologie et mindset</p>
          <h2 className={overrides.sectionTitleLight}>Suivez-moi sur TikTok</h2>
          <p className={overrides.sectionLeadLight}>
            Des analyses courtes et utiles pour renforcer votre posture mentale chaque semaine.
          </p>
          <a
            href="https://www.tiktok.com/@franck.chevalier"
            target="_blank"
            rel="noopener noreferrer"
            className={`${overrides.cta} ${overrides.ctaPrimary}`}
          >
            @franck.chevalier
            <ArrowUpRight size={16} />
          </a>
        </Motion.div>

        <Motion.div
          className={overrides.socialVideoWrap}
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          variants={reveal(shouldReduceMotion, 0.08)}
        >
          <video autoPlay loop muted playsInline controls className={overrides.socialVideo}>
            <source src={tiktokVideo} type="video/mp4" />
          </video>
        </Motion.div>
      </div>
    </section>
  );
}

function About({ shouldReduceMotion }) {
  return (
    <section className={`${overrides.sectionLight} ${overrides.sectionRhythmFinal}`}>
      <div className={`${overrides.container} ${overrides.aboutLayout}`}>
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          variants={reveal(shouldReduceMotion)}
        >
          <p className={overrides.kickerDark}>L'expertise</p>
          <h2 className={overrides.sectionTitleDark}>Qui est Franck Chevalier ?</h2>
          <p className={overrides.aboutText}>
            J'accompagne des personnes exigeantes avec une approche holistique centrée sur l'alignement de l'énergie,
            de l'esprit et du corps.
          </p>
          <p className={overrides.aboutText}>
            Ensemble, nous retirons les blocages invisibles pour construire une trajectoire stable, lucide et durable.
          </p>

          <ul className={overrides.aboutProofList}>
            {aboutProofs.map((item) => (
              <li key={item}>
                <CheckCircle2 size={16} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <blockquote className={overrides.aboutQuote}>
            <p>
              "Le changement commence quand votre cadre est clair, simple et répétable chaque semaine."
            </p>
            <cite>Méthode Franck Chevalier</cite>
          </blockquote>

          <Link to="/signup" className={`${overrides.cta} ${overrides.ctaDark}`}>
            Réserver ma séance (15 min)
            <ArrowUpRight size={16} />
          </Link>
        </Motion.div>

        <Motion.figure
          className={overrides.aboutImageWrap}
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          variants={reveal(shouldReduceMotion, 0.08)}
        >
          <img src={franckPhoto} alt="Franck en session" className={overrides.aboutImage} loading="lazy" />
        </Motion.figure>
      </div>
    </section>
  );
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className={overrides.page}>
      <Hero shouldReduceMotion={shouldReduceMotion} />
      <Mission shouldReduceMotion={shouldReduceMotion} />
      <Methodology shouldReduceMotion={shouldReduceMotion} />
      <Programs shouldReduceMotion={shouldReduceMotion} />
      <SocialMedia shouldReduceMotion={shouldReduceMotion} />
      <About shouldReduceMotion={shouldReduceMotion} />
    </main>
  );
}
