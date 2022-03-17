const pool = require('../utils/pool');

module.exports = class Sweet {
  id;
  name;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
  }

  static async insert({ name, type }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            sweets(name, type)
        VALUES
            ($1, $2)
        RETURNING 
            *
      `,
      [name, type]
    );
    return new Sweet(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        sweets
      `
    );
    return rows.map((row) => new Sweet(row));
  }
};
