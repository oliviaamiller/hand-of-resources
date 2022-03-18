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
};
