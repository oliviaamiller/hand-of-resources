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

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        sweets
      WHERE
        id=$1
      `,
      [id]
    );
    return new Sweet(rows[0]);
  }

  static async updateById(id, { name, type }) {
    const currentSweet = await Sweet.getById(id);

    if(!currentSweet) return null;

    const newName = name ?? currentSweet.name;
    const newType = type ?? currentSweet.type;

    const { rows } = await pool.query(
      `
      UPDATE
        sweets
      SET
        name=$2,
        type=$3
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id, newName, newType]
    );
    return new Sweet(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM 
        sweets
      WHERE
        id=$1
      RETURNING 
        *
      `,
      [id]
    );
    return new Sweet(rows[0]);
  }
};
