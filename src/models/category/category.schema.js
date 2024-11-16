import pool from '../../database/index.js'
import { logger } from '../../utils/logger.js'

export const createCategories = async () => {
    try {
        await pool.query(
            `
            CREATE TABLE IF not EXISTS categries (
                id serial PRIMARY KEY,
                name VARCHAR NOT NULL
                description TEXT NOT NULL,
                tag VARCHAR NOT NULL,
                create_at timestamp DEFAULT current_timestamp,
                uppdate_at timestamp DEFAULT current_timestamp
            )`)
    } catch (error) {
        logger.error(error)
    }
}
