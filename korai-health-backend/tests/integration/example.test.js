// tests/integration/example.test.js
const request = require('supertest');
const app = require('../../src/app');

describe('GET /api', () => {
    it('responds with 404 for unknown routes', async () => {
        const response = await request(app).get('/api/non-existent-route');
        assert.strictEqual(response.status, 404);
    });
});
