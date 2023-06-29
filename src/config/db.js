import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

let db;

const promise = mongoClient.connect();

promise
  .then(() => {
    db = mongoClient.db();
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao banco de dados:", err.message);
  });

export { db };
