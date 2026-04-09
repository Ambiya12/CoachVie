import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Flame, Brain, Activity, CheckCircle2, Quote } from 'lucide-react';
import { TikTokEmbed } from 'react-social-media-embed';
import { motion } from 'framer-motion';
import franckImage from '../assets/Franck.jpg';
import forestVideo from '../assets/calm.mp4';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import styles from '../App.module.css';
import overrides from './HomeOverrides.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Hero = () => (
  <section className={overrides.hero}>
    <div className={`${styles.heroGrid} ${overrides.container}`}>
      <motion.div 
        className={styles.heroContent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className={styles.labelWrapper}>
          <div className={styles.labelLine} />
          <span className={styles.labelText}>The Experience</span>
        </div>
        <h1 className={overrides.heroTitleAnimated}>
          Reconnectez-vous <br />à votre force intérieure.
        </h1>
        <p className={styles.heroText}>
          Il est temps d'arrêter les scénarios limitants et d'aligner votre esprit avec votre véritable nature.
        </p>
        <Link to="/signup" className={styles.solidBtn} style={{ textDecoration: 'none', display: 'inline-flex', width: 'max-content', marginTop: '1rem' }}>
          Démarrez le coaching
          <ArrowUpRight className={styles.linkBtnIcon} />
        </Link>
      </motion.div>
      <motion.div 
        className={styles.heroImgContainer}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <img 
          src={franckImage}
          alt="Franck Chevalier"
          className={styles.heroImg}
        />
      </motion.div>
    </div>
  </section>
);

const Mission = () => (
  <section className={overrides.missionParallax}>
    <video autoPlay loop muted playsInline className={overrides.missionVideoFixed}>
      <source src={forestVideo} type="video/mp4" />
    </video>
    <div className={overrides.missionOverlayFixed}></div>
    <motion.div 
      className={overrides.missionContentCentered}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={fadeUp}
    >
      <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em', color: '#fff', fontWeight: '700', textTransform: 'uppercase' }}>
        On ne néglige rien,<br/>
        on va jusqu'au bout<br/>
        de <span className={overrides.metallicGoldText}>l'objectif.</span>
      </h2>
    </motion.div>
  </section>
);

