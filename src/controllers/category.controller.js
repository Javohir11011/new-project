import {
    createCategory,
    deleteCategory,
    getAllCategory,
    getByIdCategory,
    updateCategory,
  } from "../service/index.js";
  
  export const categoryController = {
    createCategory: async function (req, res, next) {
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
    getAllCategory: async function (req, res, next) {
      try {
        const data = await getAllCategory();
        return res.status(200).send({
          status: "ok",
          data: data,
        });
      } catch (error) {
        next(error);
      }
    },
    getByIdCategory: async function (req, res, next) {
      try {
        const id = req.params.id;
        const data = await getByIdCategory(id);
        // console.log(data);
        return res.status(200).send({
          status: "ok",
          data: data,
        });
      } catch (error) {
        next(error);
      }
    },
    updateCategory: async function (req, res, next) {
      try {
        const id = req.params.id;
        const result = await updateCategory(id, req.body);
        res.status(200).send(result);
      } catch (error) {
        next(error);
      }
    },
    deleteCategory: async function (req, res, next) {
      const id = req.params.id;
      const result = await deleteCategory(id);
      res.status(200).send(result);
    },
  };
  