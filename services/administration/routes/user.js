import express from "express";

import UserController from "../controller/userController.js";
import APIResponse from "../util/apiResponse.js";

const router = express.Router();
const userController = new UserController();

router.get('/', async function(req, res, next) {
  try{
    res.json(
      new APIResponse({
        statusCode: 200,
        results: await userController.getAllUsers()
      })
    );
  }catch(error){
    next(error);
  }
});

router.get("/:userId", async function(req, res, next){
  try{
    const user = await userController.getUser(req.params.userId);
    res.json(new APIResponse({
      statusCode: 200,
      result: user.toJSON()
    }).toJSON());
  }catch(error){
    next(error);
  }
});

router.post("/", async function(req, res, next){
  const body = req.body;
  try{
    const user = await userController.createUser(body);
    res.status(201);
    res.json(new APIResponse({
      statusCode: 201,
      message: "Usuario creado.",
      result: user.toJSON()
    }).toJSON());
  }catch(error){
    next(error);
  }
});

export default router;