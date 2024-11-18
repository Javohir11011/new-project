import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getByIdProduct,
  updateProduct,
} from "../service/index.js";

export const productController = {
  createProduct: async function (req, res, next) {
    try {
      const data = await createProduct(req.body);
      return res.status(200).send({
        status: "ok",
        data: "Created",
      });
    } catch (error) {
      next(error);
    }
  },
  getAllProduct: async function (req, res, next) {
    try {
      const data = await getAllProduct();
      return res.status(200).send({
        status: "ok",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  getByIdProduct: async function (req, res, next) {
    try {
      const id = req.params.id;
      const data = await getByIdProduct(id);
      // console.log(data);
      return res.status(200).send({
        status: "ok",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  updateProduct: async function (req, res, next) {
    try {
      const id = req.params.id;
      const result = await updateProduct(id, req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },
  deleteProduct: async function (req, res, next) {
    const id = req.params.id;
    const result = await deleteProduct(id);
    res.status(200).send(result);
  },
};
