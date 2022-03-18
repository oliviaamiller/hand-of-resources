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

  static async updateById(id, { name, sauce, vegetarian }) {
    const currentPasta = await Pasta.getById(id);

    if(!currentPasta) return null;

    const newName = name ?? currentPasta.name;
    const newSauce = sauce ?? currentPasta.sauce;
    const newVegetarian = vegetarian ?? currentPasta.vegetarian;

    const { rows } = await pool.query(
      `
      UPDATE
        pastas
      SET
        name=$2,
        sauce=$3,
        vegetarian=$4
      WHERE
        id=$1
      RETURNING 
        *
      `,
      [id, newName, newSauce, newVegetarian]
    );
    return new Pasta(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        pastas
      WHERE
        id=$1
      RETURNING 
        *
      `,
      [id]
    );
    return new Pasta(rows[0]);
  }
};
