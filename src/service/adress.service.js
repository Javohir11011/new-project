import { pool } from "../database/index.js";

export const createAdress = async (data) => {
  try {
    const currentAdress = await findAdress("title", data);
    // console.log(currentAdress);
    if (currentAdress) {
      throw new Error("Adress already created");
    }
    const queryString = `
    insert into adresses(title, adressline_link_1, adressline_link_2, country, city, pastal_code, phone_number, user_id)
    values($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`;
    const result = await pool.query(queryString, [
      data.title,
      data.adressline_link_1,
      data.adressline_link_2,
      data.country,
      data.city,
      data.pastal_code,
      data.phone_number,
      data.user_id,
    ]);

    return result.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllAdress = async () => {
  try {
    const queryString = `
    select * from adresses`;
    const result = await pool.query(queryString, []);

    return result.rows;
  } catch (error) {
    throw new Error(error);
  }
};

export const findAdress = async (type, data) => {
  let queryString = "";
  switch (type) {
    case "title":
      queryString = `select * from adresses where title = $1`;
      break;
    case "id":
      queryString = `select * from adresses where id = $1`;
      break;
    default:
      queryString = `select * from adresses`;
      break;
  }
  const result = await pool.query(queryString, [data]);

  return result.rows[0];
};


//ozgina kamchiliklari bor nimadaligini topolmadim....
export const getByIdAdress = async (userId) => {
  const queryString = `
  select * from adresses where id = $1`;
  const all = await pool.query(queryString, [userId]);
  console.log((all));
  if (!all) {
    throw new Error("Adress is not found!!!");
  }
  return all.rows[0];
};



export const updateAdress = async (id, adresses) => {
  const queryString = `
    UPDATE adresses
    SET title = $1, country = $2, city = $3
    WHERE id = $4
    RETURNING *;
  `;
  const update = await findAdress("id", id);
  // console.log(update);
  if (!update) {
    throw new Error("User not found");
  }
  const result = await pool.query(queryString, [
    adresses.title || update.title,
    adresses.country || update.country,
    adresses.city || update.city,
    id || update.id,
  ]);
  return result.rows[0];
};

export const deleteAdress = async (adressId) => {
  const queryString = `
    DELETE FROM adresses
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(queryString, [adressId]);

  if (!result) {
    throw new Error("User not found");
  }
  return result.rows[0];
};