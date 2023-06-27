import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(process.env.TESTE);
});

export default router;
