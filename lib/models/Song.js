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

  static async updateById(id, { title, artist, album }) {
    const currentSong = await Song.getById(id);

    if(!currentSong) return null;

    const newTitle = title ?? currentSong.title;
    const newArtist = artist ?? currentSong.artist;
    const newAlbum = album ?? currentSong.album;

    const { rows } = await pool.query(
      `
      UPDATE
        songs
      SET
        title=$2,
        artist=$3,
        album=$4
      WHERE
        id=$1
      RETURNING 
        *
      `,
      [id, newTitle, newArtist, newAlbum]
    );
    return new Song(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM 
        songs
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );
    return new Song(rows[0]);
  }

};
