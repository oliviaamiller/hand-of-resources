const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cat = require('../lib/models/Cat');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
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

  it('gets a cat by id', async () => {
    const cat = await Cat.insert({ name: 'Falafel', breed: 'Tabby' });
    const res = await request(app).get(`/api/v1/cats/${cat.id}`);

    expect(res.body).toEqual(cat);
  });

  it('updates a cat by id', async () => {
    const cat = await Cat.insert({ name: 'Tony', breed: 'Rag Doll', age: 7 });
    const res = await request(app)
      .patch(`/api/v1/cats/${cat.id}`)
      .send({ age: 4 });

    const expected = {
      id: cat.id,
      name: 'Tony',
      breed: 'Rag Doll',
      age: 4
    };

    expect(res.body).toEqual(expected);
    expect(await Cat.getById(cat.id)).toEqual(expected);
  });

  it('deletes a cat', async () => {
    const cat = await Cat.insert({
      name: 'Hercules',
      breed: 'Calico',
      age: 2
    });
    const res = await request(app).delete(`/api/v1/cats/${cat.id}`);

    expect(res.body).toEqual(cat);
  });


});
