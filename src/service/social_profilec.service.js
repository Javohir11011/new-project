import { pool } from "../database/index.js";

export const createScProfiles = async (data) => {
  try {
    const currentProfile = await findAdress("platform", data);
    // console.log(currentAdress);
    if (currentProfile) {
      throw new Error("already created");
    }
    const queryString = `
    insert into PROFILES(platform, platform_user, user_id)
    values($1, $2, $3)
    RETURNING *`;
    const result = await pool.query(queryString, [
      data.platform,
      data.platform_user,
      data.user_id,
    ]);

    return result.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllScProfiles = async () => {
  try {
    const queryString = `
    select * from PROFILES`;
    const result = await pool.query(queryString, []);

    return result.rows;
  } catch (error) {
    throw new Error(error);
  }
};

export const findAdress = async (type, data) => {
  let queryString = "";
  switch (type) {
    case "platform":
      queryString = `select * from PROFILES where platform = $1`;
      break;
    case "id":
      queryString = `select * from PROFILES where id = $1`;
      break;
    default:
      queryString = `select * from PROFILES`;
      break;
  }
  const result = await pool.query(queryString, [data]);

  return result.rows[0];
};

//ozgina kamchiliklari bor nimadaligini topolmadim....
export const getByIdScProfiles = async (userId) => {
  const queryString = `
  select * from PROFILES where id = $1`;
  const all = await pool.query(queryString, [userId]);
  // console.log(all);
  if (!all) {
    throw new Error("profile is not found!!!");
  }
  return all.rows[0];
};

export const updateScProfiles = async (id, profile) => {
  const queryString = `
    UPDATE PROFILES
    SET platform = $1, platform_user = $2
    WHERE id = $3
    RETURNING *;
  `;
  const update = await findAdress("id", id);
  // console.log(update);
  if (!update) {
    throw new Error("profile not found");
  }
  const result = await pool.query(queryString, [
    profile.platform || update.platform,
    profile.platform_user || update.platform_user,
    id || update.id,
  ]);
  return result.rows[0];
};

export const deleteScProfiles = async (adressId) => {
  const queryString = `
    DELETE FROM PROFILES
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(queryString, [adressId]);

  if (!result) {
    throw new Error("User not found");
  }
  return result.rows[0];
};
