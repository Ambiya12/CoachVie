export const DIAGNOSTIC_STEPS = {
  INTRO: 'intro',
  TRANSITION_ALIMENTATION: 'transition_alimentation',
  Q_ALIMENTATION: 'q_alimentation',
  TRANSITION_SPORT: 'transition_sport',
  Q_SPORT: 'q_sport',
  TRANSITION_MENTAL: 'transition_mental',
  Q_MENTAL: 'q_mental',
  ANALYSIS: 'analysis',
  RESULTS: 'results'
};

export const ALIMENTATION_QUESTIONS = [
  {
    id: 'a1',
    question: 'Combien de repas prenez-vous par jour ?',
    options: [
      { label: '1 à 2', value: 0 },
      { label: '3', value: 1 },
      { label: '4 et plus', value: 2 },
    ]
  },
  {
    id: 'a2',
    question: 'Votre alimentation est plutôt :',
    options: [
      { label: 'Industrielle', value: 0 },
      { label: 'Mixte', value: 1 },
      { label: 'Maison et équilibrée', value: 2 },
    ]
  },
  {
    id: 'a3',
    question: 'Consommez-vous régulièrement des produits sucrés ou transformés ?',
    options: [
      { label: 'Souvent', value: 0 },
      { label: 'Parfois', value: 1 },
      { label: 'Rarement', value: 2 },
    ]
  },
  {
    id: 'a4',
    question: 'Votre niveau d’énergie dans la journée est :',
    options: [
      { label: 'Faible', value: 0 },
      { label: 'Variable', value: 1 },
      { label: 'Stable', value: 2 },
    ]
  },
  {
    id: 'a5',
    question: 'Avez-vous des troubles digestifs ?',
    options: [
      { label: 'Souvent', value: 0 },
      { label: 'Parfois', value: 1 },
      { label: 'Jamais', value: 2 },
    ]
  }
];

export const SPORT_QUESTIONS = [
  {
    id: 's1',
    question: 'Votre activité physique est :',
    options: [
      { label: 'Inexistante', value: 0 },
      { label: 'Occasionnelle', value: 1 },
      { label: 'Régulière', value: 2 },
    ]
  },
  {
    id: 's2',
    question: 'Votre mode de vie est :',
    options: [
      { label: 'Sédentaire', value: 0 },
      { label: 'Modérément actif', value: 1 },
      { label: 'Très actif', value: 2 },
    ]
  },
  {
    id: 's3',
    question: 'Combien de fois par semaine êtes-vous réellement actif ?',
    options: [
      { label: '0', value: 0 },
      { label: '1 à 2 fois', value: 1 },
      { label: '3 fois ou plus', value: 2 },
    ]
  },
  {
    id: 's4',
    question: 'Votre motivation pour le sport est :',
    options: [
      { label: 'Faible', value: 0 },
      { label: 'Moyenne', value: 1 },
      { label: 'Forte', value: 2 },
    ]
  },
  {
    id: 's5',
    question: 'Quel type d’activité vous attire le plus ?',
    options: [
      { label: 'Activité douce (yoga, marche)', value: 1 },
      { label: 'Activité dynamique (course, fitness)', value: 2 },
      { label: 'Activité aquatique (natation)', value: 1 },
    ]
  }
];

export const MENTAL_QUESTIONS = [
  {
    id: 'm1',
    question: 'Vous sentez-vous souvent stressé ?',
    options: [
      { label: 'Oui', value: 0 },
      { label: 'Parfois', value: 1 },
      { label: 'Non', value: 2 },
    ]
  },
  {
    id: 'm2',
    question: 'Avez-vous du mal à lâcher prise ?',
    options: [
      { label: 'Oui', value: 0 },
      { label: 'Un peu', value: 1 },
      { label: 'Non', value: 2 },
    ]
  },
  {
    id: 'm3',
    question: 'Vous sentez-vous fatigué mentalement ?',
    options: [
      { label: 'Oui', value: 0 },
      { label: 'Parfois', value: 1 },
      { label: 'Non', value: 2 },
    ]
  },
  {
    id: 'm4',
    question: 'Avez-vous tendance à trop réfléchir ?',
    options: [
      { label: 'Oui', value: 0 },
      { label: 'Un peu', value: 1 },
      { label: 'Non', value: 2 },
    ]
  },
  {
    id: 'm5',
    question: 'Votre capacité à être présent dans l’instant est :',
    options: [
      { label: 'Faible', value: 0 },
      { label: 'Moyenne', value: 1 },
      { label: 'Bonne', value: 2 },
    ]
  }
];