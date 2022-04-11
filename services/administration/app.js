import 'dotenv/config';
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from 'url';

import Constant from './util/constant.js';
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(Constant.BASE_PATH.BASE_PATH, indexRouter);
app.use(Constant.BASE_PATH.BASE_PATH + Constant.BASE_PATH.BASE_PATH_USER, userRouter);

export default app;