import { pool } from "../database/index.js";

export const createProduct = async (data) => {
  try {
    const queryString = `
      INSERT INTO product (
        category_id, title, picture, summary, description, price,
        discount_type, discount_value, tags
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`;

    const result = await pool.query(queryString, [
      data.category_id,
      data.title,
      data.picture,
      data.summary,
      data.description,
      data.price,
      data.discount_type,
      data.discount_value,
      data.tags,
    ]);

    return result.rows[0];
  } catch (error) {
    console.error("Error in createProduct:", error.message);
    throw error;
  }
};

export const getAllProduct = async () => {
  try {
    const queryString = `
    select * from product`;
    const result = await pool.query(queryString, []);

    return result.rows;
  } catch (error) {
    throw new Error(error);
  }
};

export const findProduct = async (type, data) => {
  let queryString = "";
  switch (type) {
    case "platform":
      queryString = `select * from product where title = $1`;
      break;
    case "id":
      queryString = `select * from product where id = $1`;
      break;
    default:
      queryString = `select * from product`;
      break;
  }
  const result = await pool.query(queryString, [data]);

  return result.rows[0];
};

export const getByIdProduct = async (productId) => {
  const queryString = `
  select * from product where id = $1`;
  const all = await pool.query(queryString, [productId]);
  // console.log(all);
  if (!all) {
    throw new Error("product is not found!!!");
  }
  return all.rows[0];
};

export const updateProduct = async (id, products) => {
  const queryString = `
    UPDATE product
    SET title = $1, picture = $2, summary = $3
    WHERE id = $4
    RETURNING *;
  `;
  const update = await findProduct("id", id);
  if (!update) {
    throw new Error("profile not found");
  }
  const result = await pool.query(queryString, [
    products.title || update.title,
    products.picture || update.picture,
    products.summary || update.summary,
    id || update.id,
  ]);
  return result.rows[0];
};

export const deleteProduct = async (categoryId) => {
  const queryString = `
    DELETE FROM product
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(queryString, [categoryId]);

  if (!result) {
    throw new Error("User not found");
  }
  return result.rows[0];
};
