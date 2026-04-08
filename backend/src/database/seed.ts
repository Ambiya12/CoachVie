import { query, closePool } from '../config/database';

const run = async (): Promise<void> => {
  await query(
    `
      INSERT INTO content_modules (pillar, title, description, duration_minutes, external_link)
      VALUES
        ('nutrition', 'Hydration quotidienne', 'Boire de l eau regulierement tout au long de la journee.', 10, NULL),
        ('nutrition', 'Assiette equilibree', 'Composer un repas avec legumes, proteines et glucides complets.', 20, NULL),
        ('nutrition', 'Preparation hebdomadaire', 'Planifier les repas de la semaine pour reduire les ecarts.', 30, NULL),
        ('sport', 'Marche active', 'Effectuer une marche rapide en exterieur.', 25, NULL),
        ('sport', 'Renforcement poids du corps', 'Circuit court de squats, pompes et gainage.', 30, NULL),
        ('sport', 'Mobilite articulaire', 'Routine de mobilite pour hanches, dos et epaules.', 15, NULL),
        ('mind', 'Respiration 4-6', 'Pratique de respiration pour calmer le systeme nerveux.', 8, NULL),
        ('mind', 'Journal de gratitude', 'Ecrire trois elements positifs de la journee.', 10, NULL),
        ('mind', 'Meditation guidee', 'Session courte de meditation de pleine conscience.', 12, NULL)
      ON CONFLICT (pillar, title) DO NOTHING;
    `,
  );

  await query(
    `
      INSERT INTO mapping_rules (pillar, min_score, max_score, content_id, priority)
      SELECT c.pillar,
             range.min_score,
             range.max_score,
             c.id,
             row_number() OVER (PARTITION BY c.pillar, range.min_score ORDER BY c.id)
      FROM content_modules c
      JOIN (
        VALUES (0, 39), (40, 69), (70, 100)
      ) AS range(min_score, max_score) ON TRUE
      WHERE c.is_active = TRUE
      ON CONFLICT (pillar, min_score, max_score, content_id) DO NOTHING;
    `,
  );

  process.stdout.write('Seed complete\n');
};

run()
  .catch((error: unknown) => {
    process.stderr.write(`Seed failed: ${String(error)}\n`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closePool();
  });
