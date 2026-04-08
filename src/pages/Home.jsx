import React, { useState  } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { TikTokEmbed } from 'react-social-media-embed';
import franckImage from '../assets/Franck.jpg';
import forestVideo from '../assets/calm.mp4';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import styles from '../App.module.css';

const Divider = () => <div className={styles.divider} />;

const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.heroGrid}>
      <div className={styles.heroContent}>
        <div className={styles.labelWrapper}>
          <div className={styles.labelLine} />
          <span className={styles.labelText}>The Experience</span>
        </div>
        <h1 className={styles.heroTitle}>
          Reconnectez-vous <br />à votre force intérieure.
        </h1>
        <p className={styles.heroText}>
          Il est temps d'arrêter les scénarios limitants et d'aligner votre esprit avec votre véritable nature.
        </p>
        <Link to="/signup" className={styles.solidBtn} style={{ textDecoration: 'none', display: 'inline-flex', width: 'max-content' }}>
          Démarrez le coaching
          <ArrowUpRight className={styles.linkBtnIcon} />
        </Link>
      </div>
      <div className={styles.heroImgContainer}>
        <img 
          src={franckImage}
          alt="Franck Chevalier"
          className={styles.heroImg}
        />
      </div>
    </div>
  </section>
);

const Mission = () => (
  <section className={styles.mission}>
    <video autoPlay loop muted playsInline className={styles.missionVideo}>
      <source src={forestVideo} type="video/mp4" />
    </video>
    <div className={styles.missionOverlay}></div>
    <div className={styles.missionQuoteMark}>"</div>
    <div className={styles.missionContent}>
      <h2 className={styles.missionTitle}>
        On ne néglige rien,<br/>
        on va jusqu'au bout<br/>
        de <span className={styles.missionTitleHighlight}>l'objectif.</span>
      </h2>
      <p className={styles.missionText}>
        Peu importe votre problématique actuelle, la clé réside dans la fin du conflit avec soi-même. Mon rôle est de vous aider à percevoir vos ressentis profonds pour vous aligner avec qui vous êtes et ce que vous voulez être.
      </p>
    </div>
  </section>
);

