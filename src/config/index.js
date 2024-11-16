import db from "./db.js";
import application from "./app.js";
import email from "./email.js";
import jwt from "./jwt.js";

export const config = {
  ...db,
  ...application,
  ...jwt,
  ...email,
};
