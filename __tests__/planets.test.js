const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Planet = require('../lib/models/Planet');

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

  it('gets a list of planets', async () => {
    const expected = await Planet.getAll();
    const res = await request(app).get('/api/v1/planets');

    expect(res.body).toEqual(expected);
  });

  it('gets a planet by id', async () => {
    const planet = await Planet.insert({ name: 'Mars', distanceFromSun: '134.72 million miles' });
    const res = await request(app).get(`/api/v1/planets/${planet.id}`);

    expect(res.body).toEqual(planet);
  });

  it('updates a planet by id', async () => {
    const planet = await Planet.insert({ name: 'Earthhh', distanceFromSun: '92.524 million miles' });
    const res = await request(app)
      .patch(`/api/v1/planets/${planet.id}`)
      .send({ name: 'Earth' });

    const expected = {
      id: planet.id,
      name: 'Earth',
      distanceFromSun: '92.524 million miles'
    };

    expect(res.body).toEqual(expected);
    expect(await Planet.getById(planet.id)).toEqual(expected);
  });

  it('deletes a planet', async () => {
    const planet = await Planet.insert({
      name: 'Pluto',
      distanceFromSun: '3.7 billion miles'
    });
    const res = await request(app).delete(`/api/v1/planets/${planet.id}`);

    expect(res.body).toEqual(planet);
  });

});
