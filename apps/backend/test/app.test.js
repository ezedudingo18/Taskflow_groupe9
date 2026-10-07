import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import {
  AuthTokenPayloadSchema,
  CreateTaskSchema,
  TaskParamsSchema,
  UpdateTaskSchema,
} from 'schemas';
import app from '../src/app.js';

test('GET /api/health retourne 200 et le statut ok', async () => {
  const response = await request(app).get('/api/health');

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: 'ok' });
});

test('POST /api/auth/register rejette un utilisateur invalide', async () => {
  const response = await request(app).post('/api/auth/register').send({
    email: 'adresse-invalide',
    password: 'court',
  });

  assert.equal(response.status, 400);
  assert.equal(response.body.error.message, 'Données invalides');
  assert.equal(response.body.error.details.length, 2);
});

test('POST /api/auth/register rejette un email invalide avec un mot de passe valide', async () => {
  const response = await request(app).post('/api/auth/register').send({
    email: 'invalid-email',
    password: 'password123',
  });

  assert.equal(response.status, 400);
  assert.equal(response.body.error.message, 'Données invalides');
  assert.equal(response.body.error.details[0].field, 'email');
});

test('POST /api/auth/login rejette des identifiants incomplets', async () => {
  const response = await request(app).post('/api/auth/login').send({
    email: 'user@example.com',
  });

  assert.equal(response.status, 400);
  assert.equal(response.body.error.message, 'Données invalides');
  assert.equal(response.body.error.details[0].field, 'password');
});

test('Les schémas de tâches rejettent les payloads invalides', () => {
  assert.equal(
    CreateTaskSchema.safeParse({ title: 'Tâche', status: 'todo', extra: true }).success,
    false,
  );
  assert.equal(UpdateTaskSchema.safeParse({}).success, false);
  assert.equal(UpdateTaskSchema.safeParse({ unknown: true }).success, false);
  assert.equal(TaskParamsSchema.safeParse({ _id: 'not-an-object-id' }).success, false);
  assert.equal(AuthTokenPayloadSchema.safeParse({}).success, false);
});
