import express from "express";

import TableController from "../controller/tableController.js";
import APIResponse from "../util/apiResponse.js";

const router = express.Router();
const tableController = new TableController();

router.get('/', async function(_req, res, next) {
  try{
    res.json(
      new APIResponse({
        statusCode: 200,
        results: await tableController.getAllTables()
      })
    );
  }catch(error){
    next(error);
  }
});

export default router;