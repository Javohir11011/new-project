import { pool } from "../database/index.js";
import {
  comparePassword,
  hashPassword,
  logger,
  generateOtp,
  sendMail,
  generateToken,
} from "../utils/index.js";

export const register = async (user) => {
  try {
    const currentUser = await findUser("email", user.email);
    if (currentUser) {
      throw new Error(`Users already registred...`);
    }

    const otp = await generateOtp();

    sendMail(user.email, `OT`, `<h>Bu sizning otp kodingiz ${otp} </h>`);

    const data = await createUser(user);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (user) => {
  try {
    // console.log(user.email);
    const currentUser = await findUser("email", user.email);
    console.log(currentUser);
    if (!currentUser) {
      throw new Error(`user is not defined...`);
    }
    const check = await comparePassword(user.password, currentUser.password);
    if (!check) {
      throw new Error(`Password teng emas`);
    }

    const accessToken = await generateToken("access", {
      sub: currentUser.id,
      email: currentUser.email,
      role: currentUser.role,
      username: currentUser.username,
    });

    const refreshToken = await generateToken("refresh", {
      sub: currentUser.id,
      email: currentUser.email,
      role: currentUser.role,
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const createUser = async (user) => {
  try {
    const queryString = `
        insert into users(
        name,
        email,
        password,
        username,
        phone_number
        ) values($1, $2, $3, $4, $5) returning *`;

    const hashePassword = await hashPassword(user.password);
    const result = await pool.query(queryString, [
      user.name,
      user.email,
      hashePassword,
      user.username,
      user.phone_number,
    ]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};
export const findUser = async (type, data) => {
  let queryString = "";

  switch (type) {
    case "id":
      queryString = `SELECT * FROM users where id = $1`;
      break;
    case "email":
      queryString = `SELECT * FROM users where email = $1`;
      break;
    case "username":
      queryString = `SELECT * FROM users where username = $1`;
      break;

    default:
      queryString = `SELECT * FROM users`;
      break;
  }

  const result = await pool.query(queryString, [data]);

  return result.rows[0];
};

export const updateUser = async (userId, user) => {
  const queryString = `
    UPDATE users
    SET name = $1, username = $2, email = $3, role = $4
    WHERE id = $5
    RETURNING *;
  `;
  const update = await findUser("id", userId);
  console.log(update);
  if (!update) {
    throw new Error("User not found");
  }
  const result = await pool.query(queryString, [
    user.name || update.name,
    user.username || update.userId,
    user.email || update.email,
    user.role || update.user,
    userId || update.id,
  ]);
  return result.rows[0];
};

export const deleteUser = async (userId) => {
  const queryString = `
    DELETE FROM users
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(queryString, [userId]);

  if (!result) {
    throw new Error("User not found");
  }
  return result.rows[0];
};
export const getAllUsers = async () => {
  const queryString = `
  select * from users`;

  const all = await pool.query(queryString);
  if (!all) {
    throw new Error("Users not found!!!");
  }
  return all.rows;
};

export const getByIdUsers = async (userId) => {
  const queryString = `
  select * from users where id = $1`;
  const all = await pool.query(queryString, [userId]);
  if (!all) {
    throw new Error("Users not found!!!");
  }
  return all.rows[0];
};
