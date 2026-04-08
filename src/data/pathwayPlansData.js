export const PATHWAY_META = {
  1: { id: 1, key: 'restart', name: 'Remise en route', marketingLabel: 'Je redemarre' },
  2: { id: 2, key: 'stabilisation', name: 'Stabilisation', marketingLabel: 'Je me stabilise' },
  3: { id: 3, key: 'activation', name: 'Activation', marketingLabel: 'J active mon changement' },
  4: { id: 4, key: 'optimisation', name: 'Optimisation', marketingLabel: 'J optimise mon niveau' },
  5: { id: 5, key: 'mastery', name: 'Pleine maitrise', marketingLabel: 'Je passe en maitrise' },
};

export const MENTAL_EXERCISE_SEQUENCE = [
  { id: 'mental-1', title: 'Responsabilite' },
  { id: 'mental-2', title: 'Dissoudre les resistances' },
  { id: 'mental-3', title: 'La colere' },
  { id: 'mental-4', title: 'Colocation interieure' },
  { id: 'mental-5', title: 'Autorite interieure' },
  { id: 'mental-6', title: 'Presence et souffle' },
  { id: 'mental-7', title: 'Alignement quotidien' },
  { id: 'mental-8', title: 'Integration et stabilite' },
];

export const PATHWAY_PLANS = {
  1: {
    pathwayId: 1,
    months: [
      {
        monthIndex: 1,
        sportFrequency: 2,
        sportDurationMin: 25,
        sportActivities: ['Marche rapide', 'Yoga doux', 'Natation douce'],
        alimentationFocus: 'Hydratation et reduction des produits industriels',
      },
      {
        monthIndex: 2,
        sportFrequency: 3,
        sportDurationMin: 30,
        sportActivities: ['Marche active', 'Velo tranquille', 'Mobilite'],
        alimentationFocus: 'Structurer les repas et limiter le grignotage',
      },
      {
        monthIndex: 3,
        sportFrequency: 3,
        sportDurationMin: 35,
        sportActivities: ['Run leger', 'Renforcement doux', 'Yoga'],
        alimentationFocus: 'Repas reguliers et sucre quotidien reduit',
      },
      {
        monthIndex: 4,
        sportFrequency: 3,
        sportDurationMin: 40,
        sportActivities: ['Cardio doux', 'Mobilite', 'Endurance progressive'],
        alimentationFocus: 'Consolider les habitudes propres',
      },
    ],
  },
  2: {
    pathwayId: 2,
    months: [
      { monthIndex: 1, sportFrequency: 3, sportDurationMin: 35, sportActivities: ['Run leger', 'Natation', 'Renforcement leger'], alimentationFocus: 'Cadre alimentaire stable' },
      { monthIndex: 2, sportFrequency: 3, sportDurationMin: 40, sportActivities: ['Corde a sauter legere', 'Escalade debutante', 'Velo'], alimentationFocus: 'Proteines et legumes quotidiens' },
      { monthIndex: 3, sportFrequency: 4, sportDurationMin: 40, sportActivities: ['Cardio', 'Renforcement', 'Mobilite'], alimentationFocus: 'Energie stable pour l effort' },
      { monthIndex: 4, sportFrequency: 4, sportDurationMin: 45, sportActivities: ['Cardio modere', 'Force douce', 'Souffle'], alimentationFocus: 'Stabilite durable et ecarts limites' },
    ],
  },
  3: {
    pathwayId: 3,
    months: [
      { monthIndex: 1, sportFrequency: 4, sportDurationMin: 40, sportActivities: ['Run', 'Natation', 'Renforcement'], alimentationFocus: 'Nettoyage alimentaire progressif' },
      { monthIndex: 2, sportFrequency: 4, sportDurationMin: 45, sportActivities: ['Fractionne leger', 'Circuit training', 'Escalade'], alimentationFocus: 'Soutenir la montee d energie' },
      { monthIndex: 3, sportFrequency: 5, sportDurationMin: 50, sportActivities: ['Cardio', 'Force', 'Mobilite'], alimentationFocus: 'Alimentation propre majoritaire' },
      { monthIndex: 4, sportFrequency: 5, sportDurationMin: 55, sportActivities: ['Endurance', 'Renforcement', 'Yoga dynamique'], alimentationFocus: 'Manger pour construire' },
    ],
  },
  4: {
    pathwayId: 4,
    months: [
      { monthIndex: 1, sportFrequency: 5, sportDurationMin: 50, sportActivities: ['Run structure', 'Natation', 'Musculation'], alimentationFocus: 'Eliminer desequilibres restants' },
      { monthIndex: 2, sportFrequency: 5, sportDurationMin: 55, sportActivities: ['Cardio', 'Force', 'Recuperation active'], alimentationFocus: 'Recuperation plus fine' },
      { monthIndex: 3, sportFrequency: 5, sportDurationMin: 60, sportActivities: ['Fractionne', 'Trail', 'Intensification'], alimentationFocus: 'Optimiser clarte et legerete' },
      { monthIndex: 4, sportFrequency: 5, sportDurationMin: 60, sportActivities: ['Haut niveau stable', 'Mobilite', 'Force'], alimentationFocus: 'Constance et coherence' },
    ],
  },
  5: {
    pathwayId: 5,
    months: [
      { monthIndex: 1, sportFrequency: 5, sportDurationMin: 60, sportActivities: ['Fractionne', 'Musculation avancee', 'Escalade'], alimentationFocus: 'Performance et recuperation' },
      { monthIndex: 2, sportFrequency: 6, sportDurationMin: 65, sportActivities: ['Cardio puissant', 'Force', 'Mobilite'], alimentationFocus: 'Qualite elevee et ecarts minimaux' },
      { monthIndex: 3, sportFrequency: 6, sportDurationMin: 70, sportActivities: ['Trail', 'HIIT structure', 'Endurance longue'], alimentationFocus: 'Timing plus rigoureux' },
      { monthIndex: 4, sportFrequency: 6, sportDurationMin: 70, sportActivities: ['Maitrise stable', 'Recuperation active', 'Puissance'], alimentationFocus: 'Corps clair, puissant, disponible' },
    ],
  },
};

export function getPathwayMeta(pathwayId) {
  return PATHWAY_META[pathwayId] ?? PATHWAY_META[1];
}

export function getPathwayPlan(pathwayId) {
  return PATHWAY_PLANS[pathwayId] ?? PATHWAY_PLANS[1];
}
