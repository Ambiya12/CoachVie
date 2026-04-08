Coach Vie - Documentation Complete POC & MVP
=============================================

## 1) Vision produit

Coach Vie est une application web de coaching bien-etre fondee sur 3 piliers:

1. Alimentation
2. Sport
3. Liberation de l'esprit

L'objectif est de transformer un diagnostic utilisateur en programme personnalise, lisible et actionnable dans un dashboard calendrier.

Le produit doit etre comprenable, simple a utiliser, et suffisamment robuste pour une mise en marche commerciale en phase MVP.


## 2) Objectifs business et produit

### Objectifs business

1. Valider la proposition de valeur: "diagnostic -> plan concret".
2. Rendre le produit commercialisable en MVP.
3. Generer les premiers retours utilisateurs exploitables.

### Objectifs produit

1. Permettre un onboarding rapide avec authentification.
2. Produire un plan personnalise via un moteur de regles deterministe.
3. Offrir un suivi quotidien via calendrier + barre laterale detail.
4. Donner a un admin unique la capacite de gerer les contenus de base.


## 3) Portee

### Dans le perimetre POC

1. Authentification utilisateur (inscription, connexion, deconnexion).
2. Diagnostic multi-etapes sur les 3 piliers.
3. Scoring et generation automatique d'un plan.
4. Dashboard calendrier avec detail de jour en barre laterale droite.
5. Marquage simple des actions (a faire / termine).

### Dans le perimetre MVP

1. Landing page marketing complete.
2. Paiement et abonnement via passerelle externe (ex: Stripe).
3. Vues contenu dediees par pilier (Alimentation, Sport, Esprit).
4. Espace admin (admin unique) pour gestion de contenus et regles.
5. Stabilisation UX et criteres de qualite pre-lancement.

### Hors perimetre (POC et MVP initial)

1. Coaching video en direct.
2. Forum communaute avance.
3. Integrations tierces complexes (Apple Health, montres connectees, etc.).
4. IA generative de contenu en temps reel.


## 4) Utilisateurs cibles et roles

### Persona principal

Personnes qui souhaitent ameliorer leur bien-etre de facon structuree avec un parcours simple et guide.

### Roles applicatifs

1. Utilisateur membre: realise le diagnostic, consulte son planning et suit ses actions.
2. Admin unique: gere la bibliotheque de contenus, les regles de mapping score -> plan, et la supervision operationnelle de base.


## 5) Parcours utilisateur

### 5.1 Parcours POC

1. L'utilisateur cree un compte ou se connecte.
2. Il complete le diagnostic en 3 sections.
3. Le systeme calcule les scores par pilier.
4. Le systeme genere un plan personnalise.
5. L'utilisateur visualise le calendrier.
6. Il clique un jour et consulte le detail dans la barre laterale droite.
7. Il marque les actions comme terminees.

### 5.2 Parcours MVP

1. L'utilisateur arrive sur la landing page.
2. Il cree un compte et choisit un abonnement.
3. Il complete le diagnostic puis accede a son plan.
4. Il suit les actions et consulte les contenus complets par pilier.
5. Il renouvele ou met a jour son abonnement selon les regles de paiement.


## 6) Exigences fonctionnelles detaillees

### 6.1 Authentification

- FR-AUTH-01: inscription par email + mot de passe.
- FR-AUTH-02: connexion securisee.
- FR-AUTH-03: deconnexion et fin de session.
- FR-AUTH-04: protection des routes membres.
- FR-AUTH-05: protection des routes admin (admin unique).

### 6.2 Diagnostic

- FR-DIAG-01: formulaire multi-etapes (Alimentation, Sport, Esprit).
- FR-DIAG-02: validation des champs obligatoires.
- FR-DIAG-03: sauvegarde des reponses avant soumission finale.
- FR-DIAG-04: calcul d'un score par pilier.
- FR-DIAG-05: stockage des resultats de diagnostic par utilisateur.

### 6.3 Generation de plan

- FR-PLAN-01: generation automatique basee sur regles explicites.
- FR-PLAN-02: plan coherent sur une fenetre temporelle definie (ex: 4 semaines).
- FR-PLAN-03: au moins une action planifiee par pilier sur la periode.
- FR-PLAN-04: absence de doublons non voulus sur une meme journee.
- FR-PLAN-05: conservation d'une trace de la version du plan genere.

### 6.4 Dashboard calendrier

