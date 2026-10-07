import { z } from 'zod';

// -- Task --

export const TaskSchema = z
  .object(
    {
      id: z.uuid({ error: "L'identifiant doit être un UUID valide" }),
      title: z
        .string({ error: 'Le titre est obligatoire' })
        .min(1, { error: 'Le titre ne peut pas être vide' })
        .max(120, { error: 'Le titre ne peut pas dépasser 120 caractères' }),
      description: z
        .string({ error: 'La description doit être une chaîne de caractères' })
        .max(1000, { error: 'La description ne peut pas dépasser 1000 caractères' })
        .optional(),
      status: z.enum(['todo', 'done'], { error: 'Le statut doit être « todo » ou « done »' }),
      deadline: z.coerce.date({ error: "La date d'échéance est invalide" }).nullable().optional(),
      createdAt: z.coerce.date({ error: 'La date de création est invalide' }),
      updatedAt: z.coerce.date({ error: 'La date de modification est invalide' }),
    },
    {
      error: (issue) => (issue.code === 'unrecognized_keys' ? 'Champs non autorisés' : undefined),
    },
  )
  .strict();

/** @typedef {import('zod').infer<typeof TaskSchema>} Task */

// Creation input - no id or timestamps
export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict();

/** @typedef {import('zod').infer<typeof CreateTaskSchema>} CreateTaskInput */

// Update input - all fields optional
export const UpdateTaskSchema = CreateTaskSchema.partial()
  .strict()
  .refine((value) => Object.keys(value).length > 0, {
    message: 'Au moins un champ doit être fourni',
  });

/** @typedef {import('zod').infer<typeof UpdateTaskSchema>} UpdateTaskInput */
