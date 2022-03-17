const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const Sweet = require('../lib/models/Sweet');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a sweet', async () => {
    const expected = {
      name: 'Twix',
      type: 'Chocolate'
    };

    const res = await request(app).post('/api/v1/sweets').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  
});
