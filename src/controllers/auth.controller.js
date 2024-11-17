import { logger } from "../utils/logger.js";
import {
  deleteUser,
  getAllUsers,
  getByIdUsers,
  login,
  register,
  updateUser,
} from "../service/index.js";

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
  deleteUser: async function (req, res, next) {
    try {
      const id = req.params.id;
      const currentUser = await deleteUser(id);
      // console.log(currentUser);
      if (!currentUser) {
        return res.status(404).send("User not found!!!");
      }
      return res.status(200).send({
        status: "Ok",
        data: "Delete user...",
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  getAllUsers: async function (req, res, next) {
    const all = await getAllUsers();

    res.status(201).send(all);
  },
  getByIdUsers: async function (req, res, next) {
    const id = req.params.id
    const all = await getByIdUsers(id);

    res.status(201).send(all);
  },
};
