import { z } from 'zod';

export const TaskParamsSchema = z
  .object(
    {
      _id: z
        .string({ error: "L'identifiant de tâche est obligatoire" })
        .regex(/^[\da-f]{24}$/i, 'Identifiant de tâche invalide'),
    },
    {
      error: (issue) => (issue.code === 'unrecognized_keys' ? 'Champs non autorisés' : undefined),
    },
  )
  .strict();
