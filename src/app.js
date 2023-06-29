import express, { json } from "express";
import router from "./routes/apiRoutes.js";
import cors from "cors";
import dayjs from "dayjs";

import { db } from "./config/db.js";

const app = express();

app.use(cors());
app.use(json());
app.use(router);

setInterval(async () => {
  try {
    const timeMaximum = Date.now() - 10000;

    const participantsRemoved = await db
      .collection("participants")
      .find({ lastStatus: { $lte: timeMaximum } })
      .toArray();

    if (participantsRemoved.length > 0) {
      await db
        .collection("participants")
        .deleteMany({ lastStatus: { $lte: timeMaximum } });

      const messages = participantsRemoved.map((participant) => {
        return {
          from: participant.name,
          to: "Todos",
          text: "sai da sala...",
          type: "status",
          time: dayjs(Date.now()).format("HH:mm:ss"),
        };
      });

      await db.collection("messages").insertMany(messages);

      console.log(messages);
    }
  } catch (err) {
    console.log(err.message);
  }
}, 15000);

app.listen(5000, () => {
  console.log("👾 Servidor rodando na porta 5000! 👾");
});
