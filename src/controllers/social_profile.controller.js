import {
  createCategory,
  deleteScProfiles,
  getAllScProfiles,
  getByIdScProfiles,
  updateScProfiles,
} from "../service/index.js";

export const profileController = {
  createScProfiles: async function (req, res, next) {
    try {
      const data = await createCategory(req.body);
      return res.status(200).send({
        status: "ok",
        data: "Created",
      });
    } catch (error) {
      next(error);
    }
  },
  getAllScProfiles: async function (req, res, next) {
    try {
      const data = await getAllScProfiles();
      return res.status(200).send({
        status: "ok",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  getByIdScProfiles: async function (req, res, next) {
    try {
      const id = req.params.id;
      const data = await getByIdScProfiles(id);
      // console.log(data);
      return res.status(200).send({
        status: "ok",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  updateScProfiles: async function (req, res, next) {
    try {
      const id = req.params.id;
      const result = await updateScProfiles(id, req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },
  deleteScProfiles: async function (req, res, next) {
    const id = req.params.id;
    const result = await deleteScProfiles(id);
    res.status(200).send(result);
  },
};
