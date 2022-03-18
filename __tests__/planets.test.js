const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a planet', async () => {
    const expected = {
      name: 'Mars',
      distanceFromSun: '134.72 million miles'
    };

    const res = await request(app).post('/api/v1/planets').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

});
