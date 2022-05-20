import express from "express";

import TableController from "../controller/TableController.js";
import APIResponse from "../util/apiResponse.js";

const tableRouter = express.Router();
const tableController = new TableController();

tableRouter.get('/', async function(_req, res, next) {
  try{
    res.json(
      new APIResponse({
        statusCode: 200,
        results: await tableController.getAll()
      })
    );
  }catch(error){
    next(error);
  }
});

tableRouter.get("/:id", async function(req, res, next){
  try{
    const user = await tableController.get(req.params.id);
    res.json(new APIResponse({
      statusCode: 200,
      result: user.toJSON()
    }).toJSON());
  }catch(error){
    next(error);
  }
});

tableRouter.post("/", async function(req, res, next){
  const body = req.body;
  try{
    const user = await tableController.create(body);
    res.status(201);
    res.json(new APIResponse({
      statusCode: 201,
      message: "Mesa creada.",
      result: user.toJSON()
    }).toJSON());
  }catch(error){
    next(error);
  }
});

tableRouter.delete("/:id", async function(req, res, next){
  try{
    res.json(new APIResponse({
      statusCode: 200,
      message: "Mesa eliminada.",
      result: await tableController.delete(req.params.id)
    }).toJSON());
  }catch(error){
    next(error);
  }
});

tableRouter.put("/:id", async function(req, res, next){
  try{
    const body = req.body;
    let result = await tableController.updateOrCreate(req.params.id, body);
    let bIsUpdate = "affected_rows" in result;
    let statusCode = bIsUpdate ? 200 : 201;
    res.status(statusCode);
    res.json(new APIResponse({
      statusCode,
      message: bIsUpdate ? "Mesa actualizada." :  "Mesa creada.",
      result: result
    }).toJSON());
  }catch(error){
    next(error);
  }
});

tableRouter.patch("/:id", async function(req, res, next){
  try{
    const body = req.body;
    res.json(new APIResponse({
      statusCode: 200,
      message: "Mesa actualizada.",
      result: await tableController.update(req.params.id, body)
    }).toJSON());
  }catch(error){
    next(error);
  }
});


export default tableRouter;