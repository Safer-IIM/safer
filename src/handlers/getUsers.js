import { getPool } from "../database.js";

export async function getUsers(req, res) {
  const pool = getPool()
  const data = await pool.query('SELECT * FROM users')
  res.send(data);
}