const Methodology = () => {
  const steps = [
    {
      id: "01",
      icon: <Flame size={48} strokeWidth={2.5} color="#D4AF37" />,
      title: "ÉNERGIE & ALIMENTATION",
      desc: "Permet de faire fonctionner parfaitement votre corps et ça tombe bien car qu'est-ce qui est essentiel pour créer votre vie ? Votre corps."
    },
    {
      id: "02",
      icon: <Brain size={48} strokeWidth={2.5} color="#D4AF37" />,
      title: "L'ESPRIT (45 MIN)",
      desc: "Votre mental a créé de nombreux scénarios qui bloquent le courage de vivre pleinement. Bonne nouvelle: j'identifie vos blocages inconscients."
    },
    {
      id: "03",
      icon: <Activity size={48} strokeWidth={2.5} color="#D4AF37" />,
      title: "LE CORPS",
      desc: "Rien ne peut être fait sans énergie. L'énergie est en libre-service dans votre corps, mais uniquement si vous décidez d'aller la chercher."
    }
  ];

  return (
    <section className={overrides.darkerSection}>
      <div className={overrides.container}>
        <motion.div 
          style={{ textAlign: 'center', marginBottom: '4rem' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <span className={styles.methodologySubtitle}>La Méthode</span>
          <h3 className={overrides.sectionTitleAnimated}>
            Trois Dimensions Inébranlables
          </h3>
          <p className={styles.methodologyDesc} style={{ maxWidth: '600px', margin: '0 auto' }}>
            Une approche triangulaire qui assure une fondation solide. Ne sous-estimez aucune de ces trois dimensions pour atteindre votre plein potentiel.
          </p>
        </motion.div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {steps.map((step, index) => (
            <motion.div 
              key={step.id} 
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2.5rem', backgroundColor: '#fff', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.2 } }
              }}
            >
              <div style={{ marginBottom: '1.5rem', background: '#FCFAFA', padding: '1.5rem', borderRadius: '50%' }}>
                {step.icon}
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1rem', letterSpacing: '0.05em' }}>{step.title}</h4>
              <p style={{ color: 'var(--color-brand-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className={overrides.standardSection}>
    <div className={overrides.container}>
      <motion.div 
        style={{ textAlign: 'center', marginBottom: '2rem' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <span className={styles.methodologySubtitle}>Témoignages</span>
        <h3 className={overrides.sectionTitleAnimated}>
          Ce qu'ils en disent
        </h3>
      </motion.div>

      <div className={overrides.testimonialsGrid}>
        <motion.div className={overrides.testimonialCard} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className={overrides.testimonialQuoteMark}>"</div>
          <p className={overrides.testimonialText}>
            Franck changed my life entirely. I was stuck in my career and overwhelmed with mental blocks. In 6 months, everything shifted. I've never felt this much inner peace.
          </p>
          <div className={overrides.testimonialAuthor}>— Laurent D.</div>
        </motion.div>
        
        <motion.div className={overrides.testimonialCard} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }}}>
          <div className={overrides.testimonialQuoteMark}>"</div>
          <p className={overrides.testimonialText}>
            His approach is blunt, honest, and exactly what I needed. He doesn't just talk about mindset, we reworked my entire nutrition and energy baseline. Exceptional.
          </p>
          <div className={overrides.testimonialAuthor}>— Marine S.</div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Programs = () => (
  <section className={overrides.darkerSection}>
    <div className={overrides.container}>
      <motion.div 
        style={{ textAlign: 'center', marginBottom: '2rem' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <span className={styles.methodologySubtitle}>Investissement</span>
        <h3 className={overrides.sectionTitleAnimated}>CHOISISSEZ VOTRE PARCOURS</h3>
      </motion.div>
      
      <div className={overrides.pricingGrid}>
        <motion.div 
          className={overrides.packCard}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 }}}}
        >
          <div>
            <h3 className={overrides.packTitle}>PACK ÉQUILIBRE</h3>
            <p className={overrides.packDesc}>6 Mois d'engagement pour retrouver l'équilibre parfait.</p>
            <div className={overrides.packPrice}>1080€</div>
            <div className={overrides.packFeatures}>
              <div className={overrides.packFeature}>
                <CheckCircle2 size={18} color="#D4AF37" />
                <span>1 consultation mensuelle (Visio) en tête à tête</span>
              </div>
              <div className={overrides.packFeature}>
                <CheckCircle2 size={18} color="#D4AF37" />
                <span>Suivi Sport & Nutrition personnalisé</span>
              </div>
            </div>
          </div>
          <button className={styles.solidBtn} style={{ width: '100%' }}>
            Sélectionner
            <ArrowUpRight className={styles.linkBtnIcon} />
          </button>
        </motion.div>
        
        <motion.div 
          className={`${overrides.packCard} ${overrides.packDark}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 }}}}
        >
          <div style={{ position: 'absolute', top: '-12px', right: '24px', background: 'linear-gradient(to right, #D4AF37, #F9E498)', color: '#000', fontSize: '0.75rem', fontWeight: 'bold', padding: '6px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Le Plus Populaire
          </div>
          <div>
            <h3 className={overrides.packTitle}>PACK IMMERSION</h3>
            <p className={overrides.packDesc}>12 Mois de transformation pour aller au bout de l'objectif.</p>
            <div className={overrides.packPrice}>1700€</div>
            <div className={overrides.packFeatures}>
              <div className={overrides.packFeature}>
                <CheckCircle2 size={18} color="#D4AF37" />
                <span>1 consultation mensuelle (Visio) pour la mentalité</span>
              </div>
              <div className={overrides.packFeature}>
                <CheckCircle2 size={18} color="#D4AF37" />
                <span>Suivi Sport & Nutrition ultra-personnalisé</span>
              </div>
              <div className={overrides.packFeature}>
                <CheckCircle2 size={18} color="#D4AF37" />
                <span style={{ fontWeight: '600' }}>Accès Direct WhatsApp (Ligne personnelle)</span>
              </div>
            </div>
          </div>
          <button className={`${styles.solidBtn} ${overrides.premiumButton}`} style={{ width: '100%' }}>
            Sélectionner
            <ArrowUpRight className={styles.linkBtnIcon} color="#000" />
          </button>
        </motion.div>
      </div>
    </div>
  </section>
);

const About = () => (
  <section className={overrides.standardSection}>
    <div className={`${styles.aboutGrid} ${overrides.container}`}>
      <motion.div 
        className={styles.aboutContent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
      >
        <span className={styles.aboutSubtitle}>L'Expertise</span>
        <h3 className={overrides.sectionTitleAnimated}>QUI EST FRANCK CHEVALIER ?</h3>
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
      </motion.div>
      <motion.div 
        className={styles.aboutImgContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 1 } } }}
      >
        <img 
          src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80" 
          alt="Session de coaching"
          className={styles.aboutImg}
        />
      </motion.div>
    </div>
  </section>
);

const SocialMedia = () => {
  return (
    <section className={overrides.darkerSection}>
      <div className={`${overrides.container} ${overrides.tiktokLayout}`}>
        <motion.div 
          className={overrides.tiktokText}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
        >
          <span className={styles.methodologySubtitle}>Psychologie & Mindset</span>
          <h3 className={overrides.sectionTitleAnimated} style={{ margin: '0 0 1rem 0' }}>SUIVEZ-MOI SUR TIKTOK</h3>
          <p className={styles.socialMediaDesc} style={{ textAlign: 'left', marginBottom: '2rem' }}>
            Découvrez mes analyses, conseils et réflexions quotidiennes pour transformer votre état d'esprit et briser vos croyances limitantes.
          </p>
          <a 
            href="https://www.tiktok.com/@franck.chevalier"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.solidBtn} 
            style={{ textDecoration: 'none', display: 'inline-flex', width: 'max-content' }}
          >
            @franck.chevalier
            <ArrowUpRight className={styles.linkBtnIcon} />
          </a>
        </motion.div>
        
        <motion.div 
          className={overrides.tiktokVideoWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
        >
          <TikTokEmbed url="https://www.tiktok.com/@franck.chevalier/video/7175584701506211078" width="100%" />
        </motion.div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className={styles.app} style={{ backgroundColor: '#FCFAFA' }}>
      <main className={styles.mainFlow} style={{ padding: 0 }}>
        <Hero />
        <Mission />
        <Methodology />
        <Testimonials />
        <Programs />
        <SocialMedia />
        <About />
      </main>
    </div>
  );
}
