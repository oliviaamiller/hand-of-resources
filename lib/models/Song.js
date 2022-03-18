const pool = require('../utils/pool');

module.exports = class Song {
  id;
  title;
  artist;
  album;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.artist = row.artist;
    this.album = row.album;
  }

  static async insert({ title, artist, album }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        songs(title, artist, album)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [title, artist, album]
    );
    return new Song(rows[0]);
  }

  static async getAll() {
    const { rows }  = await pool.query(
      `
      SELECT
        *
      FROM 
        songs
      `
    );
    return rows.map((row) => new Song(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        songs
      WHERE
        id=$1
     `,
      [id]
    );
    return new Song(rows[0]);
  }

};
