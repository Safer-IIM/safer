import { getPool } from "../database.js";

export async function findUser(email) {
    const pool = getPool()
    const { rows } = await pool.query(`SELECT username FROM users WHERE email = '${email}'`)
    console.log('rows', rows)
    return rows ? rows[0] : null
}
