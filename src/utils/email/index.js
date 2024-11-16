import { config } from "../../config/index.js";
import nodemailer from 'nodemailer'
const {createTransport} = nodemailer
import { logger } from "../logger.js";

const transports = createTransport({
  service: "gmail",
  auth: {
    user: config.email.user,
    pass: config.email.pass
  },
});

export const sendMail = async (to, subject, html) => {
  const info = await transports.sendMail({
    from: config.email.user,
    to,
    subject,
    html,
  });

  logger.info(`Message sent: %s`, info.messageId);
};
