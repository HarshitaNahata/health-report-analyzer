// tests/e2e/auth.test.js
const request = require('supertest');
const app = require('../../src/app');
const assert = require('assert');
// Before or in beforeEach() in your test file
const User = require('../../src/models/User'); // Adjust path as needed

before(async () => {
    await User.deleteMany({});
});


describe('Authentication', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });
        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.message, 'User registered');
    });
});
