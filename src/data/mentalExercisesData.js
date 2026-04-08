export const MENTAL_PROGRAM_MONTHS = [
  {
    step: 1,
    slug: 'responsabilite',
    title: 'Responsabilite',
    desc: 'Reprenez le controle de vos reactions face aux evenements.',
    locked: false,
  },
  {
    step: 2,
    slug: 'lacher-prise',
    title: 'Lacher prise',
    desc: 'Acceptez ce qui echappe a votre controle.',
    locked: true,
  },
  {
    step: 3,
    slug: 'colere',
    title: 'La colere',
    desc: 'Desamorcez les reactions automatiques pour rester libre.',
    locked: true,
  },
  {
    step: 4,
    slug: 'colocation-interieure',
    title: 'Colocation interieure',
    desc: 'Observez vos pensees sans fusionner avec elles.',
    locked: true,
  },
  {
    step: 5,
    slug: 'autorite-interieure',
    title: 'Autorite interieure',
    desc: 'Revenez au centre de vos decisions, sans vous abandonner.',
    locked: true,
  },
  { step: 6, slug: 'module-6', title: 'Mois 6', desc: 'A definir', locked: true },
  { step: 7, slug: 'module-7', title: 'Mois 7', desc: 'A definir', locked: true },
  { step: 8, slug: 'module-8', title: 'Mois 8', desc: 'A definir', locked: true },
  { step: 9, slug: 'module-9', title: 'Mois 9', desc: 'A definir', locked: true },
  { step: 10, slug: 'module-10', title: 'Mois 10', desc: 'A definir', locked: true },
  { step: 11, slug: 'module-11', title: 'Mois 11', desc: 'A definir', locked: true },
  { step: 12, slug: 'module-12', title: 'Mois 12', desc: 'A definir', locked: true },
];

