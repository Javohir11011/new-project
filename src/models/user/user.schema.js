import { pool } from '../../database/index.js';
import { logger } from '../../utils/logger.js'

export const createUserTable = async () => {
    try {
        // await pool.query(`
        // CREATE type USER_ROLE AS ENUM('user', 'admin','manager')`)
        await pool.query(`
        CREATE TABLE IF not EXISTS users(
            id serial PRIMARY KEY,
            name VARCHAR,
            email VARCHAR UNIQUE NOT NULL,
            PASSWORD VARCHAR NOT NULL,
            role USER_ROLE DEFAULT 'user',
            avatar VARCHAR,
            username VARCHAR UNIQUE NOT NULL,
            brith_of_date DATE,
            phone_number VARCHAR UNIQUE NOT NULL,
            is_activ boolean DEFAULT false,
            create_at timestamp DEFAULT current_timestamp,
            update_at timestamp DEFAULT current_timestamp
        )`)
    } catch (error) {
        logger.error(error)
    }
}
