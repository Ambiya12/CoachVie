# CoachVie — Dashboard Redesign : Spécification de conception

> Document de référence issu de la session de brainstorming du 19 avril 2026.
> À utiliser comme base pour l'implémentation du nouveau dashboard utilisateur.

---

## Contexte

Après la création de compte et le diagnostic initial, l'utilisateur accède à un dashboard entièrement repensé centré sur une seule idée : **réduire l'auto-sabotage par la conscience quotidienne**.

Le dashboard actuel (calendrier, onglets Alimentation/Sport/Mental) est entièrement remplacé.

---

## Calibration initiale (une seule fois, avant le premier exercice)

Avant de commencer son programme, l'utilisateur répond à **5 ou 6 questions de calibration**. Ces questions servent uniquement à établir le **point de départ personnalisé** du compteur.

- Elles apparaissent **une seule fois**, après la création de compte et le diagnostic
- Elles ne sont jamais répétées chaque jour
- Elles remplacent le départ arbitraire à 50% — le compteur démarre à un score qui reflète la réalité de l'utilisateur (ex : 55%, 65%, 40%...)
- Le contenu de ces questions doit être défini par Franck Chevalier (questions sur les schémas comportementaux, les automatismes, les blocages récurrents)

> Exemple de format : "Dans votre quotidien, combien de fois agissez-vous sans vous en rendre compte ?" → Souvent / Parfois / Rarement

---

## Concept central : Le Compteur Penser / Conscience

### Visuel
- Un compteur/meter divisé en deux zones :
  - **Gauche — "Penser"** : représente l'auto-sabotage inconscient, le pilote automatique
  - **Droite — "Conscience"** : représente la présence, la reconnaissance de soi, la liberté intérieure
- Le compteur démarre à un **score personnalisé** issu des questions de calibration initiale (pas un 50% arbitraire)
- L'objectif de l'utilisateur : faire glisser le curseur vers la droite (vers "Conscience")

### Règle de progression (calcul journalier)
| Action | Effet sur le compteur |
|---|---|
| **Oui** | Recul "Penser" significatif |
| **Un peu** | Recul "Penser" léger |
| **Non** | 0 — pas de changement |
| **Jour sans réponse (1er de la semaine)** | 0 — jour de grâce |
| **2+ jours sans réponse consécutifs** | Légère montée "Penser" |

### Règle de pattern hebdomadaire (calculée en fin de semaine)
| Pattern détecté | Effet |
|---|---|
| **1–2 "Non" dans la semaine** | 0 — incident isolé, pas de signal |
| **3+ "Non" dans la semaine** | Légère montée "Penser" (l'absence de pratique répétée est un pattern d'auto-sabotage) |

> Principe clé : distinguer **l'acte isolé** ("Non" 1 ou 2 fois) du **pattern** ("Non" 3+ fois). L'auto-sabotage n'est pas un incident, c'est une répétition. Ne jamais punir l'honnêteté d'un mauvais jour.

---

## Structure des programmes

### Programme 6 mois
- 12 exercices au total
- Chaque exercice est pratiqué **15 jours consécutifs**
- Rappels de l'exercice : **toutes les 3 heures, de 8h à 19h** → 4 rappels par jour
- 1 **check-in de fin de journée** pour répondre Oui / Un peu / Non

### Programme 12 mois
- 12 exercices au total
- Chaque exercice est pratiqué **1 mois complet**
- Même rythme de rappels : toutes les 3 heures, de 8h à 19h
- 1 **check-in de fin de journée** pour répondre Oui / Un peu / Non

---

## Système de rappels

| Type | Fréquence | Nature |
|---|---|---|
| **Rappel Exercice** | Toutes les 3h (8h–19h) | Nudge léger — rappelle à l'utilisateur de pratiquer |
| **Check-in Exercice** | 1 fois/jour (fin de journée) | Question Oui / Un peu / Non → met à jour le compteur |
| **Rappel Alimentation** | Léger, quotidien | Simple incitation, sans score lié |
| **Rappel Sport** | Léger, quotidien | Simple incitation, sans score lié |

