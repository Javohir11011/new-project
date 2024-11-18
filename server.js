import express from "express";
import {
  adressRouter,
  categoryRouter,
  productRouter,
  profileRouter,
  userRouter,
} from "./src/routes/index.js";
import { config } from "dotenv";
import {
  createAdressTable,
  createCategories,
  createProductTable,
  createProfiele,
  createUserTable,
} from "./src/models/index.js";

config();

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/adress", adressRouter);
app.use("/api/v1/profiles", profileRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);

app.get("/setup", async (req, res) => {
  await createProfiele(),
    await createCategories(),
    await createAdressTable(),
    await createUserTable(),
    await createProductTable(),
    res.send("Table created!.");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running ${PORT} port`);
});
