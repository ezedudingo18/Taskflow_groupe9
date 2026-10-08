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

test('GET /api/openapi.json retourne la spécification OpenAPI', async () => {
  const response = await request(app).get('/api/openapi.json');

  assert.equal(response.status, 200);
  assert.equal(response.body.openapi, '3.0.3');
  assert.ok(response.body.paths['/api/tasks']);
});

test('GET /api/docs retourne Swagger UI', async () => {
  const response = await request(app).get('/api/docs/');

  assert.equal(response.status, 200);
  assert.match(response.text, /swagger-ui/);
});

test('Une requête protégée avec un token invalide retourne 401', async () => {
  const response = await request(app)
    .get('/api/tasks')
    .set('Authorization', 'Bearer token-invalide');

  assert.equal(response.status, 401);
  assert.deepEqual(response.body, { error: { message: 'Token invalide' } });
});

test('Un corps JSON mal formé retourne 400', async () => {
  const response = await request(app)
    .post('/api/auth/login')
    .set('Content-Type', 'application/json')
    .send('{"email":');

  assert.equal(response.status, 400);
  assert.deepEqual(response.body, { error: { message: 'Le corps JSON est invalide' } });
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
  assert.equal(
    AuthTokenPayloadSchema.safeParse({
      _id: '507f1f77bcf86cd799439011',
      iat: 1791402529,
      exp: 1792007329,
    }).success,
    true,
  );
});
