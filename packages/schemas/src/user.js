import { z } from 'zod';

// -- User --

export const UserSchema = z
  .object(
    {
      _id: z
        .string({ error: "L'identifiant doit être une chaîne de caractères" })
        .regex(/^[\da-f]{24}$/i, 'Identifiant utilisateur invalide'),
      email: z.email({ error: "L'adresse e-mail est invalide" }),
      createdAt: z.coerce.date({ error: 'La date de création est invalide' }),
      updatedAt: z.coerce.date({ error: 'La date de modification est invalide' }),
    },
    {
      error: (issue) => (issue.code === 'unrecognized_keys' ? 'Champs non autorisés' : undefined),
    },
  )
  .strict();

/** @typedef {import('zod').infer<typeof UserSchema>} User */

// Creation input - no id or timestamps
export const CreateUserSchema = UserSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

/** @typedef {import('zod').infer<typeof CreateUserSchema>} CreateUserInput */

// Update input - all fields optional
export const UpdateUserSchema = CreateUserSchema.partial();

/** @typedef {import('zod').infer<typeof UpdateUserSchema>} UpdateUserInput */
