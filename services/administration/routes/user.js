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

// router.post("/", async function(req, res, next){

// });

export default router;