import test, { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';

after(async () => {
    await mongoose.connection.close();
});

describe('Flux d\'authentification et protection des routes', () => {
    let token = '';

    it('1. Devrait connecter un utilisateur existant et retourner un token JWT', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'toto@toto.fr', password: 'tonPasswordActuel' });
        
        assert.strictEqual(res.statusCode, 200);
        assert.ok(res.body.token, 'Le token doit être présent dans la réponse');
        token = res.body.token;
    });

    it('2. Devrait bloquer l\'accès aux routes protégées si aucun token n\'est fourni', async () => {
        const res = await request(app).get('/api/users');
        assert.strictEqual(res.statusCode, 401);
    });

    it('3. Devrait autoriser l\'accès à une route protégée avec un token valide', async () => {
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);
        
        assert.strictEqual(res.statusCode, 200);
        assert.ok(res.body.users, 'La liste des utilisateurs doit être renvoyée');
    });
});