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

};