> Pour le MVP : les rappels sont **in-app** (bannière visible à l'ouverture du dashboard) et/ou **email**. Les notifications push navigateur sont hors scope MVP (infrastructure complexe, taux d'opt-in faible).

---

## Récapitulatif hebdomadaire

Chaque semaine, l'utilisateur voit un **résumé simple** de ses 7 derniers jours :
- Nombre de réponses **Oui**
- Nombre de réponses **Un peu**
- Nombre de réponses **Non**
- Évolution du compteur Penser / Conscience sur la semaine
- Signal si pattern détecté (ex : "3 Non cette semaine → légère montée vers Penser")

> C'est aussi le moment où le calcul de pattern hebdomadaire est appliqué et affiché. Le retour est conscient et visible — pas une pénalité silencieuse. Ne pas afficher chaque réponse individuelle — trop de granularité crée de la culpabilité.

---

## Décisions de conception

| Décision | Alternative écartée | Raison du choix |
|---|---|---|
| "Non" (1–2x/semaine) = 0, sans pénalité | "Non" fait toujours monter le compteur | Distingue l'incident isolé du pattern — évite la boucle de honte |
| "Non" (3+/semaine) = légère montée | Ignorer le pattern | L'auto-sabotage est une répétition, pas un incident |
| Jour de grâce (1 absence/semaine) | Pénalité dès le 1er jour manqué | La vie arrive — 1 absence ne doit pas effacer les progrès |
| Nommage "Penser / Conscience" | "Sabotage %" | Le mot "Sabotage" est une ancre négative dès l'accueil |
| Départ calibré via 5-6 questions initiales | Départ à 50% arbitraire | Score de départ personnalisé, plus honnête et significatif |
| 1 check-in/jour (fin de journée) | 4 check-ins/jour | Réduit la friction, favorise la réflexion intentionnelle |
| Rappels toutes les 3h pour l'exercice uniquement | Rappels fréquents pour tout | Les rappels food/sport restent légers pour ne pas saturer |
| Récap hebdomadaire (pas journalier) | Vue réponse par réponse | Moins de culpabilité, vision de tendance plus saine |

---

## Questions ouvertes (à résoudre avant implémentation)

1. **Les 12 exercices sont-ils du contenu prédéfini** (identique pour tous les utilisateurs) ou **personnalisés** selon les résultats du diagnostic ?
   - Cette décision change toute l'architecture de données.

2. **Quel est le contenu réel de chaque exercice ?** (texte, audio, pratique comportementale ?)
   - L'UI dépend entièrement de ce format.

3. ~~Comment le compteur est-il initialisé à 50% techniquement ?~~ ✅ **Résolu** : Le score de départ est calculé à partir des réponses aux 5-6 questions de calibration initiale, puis stocké en base.
   - **Restant :** Définir la formule de calcul — chaque réponse vaut combien de points ? (à définir avec Franck Chevalier)

4. **Quel est le contenu exact des 5-6 questions de calibration ?**
   - Ce sont des questions comportementales sur les schémas d'auto-sabotage, à rédiger par Franck Chevalier.
   - Format recommandé : choix multiples (3 options par question, pas de Oui/Non binaire)

---

## Hors scope (pour l'instant)

- Notifications push navigateur (service workers, VAPID, permissions)
- Personnalisation avancée par IA
- Tableau de bord coach (vue admin des progrès utilisateurs)
- Comparaison entre utilisateurs

---

## Prochaine étape

Répondre aux questions ouvertes ci-dessus, puis définir les wireframes des écrans :
1. Vue principale du dashboard (compteur + exercice du jour)
2. Écran de check-in (question + 3 réponses)
3. Récap hebdomadaire
4. Vue rappels Alimentation / Sport
