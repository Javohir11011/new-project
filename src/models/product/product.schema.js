import { pool } from "../../database/index.js";
import { logger } from "../../utils/logger.js";

export const createProductTable = async () => {
  try {
    // await pool.query(`
    // CREATE type USER_ROLE AS ENUM('user', 'admin','manager')`)
    await pool.query(`
     CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    category_id int,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    title VARCHAR UNIQUE NOT NULL,
    picture VARCHAR UNIQUE NOT NULL,
    summary VARCHAR NOT NULL,
    description TEXT,
    price REAL default 1000,
    discount_type VARCHAR not null, 
    discount_value REAL,
    tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);
  } catch (error) {
    logger.error(error);
  }
};
