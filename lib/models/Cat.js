const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  name;
  breed;
  age;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.breed = row.breed;
    this.age = row.age;
  }

  static async insert({ name, breed, age }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        cats(name, breed, age)
      VALUES
        ($1, $2, $3)
      RETURNING 
        *
      `,
      [name, breed, age]
    );
    return new Cat(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM 
        cats
      `
    );
    return rows.map((row) => new Cat(row));
  }


};
