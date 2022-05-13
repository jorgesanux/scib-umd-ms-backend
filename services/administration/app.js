import 'dotenv/config';
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from 'url';
import { createRequire } from "module";
import swaggerUI from 'swagger-ui-express';

import Constant from './util/constant.js';
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import tableRouter from "./routes/table.js";
import APIError from './util/apiError.js';

const require = createRequire(import.meta.url);
const swaggerDocument = require("./docs/swagger.json");

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const optionsSwagger = {
};

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(Constant.BASE_PATH.BASE_PATH, indexRouter);
app.use(Constant.BASE_PATH.BASE_PATH + Constant.BASE_PATH.BASE_PATH_USER, userRouter);
app.use(Constant.BASE_PATH.BASE_PATH + Constant.BASE_PATH.BASE_PATH_TABLE, tableRouter);

app.use((error, _req, res, next)=>{
    if(error instanceof APIError){
        res.status(error.status);
        res.json(error.toJSON());
    }else{
        next(error);
    }
});
app.use(function(error, _req, res, _next){
    res.status(500);
    res.json(new APIError(500,error.message,error?.original?.code).toJSON());
});

app.use(
    Constant.BASE_PATH.BASE_PATH_SWAGGER,
    swaggerUI.serve, 
    swaggerUI.setup(swaggerDocument, optionsSwagger)
);

export default app;