- FR-DASH-01: affichage calendrier avec indicateurs journaliers.
- FR-DASH-02: clic sur une date -> ouverture detail dans barre laterale droite.
- FR-DASH-03: affichage du detail: titre, pilier, description, duree, lien contenu.
- FR-DASH-04: marquage d'etat d'une action (a faire, termine).
- FR-DASH-05: conservation des etats apres rafraichissement de page.

### 6.5 Contenus (MVP)

- FR-CONT-01: vue Alimentation.
- FR-CONT-02: vue Sport.
- FR-CONT-03: vue Liberation de l'esprit.
- FR-CONT-04: contenus textes, media ou liens externes integres.

### 6.6 Paiement/abonnement (MVP)

- FR-BILL-01: creation d'un abonnement via passerelle externe.
- FR-BILL-02: verification de l'etat d'abonnement pour acces premium.
- FR-BILL-03: gestion minimale des etats (actif, en attente, annule, expire).

### 6.7 Administration (admin unique)

- FR-ADM-01: authentification admin dediee.
- FR-ADM-02: CRUD de base sur contenus/exercices.
- FR-ADM-03: gestion des regles de mapping score -> recommandation.
- FR-ADM-04: activation/desactivation d'un contenu.
- FR-ADM-05: journal minimal des actions admin critiques.


## 7) Regles metier

1. Chaque question du diagnostic contribue a un score de pilier.
2. Le plan est genere de maniere deterministe (meme entree -> meme sortie).
3. Le plan appartient a l'utilisateur qui a soumis le diagnostic.
4. Un utilisateur ne peut acceder qu'a ses propres donnees.
5. L'admin unique peut modifier contenu et regles, jamais les donnees privees d'un utilisateur sans besoin explicite.


## 8) Exigences non fonctionnelles

### Performance

1. Temps de reponse cible des API critiques inferieur a 500 ms en charge nominale.
2. Chargement initial du dashboard optimise pour les devices mobiles courants.

### Securite et confidentialite

1. Les donnees de diagnostic sont considerees sensibles.
2. Mots de passe stockes de facon hash + salt.
3. Validation des entrees cote backend.
4. Controle d'acces strict (utilisateur vs admin).

### Fiabilite

1. Disponibilite cible adequate pour early adopters (objectif de service >= 99%).
2. Journalisation des erreurs critiques.
3. Sauvegarde reguliere de la base de donnees.

### Scalabilite

1. Cible initiale: 100 a 500 utilisateurs actifs.
2. Architecture prevue pour evolution progressive apres validation MVP.

### Maintenabilite

1. Documentation claire des regles de scoring et mapping.
2. Separation des responsabilites frontend/backend.
3. Journal des decisions produit/technique maintenu.


## 9) Specification fonctionnelle Frontend

### Pages POC

1. Login / Signup.
2. Diagnostic multi-etapes.
3. Resultat/transition vers plan.
4. Dashboard calendrier + barre laterale droite.

### Pages MVP supplementaires

1. Landing page complete (Hero, mission, methodologie, tarifs, a propos, CTA).
2. Vues detaillees des 3 piliers.
3. Parcours abonnement.
4. Espace admin simple.

### Etats UX obligatoires

1. Loading.
2. Empty state.
3. Error state explicite.
4. Success feedback pour actions utilisateur.


## 10) Specification fonctionnelle Backend

### Modules API

1. Auth: inscription, connexion, session, deconnexion.
2. Diagnostic: soumission, scoring, historique minimal.
3. Planning: creation plan, lecture calendrier, mise a jour statut action.
4. Content: lecture des contenus par pilier.
5. Billing (MVP): integration passerelle, etat abonnement.
6. Admin: gestion contenu et regles.

### Entites metier minimales

1. User.
2. AdminUser.
3. DiagnosticSession + DiagnosticResponses.
4. ProfileScores.
5. Plan + PlanItems.
6. Exercises/ContentModules.
7. MappingRules.
8. Subscription (MVP).


## 11) Roadmap de livraison

### Phase 1 - POC

Objectif: prouver la boucle coeur "diagnostic -> plan -> execution".

Livrables:

1. Auth de base.
2. Diagnostic 3 piliers.
3. Moteur de generation deterministe.
4. Dashboard calendrier + detail lateral.
5. Completion des actions.

### Phase 2 - MVP

Objectif: rendre le produit vendable et operable.

Livrables:

