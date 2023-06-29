import express, { json } from "express";
import router from "./routes/apiRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());
app.use(router);

app.listen(5000, () => {
  console.log("👾 Servidor rodando na porta 5000! 👾");
});
