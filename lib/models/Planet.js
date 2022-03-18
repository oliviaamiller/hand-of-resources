const pool = require('../utils/pool');

module.exports = class Planet {
  id;
  name;
  distanceFromSun;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.distanceFromSun = row.distance_from_sun;
  }

  static async insert({ name, distanceFromSun }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        planets(name, distance_from_sun)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
      [name, distanceFromSun]
    );
    return new Planet(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM 
        planets
      `
    );
    return rows.map((row) => new Planet(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM 
        planets
      WHERE
        id=$1
      `, 
      [id]
    );
    return new Planet(rows[0]);
  }

  static async updateById(id, { name, distanceFromSun }) {
    const currentPlanet = await Planet.getById(id);

    if(!currentPlanet) return null;

    const newName = name ?? currentPlanet.name;
    const newDistanceFromSun = distanceFromSun ?? currentPlanet.distanceFromSun;

    const { rows } = await pool.query(
      `
      UPDATE
        planets
      SET
        name=$2,
        distance_from_sun=$3
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id, newName, newDistanceFromSun]
    );
    return new Planet(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        planets
      WHERE 
        id=$1
      RETURNING
        *
      `,
      [id]
    );
    return new Planet(rows[0]);
  }

};