1. Landing marketing complete.
2. Paiement et abonnement.
3. Vues contenu et experience enrichie.
4. Espace admin unique.
5. Stabilisation qualite + pilotage KPIs.


## 12) Criteres d'acceptation

### Acceptation POC

1. Un utilisateur peut s'inscrire, se connecter, et terminer le diagnostic sans perte de donnees.
2. Le systeme genere automatiquement un plan personnalise exploitable.
3. Le calendrier affiche les actions par jour avec detail lateral fonctionnel.
4. Le statut d'une action est persistant.
5. Un utilisateur ne voit jamais les donnees d'un autre utilisateur.

### Acceptation MVP

1. Le parcours landing -> inscription -> abonnement -> dashboard est fluide.
2. Les zones de contenu par pilier sont accessibles selon les regles d'abonnement.
3. L'admin unique peut gerer contenus et regles sans intervention technique.
4. Les parcours critiques sont stables sur desktop et mobile.


## 13) KPI de succes

1. Taux de completion du diagnostic.
2. Temps moyen pour obtenir un premier plan.
3. Taux d'engagement hebdomadaire sur le planning.
4. Taux de completion des actions planifiees.
5. Taux de conversion vers abonnement (MVP).


## 14) Risques et mitigations

1. Risque: regles de scoring trop floues.
    Mitigation: matrice de scoring explicite et testee avec cas exemples.
2. Risque: plan genere peu pertinent.
    Mitigation: bibliotheque de contenus curatee et revue metier.
3. Risque: surcharge de scope avant lancement.
    Mitigation: respecter strictement le perimetre defini dans ce document.
4. Risque: dette UX sur mobile.
    Mitigation: tests de parcours critiques sur formats mobiles cibles.


## 15) Journal des decisions

1.  **Decision:** Prioriser la boucle coeur en POC (diagnostic -> dashboard) avant extension marketing.
    
2.  **Decision:** Utiliser une barre laterale droite pour le detail journalier.
    
3.  **Decision:** Admin unique en POC/MVP initial.
    
4.  **Decision:** **Architecture "Lean" sans librairies tierces superflues.**
    
    *   _Raison:_ Garder un contrôle total sur le code, minimiser le poids de l'application et éviter la dépendance à des écosystèmes complexes (Type TanStack ou Tailwind) pour la phase de lancement.
        
5.  **Decision:** Utiliser du **SQL Pur** plutôt qu'un ORM.
    
    *   _Raison:_ Performance maximale pour le moteur de scoring et simplicité de maintenance des requêtes relationnelles.
        

## 16) Prochaine etape documentaire

A partir de ce document, produire 4 annexes de travail:

1.  Matrice de scoring detaillee (questions, poids, seuils).
    
2.  Catalogue initial de contenus/exercices par pilier.
    
3.  Contrat API (endpoints + schemas).
    
4.  Plan de tests d'acceptation.
    

## 17) Stack Technique Detaillee (Validation MVP)

### 17.1 Frontend (Le choix de la simplicité)

*   **Framework:** **React 19** via **Vite** (pour la rapidité au démarrage).
    
*   **Styling:** **CSS Modules** (\*.module.css).
    
    *   Isolation des styles par composant sans surcharge de framework CSS.
        
    *   Utilisation de variables CSS natives pour la charte graphique (couleurs des 3 piliers).
        
*   **Data Fetching:** **API Fetch native** (JavaScript window.fetch).
    
    *   Gestion manuelle des états loading, error, et data via des Hooks personnalisés (useFetch).
        
*   **State Management:** **React Context API** & **useState**.
    
    *   Context pour l'authentification et les résultats globaux du diagnostic.
        
*   **Routing:** **React Router** (Navigation entre pages).
    

### 17.2 Backend (Le choix de la robustesse)

*   **Runtime:** **Node.js** avec **Express.js**.
    
*   **Langage:** **JavaScript (ES6+)/TypeScript**.
    
*   **Base de donnees:** **PostgreSQL**.
    
*   **Acces aux donnees:** **SQL Brut** (via le driver pg).
    
    *   Ecriture manuelle des requêtes pour les entités User, Plan et Diagnostic.
        
*   **Authentification:** **JWT (JSON Web Tokens)** stockés de manière sécurisée (Cookies HttpOnly).
    
*   **Validation:** Logique de validation manuelle des entrées pour garantir la cohérence du diagnostic.
    