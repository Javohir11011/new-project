import { logger } from "../utils/logger.js";
import { login, register, updateUser } from "../service/index.js";

export const auhtController = {
  register: async function (req, res, next) {
    try {
      const currentUser = await register(req.body);
      res.send({
        status: "ok",
        data: currentUser,
      });
    } catch (e) {
      next(e);
    }
  },
  login: async function (req, res, next) {
    try {
      const currentUser = await login(req.body);
      console.log(currentUser);
      res.send({
        accessToken: currentUser.accessToken,
        refreshToken: currentUser.refreshToken,
      });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  },
  updateUser: async function (req, res, next) {
    try {
      const id = req.params.id;
      const currentUser = await updateUser(id, req.body);
      // console.log(currentUser);
      res.send({
        status: "ok",
        data: currentUser,
      });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  },
};
