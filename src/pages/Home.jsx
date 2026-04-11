import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Brain, Activity, Flame, CheckCircle2 } from 'lucide-react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import heroVideo from '../assets/calm.mp4';
import tiktokVideo from '../assets/tiktok.mp4';
import franckPhoto from '../assets/Franck.jpg';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/900.css';
import overrides from './HomeOverrides.module.css';

const missionCards = [
  {
    title: 'Découvrir le soi',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Devenir plus fort',
    img: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Calmer son mental',
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Pas soumis mais maitre de sa vie',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=900',
  },
];

const methodologySteps = [
  {
    id: '01',
    title: 'Énergie et alimentation',
    description:
      'Permet de stabiliser votre base physique et d installer des routines claires pour soutenir vos décisions.',
    Icon: Flame,
  },
  {
    id: '02',
    title: 'Libération de l esprit',
    description:
      'Identifier vos scénarios limitants pour agir avec plus de lucidité et de cohérence au quotidien.',
    Icon: Brain,
  },
  {
    id: '03',
    title: 'Activation du corps',
    description: 'Transformer l intention en mouvement avec une progression simple, concrète et mesurable.',
    Icon: Activity,
  },
];

const plans = [
  {
    name: 'Pack Équilibre',
    subtitle: '6 mois d engagement pour retrouver un rythme solide.',
    price: '1080€',
    features: ['1 consultation mensuelle (visio)', 'Suivi sport et nutrition'],
    cardType: 'dark',
  },
  {
    name: 'Pack Immersion',
    subtitle: '12 mois de transformation pour aller au bout de votre objectif.',
    price: '1700€',
    features: ['1 consultation mensuelle (visio)', 'Suivi sport et nutrition ultra-personnalisé', 'Accès direct WhatsApp'],
    cardType: 'light',
    badge: 'VIP',
  },
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
      <video autoPlay loop muted playsInline className={overrides.heroVideoBg}>
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className={overrides.heroOverlayBg} aria-hidden="true" />

      <div className={`${overrides.container} ${overrides.heroLayout}`}>
        <Motion.div
          className={overrides.heroContent}
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          variants={reveal(shouldReduceMotion)}
        >
          <h1 className={overrides.heroTitle}>Tu es prêt à transformer ta vie ?</h1>
          <p className={overrides.heroSubtitle}>
            Un cadre direct et sincère pour sortir des scénarios limitants et reprendre la direction de votre trajectoire.
          </p>
          <div className={overrides.ctaRow}>
            <Link to="/signup" className={`${overrides.cta} ${overrides.ctaPrimary}`}>
              Démarrez le coaching
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}

function Mission({ shouldReduceMotion }) {
  return (
    <section className={overrides.sectionLight}>
      <div className={`${overrides.container} ${overrides.missionShell}`}>
        <Motion.h2
          className={overrides.sectionTitleDark}
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          variants={reveal(shouldReduceMotion)}
        >
          On ne change rien, on retire ce qui vous éloigne de vous-même.
        </Motion.h2>

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
              <img src={card.img} alt={card.title} className={overrides.missionImage} loading="lazy" />
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
    <section className={overrides.sectionDark}>
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
            Une approche structurée pour reconnecter l énergie, l esprit et l action dans le même mouvement.
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
    <section className={overrides.sectionLight}>
      <div className={overrides.container}>
        <Motion.div
          className={overrides.programsHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          variants={reveal(shouldReduceMotion)}
        >
          <h2 className={overrides.sectionTitleDark}>Choisissez votre parcours</h2>
        </Motion.div>

        <div className={overrides.programsGrid}>
          {plans.map((plan, index) => (
            <Motion.article
              key={plan.name}
              className={`${overrides.programCard} ${plan.cardType === 'light' ? overrides.programCardLight : overrides.programCardDark}`}
              initial="hidden"
              whileInView="visible"
              viewport={viewConfig}
              variants={reveal(shouldReduceMotion, index * 0.06)}
            >
              {plan.badge ? <span className={overrides.programBadge}>{plan.badge}</span> : null}
              <h3 className={overrides.programTitle}>{plan.name}</h3>
              <p className={overrides.programSubtitle}>{plan.subtitle}</p>
              <p className={overrides.programPrice}>{plan.price}</p>

              <ul className={overrides.programFeatures}>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`${overrides.cta} ${plan.cardType === 'light' ? overrides.ctaDark : overrides.ctaPrimary} ${overrides.ctaFull}`}
              >
                Sélectionner
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
    <section className={overrides.sectionDarkSoft}>
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
            Analyses, conseils et réflexions courtes pour renforcer votre posture mentale au quotidien.
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
    <section className={overrides.sectionLight}>
      <div className={`${overrides.container} ${overrides.aboutLayout}`}>
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          variants={reveal(shouldReduceMotion)}
        >
          <p className={overrides.kickerDark}>L expertise</p>
          <h2 className={overrides.sectionTitleDark}>Qui est Franck Chevalier ?</h2>
          <p className={overrides.aboutText}>
            J accompagne les individus à travers une approche holistique centrée sur l alignement de l énergie, de
            l esprit et du corps.
          </p>
          <p className={overrides.aboutText}>
            Ensemble, nous déconstruisons les croyances limitantes pour construire une base durable, lucide et concrète.
          </p>
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
