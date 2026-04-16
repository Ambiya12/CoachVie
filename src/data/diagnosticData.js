export const DIAGNOSTIC_STEPS = {
  INTRO: 'intro',
  TRANSITION_VOLONTE: 'transition_volonte',
  Q_VOLONTE: 'q_volonte',
  TRANSITION_ALIMENTATION: 'transition_alimentation',
  Q_ALIMENTATION: 'q_alimentation',
  TRANSITION_ENERGIE: 'transition_energie',
  Q_ENERGIE: 'q_energie',
  ANALYSIS: 'analysis',
  RESULTS: 'results',
};

export const VOLONTE_QUESTIONS = [
  {
    id: 'v1',
    question: 'A quel point veux-tu vraiment changer aujourd hui ?',
    options: [
      { label: 'Je ne sais pas vraiment', value: 1 },
      { label: 'J y pense, sans plus', value: 2 },
      { label: 'J en ai envie', value: 3 },
      { label: 'Je suis motive', value: 4 },
      { label: 'Je suis pret a m engager serieusement', value: 5 },
    ],
  },
  {
    id: 'v2',
    question: 'Quand tu commences quelque chose pour toi, tiens-tu dans la duree ?',
    options: [
      { label: 'Presque jamais', value: 1 },
      { label: 'Rarement', value: 2 },
      { label: 'Parfois', value: 3 },
      { label: 'Souvent', value: 4 },
      { label: 'Presque toujours', value: 5 },
    ],
  },
  {
    id: 'v3',
    question: 'Te sens-tu pret a sortir de tes habitudes, meme si cela demande un effort ?',
    options: [
      { label: 'Pas du tout', value: 1 },
      { label: 'Peu', value: 2 },
      { label: 'Moyennement', value: 3 },
      { label: 'Oui', value: 4 },
      { label: 'Totalement', value: 5 },
    ],
  },
];

export const ALIMENTATION_QUESTIONS = [
  {
    id: 'a4',
    question: 'Comment decrirais-tu ton alimentation actuelle ?',
    options: [
      { label: 'Tres mauvaise', value: 1 },
      { label: 'Plutot mauvaise', value: 2 },
      { label: 'Moyenne', value: 3 },
      { label: 'Plutot bonne', value: 4 },
      { label: 'Tres bonne', value: 5 },
    ],
  },
  {
    id: 'a5',
    question: 'A quelle frequence manges-tu des aliments industriels, sucres ou de la malbouffe ?',
    options: [
      { label: 'Tres souvent', value: 1 },
      { label: 'Souvent', value: 2 },
      { label: 'Parfois', value: 3 },
      { label: 'Rarement', value: 4 },
      { label: 'Presque jamais', value: 5 },
    ],
  },
  {
    id: 'a6',
    question: 'Apres avoir mange, te sens-tu leger et bien, ou lourd et fatigue ?',
    options: [
      { label: 'Tres lourd / fatigue', value: 1 },
      { label: 'Souvent lourd', value: 2 },
      { label: 'Variable', value: 3 },
      { label: 'Plutot bien', value: 4 },
      { label: 'Leger et en forme', value: 5 },
    ],
  },
];

export const ENERGIE_QUESTIONS = [
  {
    id: 'e7',
    question: 'Quel est ton niveau d energie au quotidien ?',
    options: [
      { label: 'Tres faible', value: 1 },
      { label: 'Faible', value: 2 },
      { label: 'Moyen', value: 3 },
      { label: 'Bon', value: 4 },
      { label: 'Tres bon', value: 5 },
    ],
  },
  {
    id: 'e8',
    question: 'Combien de fois bouges-tu ou fais-tu du sport par semaine ?',
    options: [
      { label: 'Jamais', value: 1 },
      { label: '1 fois', value: 2 },
      { label: '2 fois', value: 3 },
      { label: '3 a 4 fois', value: 4 },
      { label: '5 fois ou plus', value: 5 },
    ],
  },
  {
    id: 'e9',
    question: 'Comment te sens-tu physiquement dans ton corps aujourd hui ?',
    options: [
      { label: 'Tres mal', value: 1 },
      { label: 'Pas bien', value: 2 },
      { label: 'Moyen', value: 3 },
      { label: 'Bien', value: 4 },
      { label: 'Tres bien', value: 5 },
    ],
  },
];

// Maps frontend question IDs → backend question codes
// Volonté (v1-v3) → mind pillar (M1-M3), step 3
// Alimentation (a4-a6) → nutrition pillar (N1-N3), step 1
// Énergie (e7-e9) → sport pillar (S1-S3), step 2
export const QUESTION_CODE_MAP = {
  v1: 'M1',
  v2: 'M2',
  v3: 'M3',
  a4: 'N1',
  a5: 'N2',
  a6: 'N3',
  e7: 'S1',
  e8: 'S2',
  e9: 'S3',
};