import express from "express";
import dayjs from "dayjs";

import { db } from "../config/db.js";

const router = express.Router();

router.get("/participants", async (req, res) => {
  const { name } = req.body;

  try {
    const lastStatus = Date.now();
    const timeFormated = dayjs(lastStatus).format("HH:mm:ss");

    await db.collection("participants").insertOne({
      name,
      lastStatus,
    });

    await db.collection("messages").insertOne({
      from: name,
      to: "Todos",
      text: "entra na sala...",
      type: "status",
      time: timeFormated,
    });

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

export default router;
