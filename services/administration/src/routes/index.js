import express from "express";
var router = express.Router();

/* GET home page. */
router.get('/', function(_req, res, _next) {
  res.redirect("/");
});

export default router;