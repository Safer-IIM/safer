import { getPool } from "../database.js";


export async function insertUser({ username, email, hashedPassword }) {
    const pool = getPool()
    const stmt = `
          INSERT INTO users(username, email, password)
          VALUES ($1, $2, $3) 
          RETURNING *
      `;
    const params = [username, email, hashedPassword];
    console.log('params', params)
    const { rows } = await pool.query(stmt, params)
    return rows[0]
  }