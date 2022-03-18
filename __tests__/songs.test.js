const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Song = require('../lib/models/Song');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a song', async () => {
    const expected = {
      title: 'Here Comes the Sun', 
      artist: 'The Beatles',
      album: 'Abbey Road'
    };

    const res = await request(app).post('/api/v1/songs').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of all songs', async () => {
    const expected = await Song.getAll();
    const res = await request(app).get('/api/v1/songs');

    expect(res.body).toEqual(expected);
  });

  it('gets a song by id', async () => {
    const song = await Song.insert({ 
      title: 'What Are You Doing the Rest of Your Life?', 
      artist: 'Bill Evans', 
      album: 'From Left to Right' });
    const res = await request(app).get(`/api/v1/songs/${song.id}`);

    expect(res.body).toEqual(song);
  });

  it('updates a song by id', async () => {
    const song = await Song.insert({ title: 'Dance', artist: 'ESG' });
    const res = await request(app)
      .patch(`/api/v1/songs/${song.id}`)
      .send({ album: 'Come Away With ESG' });

    const expected = {
      id: song.id,
      title: 'Dance',
      artist: 'ESG',
      album: 'Come Away With ESG'
    };

    expect(res.body).toEqual(expected);
    expect(await Song.getById(song.id)).toEqual(expected);
  });

  it('deletes a song', async () => {
    const song = await Song.insert({ 
      title: 'I Feel For You', 
      artist: 'Prince' 
    });
    const res = await request(app).delete(`/api/v1/songs/${song.id}`);

    expect(res.body).toEqual(song);
  });

});
