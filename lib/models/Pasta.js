const pool = require('../utils/pool');

module.exports = class Pasta {
  id;
  name;
  sauce;
  vegetarian;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.sauce = row.sauce;
    this.vegetarian = row.vegetarian;
  }

  static async insert({ name, sauce, vegetarian }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        pastas(name, sauce, vegetarian)
      VALUES
        ($1, $2, $3)
      RETURNING 
        *
      `,
      [name, sauce, vegetarian]
    );
    return new Pasta(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM 
        pastas
      `
    );
    return rows.map((row) => new Pasta(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT 
        *
      FROM 
        pastas
     WHERE
        id=$1
      `, 
      [id]
    );
    return new Pasta(rows[0]);
  }
};
