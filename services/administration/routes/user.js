import express from "express";

import UserController from "../controller/userController.js";
import APIError from "../util/apiError.js";
import APIResponse from "../util/apiResponse.js";

const router = express.Router();
const userController = new UserController();

router.get('/', async function(req, res, next) {
  res.json(
    new APIResponse({
      statusCode: 200,
      results: await userController.getAllUsers()
    })
  );
});

router.get("/:userId", async function(req, res, next){
  const user = await userController.getUser(req.params.userId);
  if(user === null){
    res.status(404);
    res.json(new APIError(404, `No se encontró un usuario con el id ${req.params.userId}`).toJSON());
    return ;
  }
  res.json(new APIResponse({
    statusCode: 200,
    result: user
  }).toJSON());
});

export default router;