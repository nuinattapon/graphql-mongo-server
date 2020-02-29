import pg, { Pool } from 'pg'
import dotenv from 'dotenv'

// * Config dotEnv
dotenv.config({ path: './src/config/config.env' })

export const connectPGDB = async () => {
  console.log({
    PGUSER: process.env.PGUSER,
    PGHOST: process.env.PGHOST,
    PGDATABASE: process.env.PGDATABASE,
    PGPASSWORD: process.env.PGPASSWORD,
    PGPORT: process.env.PGPORT,
  })
  try {
    // * Postgres Client Setup
    const pgClient = await new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    })

    pgPool = pgClient

    await pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)')

    const values = await pgClient.query('SELECT NOW() as now')

    console.log({ rows: values.rows })
    return pgClient
  } catch (err) {
    console.log(`Error: ${err.message}`.red)
    process.exit(1)
  }
}

export let pgPool

export const pgQuery = (text, params) => pgPool.query(text, params)