export const MENTAL_EXERCISES = {
  responsabilite: {
    slug: 'responsabilite',
    month: 1,
    title: 'Dissoudre les resistances',
    subtitle: 'La responsabilite commence par votre attitude interieure.',
    reminderMessages: ['Je me rends present', 'Je remarque mes defenses', 'Je reviens a l ouverture'],
    centralIdea:
      'L ego est une protection mentale construite a partir des blessures, peurs et jugements. Plus vous alimentez ce mecanisme par l analyse, plus la barriere se renforce. La voie utile est l experience directe: ouvrir votre posture interieure.',
    principle:
      'Pendant la journee, faites comme si vous etiez entoure de presence bienveillante. Ce geste simple ne passe pas par la reflexion. Il change votre etat, revele vos resistances et adoucit la defense automatique.',
    steps: [
      'Arretez-vous quelques secondes la ou vous etes.',
      'Imaginez un espace calme et bienveillant autour de vous.',
      'Accueillez ce qui est la: personnes, bruits et situations.',
      'Observez les resistances qui surgissent (rejet, agacement, jugement).',
      'Revenez doucement a une attitude ouverte, sans forcer.',
    ],
    benefits: [
      'Vous identifiez vos mecanismes defensifs plus vite.',
      'Vous reduisez la reactivite mentale sans lutte.',
      'Vous recupererez plus de stabilite interieure au quotidien.',
    ],
    frequency: '3 a 10 fois par jour, 30 secondes a 2 minutes.',
    summary: 'Vous ne changez pas le monde. Vous changez votre maniere de le rencontrer.',
    videoUrl: '',
  },
  colere: {
    slug: 'colere',
    month: 3,
    title: 'La colere: reprendre le pouvoir sur soi',
    subtitle: 'Observer avant de reagir pour ne plus subir.',
    reminderMessages: ['Qu est-ce qui me touche ici?', 'Je laisse passer la vague', 'Je choisis ma reponse'],
    centralIdea:
      'La colere est une reaction de defense lorsque vous vous sentez menace ou rabaisse. Reagir automatiquement vous fait perdre la maitrise. Observer sans repondre immediatement vous redonne l autorite.',
    principle:
      'Pendant un mois, vous pratiquez une pause consciente a chaque declencheur. Vous observez la tension, l envie de repondre et la peur cachee, sans alimenter la reaction.',
    steps: [
      'Reperez le declencheur des les premiers signaux corporels.',
      'Ne repondez pas immediatement.',
      'Observez ce qui se passe en vous sans juger.',
      'Laissez la vague retomber en restant present.',
      'Repondez seulement quand vous etes revenu au calme.',
    ],
    benefits: [
      'Vous prenez du recul plus vite.',
      'Vous gagnez en lucidite emotionnelle.',
      'Vous devenez plus stable dans les situations tendues.',
    ],
    frequency: 'Pendant 1 mois, a chaque situation de colere.',
    summary: 'Vous ne subissez plus la reaction. Vous choisissez votre posture.',
    videoUrl: '',
  },
  'colocation-interieure': {
    slug: 'colocation-interieure',
    month: 4,
    title: 'Vivre en colocation avec soi-meme',
    subtitle: 'Vous n etes pas vos pensees, vous les observez.',
    reminderMessages: ['Une pensee apparait', 'Je ne fusionne pas', 'Je reviens au reel'],
    centralIdea:
      'Le conflit interieur ne vient pas de la pensee elle-meme, mais du fait de la croire sans distance. Observer la voix mentale comme un colocataire cree de l espace et de la clarte.',
    principle:
      'Remplacez les identifications directes par une observation neutre: au lieu de dire "je suis nul", dites "une pensee dit que je suis nul".',
    steps: [
      'Identifiez la voix mentale: jugements, peurs, critiques.',
      'Mettez une distance avec la formule "une pensee dit...".',
      'Observez sans vous melanger a cette narration.',
      'Revenez au corps, a la respiration et a l instant present.',
      'Repetez ce mouvement plusieurs fois dans la journee.',
    ],
    benefits: [
      'Moins de conflits interieurs.',
      'Plus de clarte decisionnelle.',
      'Un sentiment de liberte plus stable.',
    ],
    frequency: 'Pendant 1 mois, dans toutes les situations chargees.',
    summary: 'Un colocataire n est pas le proprietaire. Vos pensees non plus.',
    videoUrl: '',
  },
  'autorite-interieure': {
    slug: 'autorite-interieure',
    month: 5,
    title: 'Arreter de subir, commencer a choisir',
    subtitle: 'Retrouver votre place de decideur interieur.',
    reminderMessages: ['Je stoppe 3 secondes', 'Qu est-ce que je choisis?', 'J assume sans me justifier'],
    centralIdea:
      'A force de chercher l approbation et d eviter le conflit, vous quittez votre axe. L autorite interieure consiste a rester aligne avec vos choix, sans dominer les autres.',
    principle:
      'Chaque fois que vous sentez une perte de pouvoir (oui force, hesitation, justification excessive), marquez une pause et choisissez consciemment votre action.',
    steps: [
      'Reperez les situations ou vous vous abandonnez.',
      'Stoppez interieurement pendant 3 secondes.',
      'Posez la question: "Qu est-ce que je choisis vraiment?"',
      'Exprimez votre choix avec simplicite.',
      'Avancez meme avec l inconfort.',
    ],
    benefits: [
      'Moins d hesitation.',
      'Plus de respect de soi.',
      'Une stabilite relationnelle plus saine.',
    ],
    frequency: 'Pendant 1 mois, a chaque micro-decision importante.',
    summary: 'Retrouver son autorite, c est arreter de se quitter.',
    videoUrl: '',
  },
};

export const MENTAL_INTRO_CONTENT = {
  title: 'Pourquoi les exercices sont essentiels',
  paragraphs: [
    'Comprendre mentalement ne suffit pas. Tant que cela reste une idee, le comportement ne change pas.',
    'Les exercices servent a vous faire vivre une experience directe. Quand vous voyez par vous-meme, la repetition des erreurs diminue naturellement.',
    'Sans experience, vous repetez. Avec l experience, vous evoluez.',
  ],
  threeKeys: [
    { title: 'Corps physique', text: 'L alimentation construit votre corps.' },
    { title: 'Energie physique', text: 'Le mouvement entretient votre energie.' },
    { title: 'Joie de vivre', text: 'Elle nait de l equilibre entre corps, energie et esprit.' },
  ],
};

export function getMentalExerciseBySlug(slug) {
  return MENTAL_EXERCISES[slug] ?? null;
}

export function isExerciseAvailable(slug) {
  return Boolean(getMentalExerciseBySlug(slug));
}
