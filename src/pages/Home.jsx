import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Brain, Activity, Flame, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import heroVideo from '../assets/calm.mp4';
import franckPhoto from '../assets/Franck.jpg';
import overrides from './HomeOverrides.module.css';

const missionCards = [
  {
    id: 'coaching-gratuit',
    title: 'Coaching gratuit',
    to: '/diagnostic',
    ctaLabel: 'Découvrir',
  },
  {
    id: 'coaching-avance',
    title: 'Coaching avancé',
    to: '/signup',
    ctaLabel: 'Explorer',
  },
  {
    id: 'stage',
    title: 'Stage',
    to: '/signup',
    ctaLabel: 'Découvrir',
  },
  {
    id: 'formation',
    title: 'Formation',
    to: '/signup',
    ctaLabel: 'Explorer',
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

const socialVideoCards = [
  {
    id: 'tiktok-1',
    videoId: '7571516270735084822',
  },
  {
    id: 'tiktok-2',
    videoId: '7175584701506211078',
  },
  {
    id: 'tiktok-3',
    videoId: '7174829068246961414',
  },
  {
    id: 'tiktok-4',
    videoId: '7175202916528082182',
  },
  {
    id: 'tiktok-5',
    videoId: '7173723936369315078',
  },
  {
    id: 'tiktok-6',
    videoId: '7537020888399498518',
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
      <div className={`${overrides.container} ${overrides.heroShell}`}>
        <div className={overrides.heroFrame}>
          <video autoPlay muted loop playsInline preload="metadata" className={overrides.heroVideoBg}>
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
                <Button asChild className={`${overrides.cta} ${overrides.ctaPrimary} ${overrides.heroCta}`}>
                  <Link to="/signup">
                    Démarrez le coaching
                  </Link>
                </Button>
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
          Peu importe pourquoi vous voulez changer, Il faudra enlever le saboteur qui est en vous.
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

        <div className={overrides.missionGrid}>
          {missionCards.map((card, index) => (
            <Motion.article
              key={card.id}
              className={overrides.missionCard}
              initial="hidden"
              whileInView="visible"
              viewport={viewConfig}
              variants={reveal(shouldReduceMotion, index * 0.06)}
            >
              <div className={overrides.missionCardCopy}>
                <h3 className={overrides.missionCardTitle}>{card.title}</h3>
                <Link to={card.to} className={overrides.missionCardLink}>
                  <span>{card.ctaLabel}</span>
                  <ArrowUpRight size={16} strokeWidth={2} />
                </Link>
              </div>
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
          className={overrides.aboutContent}
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
              {plan.badge ? <Badge className={overrides.programBadge} variant="secondary">{plan.badge}</Badge> : null}
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

              <Button
                asChild
                className={`${overrides.cta} ${plan.cardType === 'light' ? overrides.ctaDark : overrides.ctaPrimary} ${overrides.ctaFull}`}
              >
                <Link to="/signup">
                  Choisir ce format
                </Link>
              </Button>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialMedia({ shouldReduceMotion }) {
  const trackRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateCarouselState = useCallback(() => {
    const trackElement = trackRef.current;

    if (!trackElement) {
      return;
    }

    const maxScrollLeft = trackElement.scrollWidth - trackElement.clientWidth;
    const progress = maxScrollLeft > 0 ? trackElement.scrollLeft / maxScrollLeft : 0;
    const safeProgress = Number.isFinite(progress) ? progress : 0;

    setCanScrollPrev(trackElement.scrollLeft > 8);
    setCanScrollNext(trackElement.scrollLeft < maxScrollLeft - 8);
    setActiveDot(Math.min(3, Math.round(safeProgress * 3)));
  }, []);

  useEffect(() => {
    updateCarouselState();
    window.addEventListener('resize', updateCarouselState);

    return () => {
      window.removeEventListener('resize', updateCarouselState);
    };
  }, [updateCarouselState]);

  const scrollCarousel = (direction) => {
    const trackElement = trackRef.current;

    if (!trackElement) {
      return;
    }

    const scrollDistance = trackElement.clientWidth * 0.72;

    trackElement.scrollBy({
      left: direction * scrollDistance,
      behavior: 'smooth',
    });
  };

  return (
    <section className={`${overrides.sectionLight} ${overrides.sectionRhythmTight} ${overrides.socialSection}`}>
      <div className={`${overrides.container} ${overrides.socialContainer}`}>
        <Motion.div
          className={overrides.socialHeaderRow}
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          variants={reveal(shouldReduceMotion)}
        >
          <div className={overrides.socialHeadingGroup}>
            <h2 className={overrides.socialShelfTitle}>Suivez-moi sur TikTok</h2>
            <a
              href="https://www.tiktok.com/@franck.chevalier"
              target="_blank"
              rel="noopener noreferrer"
              className={overrides.socialDiscover}
            >
              Voir le profil TikTok
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className={overrides.socialNavGroup}>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Voir les clips précédents"
              className={overrides.socialNavButton}
              onClick={() => scrollCarousel(-1)}
              disabled={!canScrollPrev}
            >
              <ChevronLeft size={20} />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Voir les clips suivants"
              className={overrides.socialNavButton}
              onClick={() => scrollCarousel(1)}
              disabled={!canScrollNext}
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </Motion.div>

        <Motion.div
          className={overrides.socialCarousel}
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          variants={reveal(shouldReduceMotion, 0.08)}
        >
          <div className={overrides.socialTrack} ref={trackRef} onScroll={updateCarouselState}>
            {socialVideoCards.map((card) => (
              <article key={card.id} className={overrides.socialCard}>
                <div className={overrides.socialEmbedFrame}>
                  <iframe
                    src={`https://www.tiktok.com/player/v1/${card.videoId}?description=0&music_info=0&controls=1&play_button=1&fullscreen_button=1`}
                    title={`Video TikTok ${card.videoId}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </article>
            ))}
          </div>
        </Motion.div>

        <div className={overrides.socialDots} aria-hidden="true">
          {[0, 1, 2, 3].map((dot) => (
            <span
              key={dot}
              className={`${overrides.socialDot} ${dot === activeDot ? overrides.socialDotActive : ''}`.trim()}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ shouldReduceMotion }) {
  return (
    <section className={`${overrides.sectionLight} ${overrides.sectionRhythmFinal} ${overrides.aboutSection}`}>
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

          <Button asChild className={`${overrides.cta} ${overrides.ctaDark}`}>
            <Link to="/signup">
              Réserver ma séance (15 min)
            </Link>
          </Button>
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
      <SocialMedia
        shouldReduceMotion={shouldReduceMotion}
      />
      <About shouldReduceMotion={shouldReduceMotion} />
    </main>
  );
}
