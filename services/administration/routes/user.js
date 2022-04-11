import express from "express";

import UserController from "../controller/userController.js";

const router = express.Router();
const userController = new UserController();

router.get('/', async function(req, res, next) {
  res.json(
    await userController.getAllUsers()
  );
});

router.get("/:userId", async function(req, res, next){
  const user = await userController.getUser(req.params.userId);
  res.statusCode = user === null ? 404 : 200;
  res.json(
    await userController.getUser(req.params.userId)
  );
});

export default router;