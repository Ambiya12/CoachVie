import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Brain, Activity, Flame, Quote, CheckCircle2 } from 'lucide-react';
import { TikTokEmbed } from 'react-social-media-embed';
import { motion } from 'framer-motion';
import heroVideo from '../assets/calm.mp4';
import tiktokVideo from '../assets/tiktok.mp4';
import franckPhoto from '../assets/Franck.jpg';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/900.css';
import styles from '../App.module.css';
import overrides from './HomeOverrides.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const pillButton = {
  backgroundColor: '#fff',
  color: '#000',
  padding: '0.8rem 2rem',
  borderRadius: '9999px',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  width: 'max-content',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  fontSize: '0.85rem',
  transition: 'transform 0.3s ease, backgroundColor 0.3s ease',
  border: '1px solid #fff'
};

const Hero = () => (
  <section className={overrides.hero}>
    <video autoPlay loop muted playsInline className={overrides.heroVideoBg}>
      <source src={heroVideo} type="video/mp4" />
    </video>
    <div className={overrides.heroOverlayBg}></div>
    <div className={`${styles.heroGrid} ${overrides.container}`} style={{ gridTemplateColumns: '1fr', display: 'block' }}>
      <motion.div 
        className={styles.heroContent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className={styles.labelWrapper}>
          <div className={styles.labelLine} style={{ backgroundColor: '#fff', opacity: 0.5 }} />
          <span className={styles.labelText} style={{ color: '#aaa', fontWeight: '500' }}>The Experience</span>
        </div>
        <h2 className={overrides.heroTitleSmall} style={{ fontFamily: 'Inter, sans-serif' }}>
          Reconnectez-vous <br />à votre force intérieure.
        </h2>
        <p className={overrides.heroSubtitleAccent} style={{ fontFamily: 'Inter, sans-serif' }}>
          Il est temps d'arrêter les scénarios limitants et d'aligner votre esprit avec votre véritable nature.
        </p>
        <Link to="/signup" style={{ ...pillButton, marginTop: '1.5rem' }} 
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = '#f0f0f0'; }} 
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.backgroundColor = '#fff'; }}>
          Démarrez le coaching
          <ArrowUpRight size={18} />
        </Link>
      </motion.div>
    </div>
  </section>
);

