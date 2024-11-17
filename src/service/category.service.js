import { pool } from "../database/index.js";

export const createCategory = async (data) => {
  try {
    const queryString = `
      INSERT INTO categories (name, description, tag)
      VALUES ($1, $2, $3)
      RETURNING *`;

    const result = await pool.query(queryString, [
      data.name,
      data.description,
      data.tag,
    ]);

    return result.rows[0];
  } catch (error) {
    console.error("Error in createCategory:", error.message);
    throw error;
  }
};

export const getAllCategory = async () => {
  try {
    const queryString = `
    select * from categories`;
    const result = await pool.query(queryString, []);

    return result.rows;
  } catch (error) {
    throw new Error(error);
  }
};

export const findCategory = async (type, data) => {
  let queryString = "";
  switch (type) {
    case "platform":
      queryString = `select * from categories where name = $1`;
      break;
    case "id":
      queryString = `select * from categories where id = $1`;
      break;
    default:
      queryString = `select * from categories`;
      break;
  }
  const result = await pool.query(queryString, [data]);

  return result.rows[0];
};

export const getByIdCategory = async (categoriesId) => {
  const queryString = `
  select * from categories where id = $1`;
  const all = await pool.query(queryString, [categoriesId]);
  // console.log(all);
  if (!all) {
    throw new Error("categories is not found!!!");
  }
  return all.rows[0];
};

export const updateCategory = async (id, categories) => {
  const queryString = `
    UPDATE categories
    SET name = $1, description = $2, tag = $3
    WHERE id = $4
    RETURNING *;
  `;
  const update = await findCategory("id", id);
  if (!update) {
    throw new Error("profile not found");
  }
  const result = await pool.query(queryString, [
    categories.name || update.name,
    categories.description || update.description,
    categories.tag || update.tag,
    id || update.id,
  ]);
  return result.rows[0];
};

export const deleteCategory = async (categoryId) => {
  const queryString = `
    DELETE FROM categories
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(queryString, [categoryId]);

  if (!result) {
    throw new Error("User not found");
  }
  return result.rows[0];
};
