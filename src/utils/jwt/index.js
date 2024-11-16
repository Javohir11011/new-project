import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
import { config } from "../../config/index.js";

export const generateToken = async (prop, payload) => {
  const option = config.jwt[prop];

  const token = await sign(payload, option.secret, {
    expiresIn: option.expiresIn,
  });

  return token
};

export const verifyToken = async (prop, token) => {
  try {
    const option = config.jwt[prop];

    const result = await verify(token, option.secret);
    return {
      ...result,
      success: true,
    };
  } catch (error) {
    if (error.message === "invalid token") {
      return {
        success: false,
      };
    }
  }
};
