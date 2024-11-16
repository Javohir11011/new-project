import { config } from "dotenv";

config();

export default {
  email: {
    user: process.env.PG_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
};
