// tests/e2e/auth.test.js
const request = require('supertest');
const app = require('../../src/app');

describe('Authentication', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });
        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.message, 'User registered');
    });
});
