// import pool from '../../database/index.js'
// import { logger } from '../../utils/logger.js'

export const createProfiele = async () => {
    try {
        await pool.query(
            `
            CREATE TABLE IF not EXISTS PROFILES (
                id serial PRIMARY KEY,
                platform VARCHAR NOT NULL,
                platform_user VARCHAR NOT NULL,
                user_id int,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )`)
    } catch (error) {
        logger.error(error)
    }
}