const Mission = () => {
  const cards = [
    { title: "Découvrir sa vraie nature", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800" },
    { title: "Augmenter son potentiel", img: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=800" },
    { title: "Réaliser ses objectifs", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800" },
    { title: "Vivre sa meilleure vie", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <section className={overrides.missionMinimalistSection} style={{ backgroundColor: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ backgroundColor: '#000', padding: 'clamp(3rem, 6vw, 6rem) 2rem', borderRadius: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <h2 className={overrides.missionMinimalistTitle} style={{ color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: '800' }}>
            On ne change rien, <br />
            on va supprimer le personnage <br />
            que vous avez créé.
          </h2>
        </motion.div>

        <div className={overrides.missionMinimalistGrid}>
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              className={overrides.missionCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
              }}
            >
              <img src={card.img} alt={card.title} className={overrides.missionCardVideo} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              <h4 className={overrides.missionCardTitle} style={{ fontFamily: 'Inter, sans-serif', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>{card.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Methodology = () => {
  const steps = [
    {
      id: "01",
      icon: <Flame size={40} strokeWidth={2} color="#fff" />,
      title: "ÉNERGIE & ALIMENTATION",
      desc: "Permet de faire fonctionner parfaitement votre corps et ça tombe bien car qu'est-ce qui est essentiel pour créer votre vie ? Votre corps."
    },
    {
      id: "02",
      icon: <Brain size={40} strokeWidth={2} color="#fff" />,
      title: "L'ESPRIT (45 MIN)",
      desc: "Votre mental a créé de nombreux scénarios qui bloquent le courage de vivre pleinement. Bonne nouvelle: j'identifie vos blocages inconscients."
    },
    {
      id: "03",
      icon: <Activity size={40} strokeWidth={2} color="#fff" />,
      title: "LE CORPS",
      desc: "Rien ne peut être fait sans énergie. L'énergie est en libre-service dans votre corps, mais uniquement si vous décidez d'aller la chercher."
    }
  ];

  return (
    <section className={overrides.darkerSection} style={{ backgroundColor: '#fff', color: '#000', borderTop: 'none', fontFamily: 'Inter, sans-serif' }}>
      <div className={overrides.container} style={{ backgroundColor: '#000', padding: 'clamp(3rem, 6vw, 6rem) 2rem', borderRadius: '24px' }}>
        <motion.div 
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <span className={styles.methodologySubtitle} style={{ color: '#aaa', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>La Méthode</span>
          <h3 className={overrides.sectionTitleAnimated} style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', marginTop: '0.5rem', fontWeight: '800' }}>
            Trois Dimensions Inébranlables
          </h3>
          <p style={{ maxWidth: '600px', margin: '1rem auto 0', fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.95rem, 3vw, 1.05rem)', color: '#ccc', lineHeight: '1.6' }}>
            Une approche triangulaire qui assure une fondation solide. Ne sous-estimez aucune de ces trois dimensions.
          </p>
        </motion.div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'flex-start' }}>
          {steps.map((step, index) => (
            <motion.div 
              key={step.id} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start', 
                textAlign: 'left', 
                padding: 'clamp(1.5rem, 4vw, 2.5rem)', 
                backgroundColor: '#111', 
                borderRadius: '12px', 
                border: '1px solid #333',
                marginTop: index > 0 && typeof window !== 'undefined' && window.innerWidth > 900 ? `${index * 2}rem` : '0',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
              }}
            >
              <div style={{ marginBottom: '1.5rem', backgroundColor: '#222', padding: '1rem', borderRadius: '50%' }}>{step.icon}</div>
              <div style={{ 
                fontFamily: 'Inter, sans-serif', 
                fontSize: 'clamp(3rem, 6vw, 4rem)', 
                fontWeight: '900', 
                color: 'rgba(255, 255, 255, 0.03)',
                position: 'absolute',
                top: '-0.5rem',
                right: '0',
                lineHeight: 1
              }}>
                {step.id}
              </div>
              <h4 style={{ fontSize: '1.1rem', fontFamily: 'Inter, sans-serif', fontWeight: '800', marginBottom: '0.8rem', letterSpacing: '0.02em', color: '#fff', textTransform: 'uppercase' }}>{step.title}</h4>
              <p style={{ color: '#aaa', lineHeight: '1.6', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className={overrides.standardSection} style={{ backgroundColor: '#fff', color: '#000', padding: 'clamp(4rem, 8vw, 8rem) 0' }}>
    <div className={overrides.container}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeUp}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem', backgroundColor: '#fcfcfc', border: '1px solid #eaeaea', borderRadius: '16px' }}
        >
          <Quote size={32} color="#000" strokeWidth={1} style={{ marginBottom: '1.5rem', opacity: 0.1 }} />
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', lineHeight: '1.5', color: '#111', marginBottom: '1.5rem', fontWeight: '500', fontStyle: 'italic' }}>
            "Franck changed my life entirely. I was stuck in my career and overwhelmed with mental blocks. In 6 months, everything shifted."
          </p>
          <div style={{ width: '30px', height: '2px', backgroundColor: '#000', marginBottom: '1rem' }} />
          <div style={{ fontWeight: '700', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000' }}>
            Laurent D.
          </div>
        </motion.div>
        
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }}}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem', backgroundColor: '#fcfcfc', border: '1px solid #eaeaea', borderRadius: '16px' }}
        >
          <Quote size={32} color="#000" strokeWidth={1} style={{ marginBottom: '1.5rem', opacity: 0.1 }} />
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', lineHeight: '1.5', color: '#111', marginBottom: '1.5rem', fontWeight: '500', fontStyle: 'italic' }}>
            "His approach is blunt, honest, and exactly what I needed. He doesn't just talk about mindset, we reworked my entire baseline."
          </p>
          <div style={{ width: '30px', height: '2px', backgroundColor: '#000', marginBottom: '1rem' }} />
          <div style={{ fontWeight: '700', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000' }}>
            Marine S.
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Programs = () => (
  <section className={overrides.darkerSection} style={{ backgroundColor: '#000', color: '#fff', padding: 'clamp(5rem, 8vw, 8rem) 0' }}>
    <div className={overrides.container}>
      <motion.div 
        style={{ textAlign: 'center', marginBottom: '4rem' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <h3 className={overrides.sectionTitleAnimated} style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', letterSpacing: '-0.02em', color: '#fff' }}>Choisissez Votre Parcours</h3>
      </motion.div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 }}}}
          style={{ backgroundColor: '#111', borderRadius: '16px', border: '1px solid #333', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', fontWeight: '700', color: '#fff', letterSpacing: '0.05em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>PACK ÉQUILIBRE</h3>
            <p style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '2rem' }}>6 Mois d'engagement pour retrouver l'équilibre parfait.</p>
            <div style={{ fontSize: '2.5rem', fontFamily: 'Inter, sans-serif', fontWeight: '800', color: '#fff', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1.5rem' }}>1080€</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <CheckCircle2 size={18} color="#fff" />
                <span style={{ fontSize: '0.85rem', color: '#ddd' }}>1 consultation mensuelle (Visio)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <CheckCircle2 size={18} color="#fff" />
                <span style={{ fontSize: '0.85rem', color: '#ddd' }}>Suivi Sport & Nutrition</span>
              </div>
            </div>
          </div>
          <button style={{ ...pillButton, width: '100%', justifyContent: 'center', backgroundColor: '#000', color: '#fff', border: '1px solid #333' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#000'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#fff'; }}>
            Sélectionner <ArrowUpRight size={16} />
          </button>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 }}}}
          style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '2.5rem 2rem', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div style={{ position: 'absolute', top: '-10px', right: '1.5rem', background: '#000', color: '#fff', fontSize: '0.65rem', fontWeight: '800', padding: '4px 10px', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            VIP
          </div>
          <div>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', fontWeight: '800', color: '#000', letterSpacing: '0.05em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>PACK IMMERSION</h3>
            <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '2rem' }}>12 Mois de transformation pour aller au bout de l'objectif.</p>
            <div style={{ fontSize: '2.5rem', fontFamily: 'Inter, sans-serif', fontWeight: '800', color: '#000', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>1700€</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <CheckCircle2 size={18} color="#000" />
                <span style={{ fontSize: '0.85rem', color: '#333' }}>1 consultation mensuelle (Visio)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <CheckCircle2 size={18} color="#000" />
                <span style={{ fontSize: '0.85rem', color: '#333' }}>Suivi Sport & Nutrition ultra-personnalisé</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <CheckCircle2 size={18} color="#000" />
                <span style={{ fontSize: '0.85rem', color: '#000', fontWeight: '700' }}>Accès Direct WhatsApp</span>
              </div>
            </div>
          </div>
          <button style={{ ...pillButton, width: '100%', justifyContent: 'center', backgroundColor: '#000', color: '#fff', border: '1px solid #000' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = '#222'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.backgroundColor = '#000'; }}>
            Sélectionner <ArrowUpRight size={16} />
          </button>
        </motion.div>
      </div>
    </div>
  </section>
);

const About = () => (
  <section className={overrides.standardSection} style={{ backgroundColor: '#000' }}>
    <div className={`${styles.aboutGrid} ${overrides.container}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <span style={{ color: '#aaa', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>L'Expertise</span>
        <h3 className={overrides.sectionTitleAnimated} style={{ color: '#fff', marginTop: '0.5rem', fontWeight: '800' }}>QUI EST FRANCK CHEVALIER ?</h3>
        <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          J'accompagne les individus à travers une approche holistique unique. Mon expertise repose sur l'alignement de l'énergie, de l'esprit et du corps, forgée par des années de pratique et une profonde humanité. 
        </p>
        <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '2rem' }}>
          Ensemble, nous déconstruisons vos croyances limitantes pour bâtir un socle solide. Aucune demi-mesure: l'objectif est une vie pleinement vécue, sans regrets.
        </p>
        <button style={{ ...pillButton, backgroundColor: '#fff', color: '#000', border: '1px solid #fff' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = '#f0f0f0'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.backgroundColor = '#fff'; }}>
          Réserver ma séance (15 min)
          <ArrowUpRight size={16} />
        </button>
      </motion.div>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, delay: 0.1 } } }}
      >
        <img 
          src={franckPhoto} 
          alt="Franck en session"
          style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'cover', aspectRatio: '4/5' }}
        />
      </motion.div>
    </div>
  </section>
);

const SocialMedia = () => {
  return (
    <section className={overrides.darkerSection} style={{ backgroundColor: '#fff', color: '#000', padding: 'clamp(4rem, 8vw, 6rem) 0' }}>
      <div className={overrides.container} style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '3rem', alignItems: 'center' }}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
        >
          <span style={{ color: '#555', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Psychologie & Mindset</span>
          <h3 className={overrides.sectionTitleAnimated} style={{ color: '#000', marginTop: '0.5rem', fontWeight: '800' }}>SUIVEZ-MOI SUR TIKTOK</h3>
          <p style={{ color: '#444', lineHeight: '1.6', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Découvrez mes analyses, conseils et réflexions quotidiennes pour transformer votre état d'esprit et briser vos croyances limitantes.
          </p>
          <a 
            href="https://www.tiktok.com/@franck.chevalier"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...pillButton, backgroundColor: '#000', color: '#fff', border: '1px solid #000' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            @franck.chevalier
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } } }}
          style={{ width: '100%', maxWidth: '300px', margin: '0 auto', borderRadius: '16px', overflow: 'hidden' }}
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            controls
            style={{ width: '100%', borderRadius: '16px', display: 'block' }}
          >
            <source src={tiktokVideo} type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div style={{ backgroundColor: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <main style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column' }}>
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
