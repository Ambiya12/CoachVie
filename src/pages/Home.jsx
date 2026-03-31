import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import franckImage from '../assets/Franck.jpg';
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
        <Link to="/signup" className={styles.linkBtn} style={{ textDecoration: 'none', display: 'inline-flex' }}>
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
    <Divider />
    <div className={styles.missionGrid}>
      <div className={styles.missionTitleBlock}>
        <h2 className={styles.missionTitle}>
          ON NE NÉGLIGE RIEN, ON VA JUSQU'AU BOUT DE L'OBJECTIF.
        </h2>
      </div>
      <div className={styles.missionSpacer} />
      <div className={styles.missionTextBlock}>
        <p className={styles.missionText}>
          "Peu importe votre problématique actuelle, la clé réside dans la fin du conflit avec soi-même. Mon rôle est de vous aider à percevoir vos ressentis profonds pour vous aligner avec qui vous êtes et ce que vous voulez être."
        </p>
      </div>
    </div>
    <Divider />
  </section>
);

const Methodology = () => (
  <section className={styles.methodology}>
    <div className={styles.methodologyHeaderGrid}>
      <div className={styles.methodologyTitleBlock}>
        <h2 className={styles.methodologySubtitle}>La Méthode</h2>
        <h3 className={styles.methodologyTitle}>
          LES TROIS <br />POINTS ESSENTIELS
        </h3>
      </div>
      <div className={styles.methodologyDescBlock}>
        <p className={styles.methodologyDesc}>
          Une approche triangulaire qui assure une fondation inébranlable. Ne sous-estimez aucune de ces trois dimensions.
        </p>
      </div>
    </div>
    
    <Divider />
    
    <div className={styles.cardsGrid}>
      <div className={styles.card}>
        <div className={styles.cardNumber}>01 /</div>
        <h4 className={styles.cardTitle}>ÉNERGIE & ALIMENTATION</h4>
        <p className={styles.cardText}>
          Permet de faire fonctionner parfaitement votre corps et ça tombe bien car qu'est ce qui est essentiel pour créer votre vie, votre corps.
        </p>
      </div>
      <div className={styles.card}>
        <div className={styles.cardNumber}>02 /</div>
        <h4 className={styles.cardTitle}>L'ESPRIT (45 MIN)</h4>
        <p className={styles.cardText}>
          Votre mental a créé de nombreux scénarios qui bloquent le courage de vivre pleinement. Bonne nouvelle j'identifie vos blocages inconscients.
        </p>
      </div>
      <div className={styles.card}>
        <div className={styles.cardNumber}>03 /</div>
        <h4 className={styles.cardTitle}>LE CORPS</h4>
        <p className={styles.cardText}>
          Rien ne peut être fait sans énergie. L'énergie est en libre service dans votre corps, mais que si tu vas la chercher.
        </p>
      </div>
    </div>
  </section>
);

const Programs = () => (
  <section className={styles.programs}>
    <div className={styles.programsInner}>
      <div className={styles.programsHeader}>
        <h2 className={styles.methodologySubtitle} style={{ color: '#999999' }}>Investissement</h2>
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
            <button className={`${styles.linkBtn} ${styles.linkBtnLight}`}>
              Sélectionner cette offre
              <ArrowUpRight className={styles.linkBtnIcon} />
            </button>
          </div>
        </div>
        
        {/* Pack Immersion */}
        <div className={styles.programRow}>
          <div className={styles.programInfo}>
            <div className={styles.popularBadge} style={{ marginBottom: '1rem', width: 'fit-content' }}>Le Plus Populaire</div>
            <h3 className={styles.programTitle}>PACK IMMERSION</h3>
            <span className={styles.programDuration}>12 Mois de transformation</span>
          </div>
          
          <div className={styles.programDetails}>
            <div className={styles.programDetailItem}>1 consultation mensuelle (Visio) pour la mentalité</div>
            <div className={styles.programDetailItem}>Suivi Sport & Nutrition ultra-personnalisé</div>
            <div className={styles.programDetailItem} style={{ color: '#FCFAFA' }}>Accès Direct WhatsApp (Ligne personnelle)</div>
          </div>
          
          <div className={styles.programAction}>
            <div className={styles.programPrice}>1700€</div>
            <button className={`${styles.linkBtn} ${styles.linkBtnLight}`}>
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
        <button className={styles.linkBtn}>
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


export default function Home() {
  return (
    <div className={styles.app}>
      <main>
        <Hero />
        <Mission />
        <Methodology />
        <Programs />
        <About />
      </main>
    </div>
  );
}
