import express from "express";
import router from "./routes/apiRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const PARTICIPANTES = [{ name: "João", lastStatus: 12313123 }];

const MENSAGENS = [
  {
    from: "João",
    to: "Todos",
    text: "oi galera",
    type: "message",
    time: "20:04:37",
  },
];

const app = express();

app.use(router);

app.listen(5000, () => {
  console.log("👾 Servidor rodando na porta 5000! 👾");
});
