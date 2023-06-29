import express from "express";
import dayjs from "dayjs";

import { db } from "../config/db.js";

const router = express.Router();

router.post("/participants", async (req, res) => {
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

router.get("/participants", async (req, res) => {
  try {
    const participants = await db.collection("participants").find().toArray();
    return res.status(200).json(participants);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.post("/messages", async (req, res) => {
  const { to, text, type } = req.body;
  const { user } = req.headers;

  try {
    const resp = await db.collection("participants").findOne({ name: user });
    if (!resp) return res.sendStatus(422);

    await db.collection("messages").insertOne({
      from: user,
      to,
      text,
      type,
      time: dayjs(Date.now()).format("HH:mm:ss"),
    });

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

export default router;
