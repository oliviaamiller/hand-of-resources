const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Pasta = require('../lib/models/Pasta');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a pasta', async () => {
    const expected = {
      name: 'Bolognese',
      sauce: 'Tomato',
      vegetarian: false
    };

    const res = await request(app).post('/api/v1/pastas').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of pastas', async () => {
    const expected = await Pasta.getAll();
    const res = await request(app).get('/api/v1/pastas');

    expect(res.body).toEqual(expected);
  });

  it('gets a pasta by id', async () => {
    const pasta = await Pasta.insert({ name: 'Pesto alla genovese', sauce: 'Pesto', vegetarian: true });
    const res = await request(app).get(`/api/v1/pastas/${pasta.id}`);

    expect(res.body).toEqual(pasta);
  });

  it('updates a pasta by id', async () => {
    const pasta = await Pasta.insert({ name: 'Carbonara', sauce: 'Tomato', vegetarian: false });
    const res = await request(app)
      .patch(`/api/v1/pastas/${pasta.id}`)
      .send({ sauce: 'None' });

    const expected = {
      id: pasta.id,
      name: 'Carbonara',
      sauce: 'None',
      vegetarian: false
    };

    expect(res.body).toEqual(expected);
    expect(await Pasta.getById(pasta.id)).toEqual(expected);
  });

  it('deletes a pasta', async () => {
    const pasta = await Pasta.insert({
      name: 'Carbonara', 
      sauce: 'None',
      vegetarian: false
    });
    const res = await request(app).delete(`/api/v1/pastas/${pasta.id}`);

    expect(res.body).toEqual(pasta);
  });

});
