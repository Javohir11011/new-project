import { pool } from "../../database/index.js";
import { logger } from "../../utils/logger.js";

export const createCategories = async () => {
  try {
    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        description VARCHAR NOT NULL,
        tag VARCHAR,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
    );
  } catch (error) {
    logger.error(error);
  }
};
