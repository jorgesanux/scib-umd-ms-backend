import express from "express";

import UserController from "../controller/userController.js";
import APIResponse from "../util/apiResponse.js";

const router = express.Router();
const userController = new UserController();

router.get('/', async function(_req, res, next) {
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

router.get("/:id", async function(req, res, next){
  try{
    const user = await userController.getUser(req.params.id);
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

router.delete("/:id", async function(req, res, next){
  try{
    res.json(new APIResponse({
      statusCode: 200,
      message: "Usuario eliminado.",
      result: await userController.deleteUser(req.params.id)
    }).toJSON());
  }catch(error){
    next(error);
  }
});

router.put("/:id", async function(req, res, next){
  try{
    const body = req.body;
    let result = await userController.updateOrCreateUser(req.params.id, body);
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

router.patch("/:id", async function(req, res, next){
  try{
    const body = req.body;
    res.json(new APIResponse({
      statusCode: 200,
      message: "Usuario actualizado.",
      result: await userController.updateUser(req.params.id, body)
    }).toJSON());
  }catch(error){
    next(error);
  }
});

export default router;