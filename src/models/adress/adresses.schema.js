import pool from '../../database/index.js'
import { logger } from '../../utils/logger.js'

export const createAdressTable = async () => {
    try {
        await pool.query(`
        CREATE TABLE IF not EXISTS adresses(
            id serial PRIMARY KEY,
            title VARCHAR NOT NULL,
            adressline_link_1 VARCHAR NOT NULL,
            adressline_link_2 VARCHAR NOT NULL,
            country VARCHAR NOT NULL,
            city VARCHAR NOT NULL,
            pastal_code VARCHAR NOT NULL,
            phone_number VARCHAR UNIQUE NOT NULL,
            user_id int,
            FOREIGN KEY(user_id) REFERENCES users(id),
            create_at timestamp DEFAULT current_timestamp,
            update_at timestamp DEFAULT current_timestamp
)`)
    } catch (error) {
        logger.error(error)
    }
}
