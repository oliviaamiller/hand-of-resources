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

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM 
        cats
      WHERE
        id=$1
      `,
      [id]
    );
    return new Cat(rows[0]);
  }

  static async updateById(id, { name, breed, age }) {
    const currentCat = await Cat.getById(id);

    if(!currentCat) return null;

    const newName = name ?? currentCat.name;
    const newBreed = breed ?? currentCat.breed;
    const newAge = age ?? currentCat.age;

    const { rows } = await pool.query(
      `
      UPDATE
        cats
      SET
        name=$2,
        breed=$3,
        age=$4
      WHERE
        id=$1
      RETURNING 
        *
      `,
      [id, newName, newBreed, newAge]
    );
    return new Cat(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM 
        cats
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );
    return new Cat(rows[0]);
  }
};
