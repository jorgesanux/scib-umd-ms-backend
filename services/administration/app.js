import 'dotenv/config';
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from 'url';

import Constant from './util/constant.js';
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import APIError from './util/apiError.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(Constant.BASE_PATH.BASE_PATH, indexRouter);
app.use(Constant.BASE_PATH.BASE_PATH + Constant.BASE_PATH.BASE_PATH_USER, userRouter);

app.use((error, req, res, next)=>{
    if(error instanceof APIError){
        res.status(error.status);
        res.json(error.toJSON());
    }else{
        next(error);
    }
});
app.use(function(error, req, res, next){
    res.status(500);
    res.json(new APIError(500,error.message,error?.original?.code).toJSON());
});

export default app;