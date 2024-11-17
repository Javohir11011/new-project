import { createAdress, deleteAdress, getAllAdress, updateAdress } from "../service/index.js";

export const adressesController = {
  createAdress: async function (req, res, next) {
    try {
      const data = await createAdress( req.body);
      return res.status(200).send({
        status: "ok",
        data: "Created",
      });
    } catch (error) {
      next(error);
    }
  },
  getAllAdress: async function (req, res, next) {
    try {
      const data = await getAllAdress();
      return res.status(200).send({
        status: "ok",
        data: data
      });
    } catch (error) {
      next(error);
    }
  },
  getByIdAdress: async function (req, res, next) {
    try {
      const id = req.params.id
      const data = await getByIdAdress(id);
      // console.log(data);
      return res.status(200).send({
        status: "ok",
        data: data
      });
    } catch (error) {
      next(error);
    }
  },
  updateAdress:async function(req, res, next){
    try {
      const id = req.params.id
      const result = await updateAdress(id, req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  },
  deleteAdress:async function(req, res, next){
    const id = req.params.id
    const result = await deleteAdress(id)
    res.status(200).send(result)
  }
};
