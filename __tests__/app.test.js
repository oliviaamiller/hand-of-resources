const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Sweet = require('../lib/models/Sweet');
const Cat = require('../lib/models/Cat');

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

  it('creates a cat', async () => {
    const expected = {
      name: 'Ernie',
      breed: 'Tabby',
      age: 13
    };

    const res = await request(app).post('/api/v1/cats').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of sweets', async () => {
    const expected = await Sweet.getAll();
    const res = await request(app).get('/api/v1/sweets');

    expect(res.body).toEqual(expected);
  });

  it('gets a list of cats', async () => {
    const expected = await Cat.getAll();
    const res = await request(app).get('/api/v1/cats');

    expect(res.body).toEqual(expected);
  });

  it('gets a sweet by id', async () => {
    const sweet = await Sweet.insert({ name: 'Starmix', type: 'Gummies' });
    const res = await request(app).get(`/api/v1/sweets/${sweet.id}`);

    expect(res.body).toEqual(sweet);
  });

  it('updates a sweet by id', async () => {
    const sweet = await Sweet.insert({ name: 'Zebra Stripe', type: 'Mint' });
    const res = await request(app)
      .patch(`/api/v1/sweets/${sweet.id}`)
      .send({ type: 'Gum' });

    const expected = {
      id: sweet.id,
      name: 'Zebra Stripe',
      type: 'Gum'
    };

    expect(res.body).toEqual(expected);
    expect(await Sweet.getById(sweet.id)).toEqual(expected);
  });

  it('deletes a sweet', async () => {
    const sweet = await Sweet.insert({
      name: 'Zebra Stripe',
      type: 'Gum'
    });
    const res = await request(app).delete(`/api/v1/sweets/${sweet.id}`);

    expect(res.body).toEqual(sweet);
  });

  
});