const Methodology = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "01",
      title: "ÉNERGIE & ALIMENTATION",
      desc: "Permet de faire fonctionner parfaitement votre corps et ça tombe bien car qu'est-ce qui est essentiel pour créer votre vie ? Votre corps."
    },
    {
      id: "02",
      title: "L'ESPRIT (45 MIN)",
      desc: "Votre mental a créé de nombreux scénarios qui bloquent le courage de vivre pleinement. Bonne nouvelle: j'identifie vos blocages inconscients."
    },
    {
      id: "03",
      title: "LE CORPS",
      desc: "Rien ne peut être fait sans énergie. L'énergie est en libre-service dans votre corps, mais uniquement si vous décidez d'aller la chercher."
    }
  ];

  return (
    <section className={styles.methodology}>
      <div className={styles.methodologyInner}>
        <div className={styles.methodologyHeaderGrid}>
          <h2 className={styles.methodologySubtitle}>La Méthode</h2>
          <h3 className={styles.methodologyTitle}>
            Trois Dimensions<br/>Inébranlables
          </h3>
          <p className={styles.methodologyDesc}>
            Une approche triangulaire qui assure une fondation solide. Ne sous-estimez aucune de ces trois dimensions pour atteindre votre plein potentiel.
          </p>
        </div>
        
        <div className={styles.methodologyInteractive}>
          <div className={styles.methodologyNav}>
            {steps.map((step, index) => (
              <button 
                key={step.id}
                className={`${styles.methodologyTab} ${activeStep === index ? styles.methodologyTabActive : ''}`}
                onClick={() => setActiveStep(index)}
              >
                <span className={styles.cardNumber}>{step.id} /</span>
                <h4>{step.title}</h4>
              </button>
            ))}
          </div>
          
          <div className={styles.methodologyDisplay}>
            {/* key={activeStep} forces React to remount the element and triggers the slideFadeIn animation */}
            <div key={activeStep} className={styles.methodologyDisplayContent}>
              <div className={styles.displayNumber}>{steps[activeStep].id}</div>
              <p className={styles.displayDesc}>
                {steps[activeStep].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Programs = () => (
  <section className={styles.programs}>
    <div className={styles.programsInner}>
      <div className={styles.programsHeader}>
        <h2 className={styles.methodologySubtitle}>Investissement</h2>
        <h3 className={styles.programsTitle}>CHOISISSEZ VOTRE PARCOURS</h3>
      </div>
      
      <div className={styles.programsList}>
        {/* Pack Equilibre */}
        <div className={styles.programRow}>
          <div className={styles.programInfo}>
            <h3 className={styles.programTitle}>PACK ÉQUILIBRE</h3>
            <span className={styles.programDuration}>6 Mois d'engagement</span>
          </div>
          
          <div className={styles.programDetails}>
            <div className={styles.programDetailItem}>1 consultation mensuelle (Visio) en tête à tête</div>
            <div className={styles.programDetailItem}>Suivi Sport & Nutrition personnalisé</div>
          </div>
          
          <div className={styles.programAction}>
            <div className={styles.programPrice}>1080€</div>
            <button className={`${styles.solidBtn} ${styles.solidBtnLight}`}>
              Sélectionner cette offre
              <ArrowUpRight className={styles.linkBtnIcon} />
            </button>
          </div>
        </div>
        
        {/* Pack Immersion */}
        <div className={styles.programRowAlt}>
          <div className={styles.programInfo}>
            <div className={styles.popularBadge} style={{ marginBottom: '1rem', width: 'fit-content' }}>Le Plus Populaire</div>
            <h3 className={styles.programTitle}>PACK IMMERSION</h3>
            <span className={styles.programDurationAlt}>12 Mois de transformation</span>
          </div>
          
          <div className={styles.programDetails}>
            <div className={styles.programDetailItem}>1 consultation mensuelle (Visio) pour la mentalité</div>
            <div className={styles.programDetailItem}>Suivi Sport & Nutrition ultra-personnalisé</div>
            <div className={styles.programDetailItem} style={{ color: 'var(--color-brand-accent)', fontWeight: '600' }}>Accès Direct WhatsApp (Ligne personnelle)</div>
          </div>
          
          <div className={styles.programAction}>
            <div className={styles.programPrice} style={{ color: 'var(--color-brand-bg)' }}>1700€</div>
            <button className={styles.solidBtn}>
              Sélectionner cette offre
              <ArrowUpRight className={styles.linkBtnIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const About = () => (
  <section className={styles.about}>
    <div className={styles.aboutGrid}>
      <div className={styles.aboutContent}>
        <h2 className={styles.aboutSubtitle}>L'Expertise</h2>
        <h3 className={styles.aboutTitle}>QUI EST FRANCK CHEVALIER ?</h3>
        <p className={styles.aboutText}>
          J'accompagne les individus à travers une approche holistique unique. Mon expertise repose sur l'alignement de l'énergie, de l'esprit et du corps, forgée par des années de pratique et une profonde humanité. 
        </p>
        <p className={styles.aboutText}>
          Ensemble, nous déconstruisons vos croyances limitantes pour bâtir un socle solide. Aucune demi-mesure: l'objectif est une vie pleinement vécue, sans regrets.
        </p>
        <button className={styles.solidBtn}>
          Réserver ma séance (15 min)
          <ArrowUpRight className={styles.linkBtnIcon} />
        </button>
      </div>
      <div className={styles.aboutImgContainer}>
        <img 
          src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80" 
          alt="Session de coaching"
          className={styles.aboutImg}
        />
      </div>
    </div>
  </section>
);


const SocialMedia = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const videos = [
    "https://www.tiktok.com/@franck.chevalier/video/7175584701506211078",
    "https://www.tiktok.com/@franck.chevalier/video/7571516270735084822",
    "https://www.tiktok.com/@franck.chevalier/video/7185289573428104454",
    "https://www.tiktok.com/@franck.chevalier/video/7248185990127389978",
    "https://www.tiktok.com/@franck.chevalier/video/7173723936369315078"
  ];

  const goLeft = () => setCurrentIndex(prev => Math.max(prev - 1, 0));
  const goRight = () => setCurrentIndex(prev => Math.min(prev + 1, videos.length - 1));

  return (
    <section className={styles.socialMedia}>
      <div className={styles.socialMediaHeader}>
        <h2 className={styles.methodologySubtitle}>Psychologie & Mindset</h2>
        <h3 className={styles.socialMediaTitle}>SUIVEZ-MOI SUR TIKTOK</h3>
        <p className={styles.socialMediaDesc}>
          Découvrez mes analyses, conseils et réflexions quotidiennes pour transformer votre état d'esprit et briser vos croyances limitantes.
        </p>
        <a 
          href="https://www.tiktok.com/@franck.chevalier"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.solidBtn} 
          style={{ textDecoration: 'none', display: 'inline-flex', width: 'max-content', marginTop: '1.5rem' }}
        >
          @franck.chevalier
          <ArrowUpRight className={styles.linkBtnIcon} />
        </a>
      </div>

      <div className={styles.carouselCoverFlowWrapper}>
        <button 
          className={styles.carouselCoverBtnLeft} 
          onClick={goLeft} 
          aria-label="Vidéo précédente"
          style={{ opacity: currentIndex === 0 ? 0.3 : 1, pointerEvents: currentIndex === 0 ? 'none' : 'auto' }}
        >
          <ChevronLeft />
        </button>
        
        <div className={styles.carouselCoverflow}>
          {videos.map((url, i) => {
            const offset = i - currentIndex;
            const absOffset = Math.abs(offset);
            const sign = Math.sign(offset);

            let translateX = 0;
            let scale = 1;
            let zIndex = 10;
            let opacity = 1;

            if (absOffset === 0) {
              translateX = 0;
              scale = 1;
              zIndex = 5;
              opacity = 1;
            } else if (absOffset === 1) {
              translateX = sign * 65; 
              scale = 0.85;
              zIndex = 4;
              opacity = 0.8;
            } else if (absOffset === 2) {
              translateX = sign * 115;
              scale = 0.7;
              zIndex = 3;
              opacity = 0.3;
            } else {
              translateX = sign * 130;
              scale = 0.5;
              zIndex = 1;
              opacity = 0;
            }

            return (
              <div 
                key={url}
                className={styles.carouselCoverCard}
                style={{
                  transform: `translateX(${translateX}%) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
                onClick={() => {
                  if (absOffset !== 0) setCurrentIndex(i);
                }}
              >
                <div style={{ pointerEvents: absOffset === 0 ? 'auto' : 'none', width: '100%', height: '100%', position: 'relative' }}>
                  {/* Re-mount the TikTok embed only when it comes to the center so that any actively playing video stops, but we keep the visual preview for the inactive cards */}
                  <TikTokEmbed key={`${url}-${absOffset === 0}`} url={url} width="100%" />
                  {absOffset !== 0 && (
                    <div style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      backgroundColor: 'rgba(255, 255, 255, 0.4)', 
                      zIndex: 30,
                      cursor: 'pointer'
                    }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button 
          className={styles.carouselCoverBtnRight} 
          onClick={goRight} 
          aria-label="Vidéo suivante"
          style={{ opacity: currentIndex === videos.length - 1 ? 0.3 : 1, pointerEvents: currentIndex === videos.length - 1 ? 'none' : 'auto' }}
        >
          <ChevronRight />
        </button>
      </div>

      <div className={styles.carouselDots}>
        {videos.map((_, i) => (
          <span 
            key={i}
            className={`${styles.carouselDot} ${i === currentIndex ? styles.carouselDotActive : ''}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className={styles.app}>
      <main className={styles.mainFlow}>
        <Hero />
        <Mission />
        <Methodology />
        <Programs />
        <SocialMedia />
        <About />
      </main>
    </div>
  );
}
