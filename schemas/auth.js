import { z } from 'zod';
import { CreateUserSchema } from './user.js';

export const RegisterUserSchema = CreateUserSchema.extend({
  password: z
    .string({ error: 'Le mot de passe est obligatoire' })
    .min(8, { error: 'Le mot de passe doit contenir au moins 8 caractères' }),
});

/** @typedef {import('zod').infer<typeof RegisterUserSchema>} RegisterUserInput */

export const LoginUserSchema = z
  .object(
    {
      email: z.email({ error: "L'adresse e-mail est invalide" }),
      password: z
        .string({ error: 'Le mot de passe est obligatoire' })
        .min(1, { error: 'Le mot de passe ne peut pas être vide' }),
    },
    {
      error: (issue) => (issue.code === 'unrecognized_keys' ? 'Champs non autorisés' : undefined),
    },
  )
  .strict();

/** @typedef {import('zod').infer<typeof LoginUserSchema>} LoginUserInput */

export const AuthTokenPayloadSchema = z
  .object(
    {
      _id: z
        .string({ error: "L'identifiant utilisateur est obligatoire" })
        .regex(/^[\da-f]{24}$/i, 'Identifiant utilisateur invalide'),
    },
    {
      error: (issue) => (issue.code === 'unrecognized_keys' ? 'Champs non autorisés' : undefined),
    },
  )
  .strict();
