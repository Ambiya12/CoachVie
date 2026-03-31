**STRUCTURE GLOBALE DE L’INTERFACE (APRÈS CONNEXION)**
======================================================

**MENU PRINCIPAL (HEADER)**
---------------------------

Une fois connecté, le menu change et affiche **4 onglets principaux** :

1.  **Mon espace**
    
2.  **Alimentation**
    
3.  **Sport**
    
4.  **Libération de l’esprit**
    

**1\. ONGLET : MON ESPACE (TABLEAU DE BORD PRINCIPAL)**
=======================================================

**Objectif**
------------

Centraliser toute l’expérience utilisateur.

**Contenu principal : UN PLANNING VISUEL**
------------------------------------------

### Format :

*   Vue **mensuelle (4 semaines)**
    
*   Format type calendrier
    
*   Possibilité de voir semaine par semaine
    

**Ce que contient le planning**
-------------------------------

Chaque jour peut contenir :

### 1\. Alimentation (couleur verte)

*   Exemple : 08h00 graines de chia
    
*   Exemple : 12h30 repas équilibré
    

### 2\. Sport (couleur bleue)

*   Exemple : jeudi 18h natation
    
*   Exemple : dimanche 10h course 20 min
    

### 3\. Mental (couleur violette)

*   Exemple : 11h rappel responsabilité
    
*   Exemple : 14h exercice mental
    

**Interaction utilisateur**
---------------------------

*   Cliquer sur un élément → voir détail
    
*   Modifier / supprimer
    
*   Ajouter manuellement
    

**2\. ONGLET : ALIMENTATION**
=============================

**Objectif**
------------

Permettre à l’utilisateur de :

*   choisir une problématique
    
*   recevoir des recommandations
    
*   ajouter au planning
    

**Étape 1 : Choix de la problématique**
---------------------------------------

Afficher 5 problématiques principales :

### 1\. Manque d’énergie

### 2\. Surpoids

### 3\. Problèmes digestifs

### 4\. Manque de concentration

### 5\. Fatigue générale

**Étape 2 : Recommandations associées**
---------------------------------------

### Exemple : Manque d’énergie

Proposer :

*   Shilajit
    
*   Graines de chia
    
*   Eau + citron
    
*   Alimentation riche en protéines
    

**Étape 3 : Interaction produit**
---------------------------------

Quand l’utilisateur clique sur **“Graines de chia”** :

### Afficher une fiche :

**Titre :** Graines de chia**Bénéfices :** énergie durable, digestion, satiété

**Étape 4 : Ajouter au planning**
---------------------------------

Bouton :**Ajouter à mon planning**

**Étape 5 : Paramétrage**
-------------------------

Popup ou écran :

### Champs :

*   Moment de la journée :
    
    *   Matin
        
    *   Midi
        
    *   Soir
        
*   Heure :
    
    *   ex : 08h00
        
*   Fréquence :
    
    *   Tous les jours
        
    *   1 jour sur 2
        
    *   2 fois par semaine
        
    *   Personnalisé
        
*   Durée :
    
    *   1 mois
        
    *   2 mois
        
    *   3 mois
        
    *   Personnalisé
        

**Résultat**
------------

→ L’élément apparaît automatiquement dans **Mon espace (planning)**

**3\. ONGLET : SPORT**
======================

**Objectif**
------------

Permettre à l’utilisateur de choisir ses activités physiques et les planifier.

**Étape 1 : Choix du niveau**
-----------------------------

*   Débutant
    
*   Intermédiaire
    
*   Avancé
    

**Étape 2 : Propositions**
--------------------------

### Débutant :

*   Marche
    
*   Natation douce
    
*   Yoga
    

### Intermédiaire :

*   Course
    
*   Renforcement
    
*   Natation
    

### Avancé :

*   HIIT
    
*   Musculation
    
*   Cardio intensif
    

**Étape 3 : Ajouter au planning**
---------------------------------

Même logique que l’alimentation :

### Paramétrage :

*   Jour :
    
    *   ex : jeudi
        
*   Heure :
    
    *   ex : 18h00
        
*   Fréquence :
    
    *   1 fois / semaine
        
    *   2 fois / semaine
        
*   Durée :
    
    *   1 mois
        
    *   2 mois
        

**Résultat**
------------

→ Ajout automatique dans **Mon espace**

**4\. ONGLET : LIBÉRATION DE L’ESPRIT**
=======================================

**Objectif**
------------

Gérer le programme mental sur 12 mois.

**Structure**
-------------

### Mois 1 :

**Responsabilité**

### Mois 2 :

Lâcher prise

### Mois 3 :

Présence... jusqu’à 12

**Contenu d’un module**
-----------------------

### Exemple : Responsabilité

*   Vidéo explicative
    
*   Texte court
    
*   Exercice quotidien
    

**Ajout des rappels**
---------------------

Bouton : **Activer les rappels**

**Paramétrage**
---------------

*   Fréquence :
    
    *   toutes les 2h
        
    *   toutes les 3h
        
*   Horaires :
    
    *   ex : 08h → 20h
        

**Exemple notifications**
-------------------------

*   11h : observe ta réaction
    
*   14h : reprends la responsabilité
    
*   17h : reste conscient
    
*   20h : analyse ta journée
    

**Résultat**
------------

→ Notifications envoyées + affichées dans **Mon espace**

**5\. LOGIQUE TECHNIQUE POUR LE WEBMASTER**
===========================================

**Ajout au planning (commun aux 3 modules)**
--------------------------------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   create_event(    user_id,    type = alimentation / sport / mental,    title,    date,    time,    frequency,    duration  )   `

**Stockage**
------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   EVENTS  - id  - user_id  - type  - title  - datetime  - recurrence  - duration   `

**Affichage planning**
----------------------

Le planning récupère tous les événements :

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   get_events(user_id)  → afficher sur calendrier   `

**6\. EXPÉRIENCE UTILISATEUR (IMPORTANT)**
==========================================

Le système doit être :

*   simple
    
*   rapide
    
*   visuel
    
*   sans friction
    

**Logique mentale côté utilisateur**
------------------------------------

1.  Je comprends mon problème
    
2.  Je choisis une solution
    
3.  Je clique
    
4.  C’est automatiquement ajouté
    
5.  Je suis guidé sans réfléchir
    

**7\. PHRASE SIMPLE À DONNER AU WEBMASTER**
===========================================

Le système doit permettre à l’utilisateur de sélectionner des actions (alimentation, sport, mental) et de les intégrer automatiquement dans un planning mensuel interactif, avec rappels et notifications.

**8\. RÉSUMÉ ULTRA SIMPLE**
===========================

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Menu :  Mon espace / Alimentation / Sport / Mental  Dans chaque onglet :  → choix  → configuration  → ajout au planning  Dans Mon espace :  → planning global  → vision claire  → suivi   `