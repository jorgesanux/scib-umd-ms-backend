import express from "express";

import UserController from "../controller/UserController.js";
import APIResponse from "../util/apiResponse.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/', async function(_req, res, next) {
  try{
    res.json(
      new APIResponse({
        statusCode: 200,
        results: await userController.getAll()
      })
    );
  }catch(error){
    next(error);
  }
});

userRouter.get("/:id", async function(req, res, next){
  try{
    const user = await userController.get(req.params.id);
    res.json(new APIResponse({
      statusCode: 200,
      result: user.toJSON()
    }).toJSON());
  }catch(error){
    next(error);
  }
});

userRouter.post("/", async function(req, res, next){
  const body = req.body;
  try{
    const user = await userController.create(body);
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

userRouter.delete("/:id", async function(req, res, next){
  try{
    res.json(new APIResponse({
      statusCode: 200,
      message: "Usuario eliminado.",
      result: await userController.delete(req.params.id)
    }).toJSON());
  }catch(error){
    next(error);
  }
});

userRouter.put("/:id", async function(req, res, next){
  try{
    const body = req.body;
    let result = await userController.updateOrCreate(req.params.id, body);
    let bIsUpdate = "affected_rows" in result;
    let statusCode = bIsUpdate ? 200 : 201;
    res.status(statusCode);
    res.json(new APIResponse({
      statusCode,
      message: bIsUpdate ? "Usuario actualizado." :  "Usuario creado.",
      result: result
    }).toJSON());
  }catch(error){
    next(error);
  }
});

userRouter.patch("/:id", async function(req, res, next){
  try{
    const body = req.body;
    res.json(new APIResponse({
      statusCode: 200,
      message: "Usuario actualizado.",
      result: await userController.update(req.params.id, body)
    }).toJSON());
  }catch(error){
    next(error);
  }
});

export default userRouter;