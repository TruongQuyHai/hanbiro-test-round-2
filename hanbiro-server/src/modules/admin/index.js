const internRouter = require("./intern");

const adminRouter = require("express").Router();

adminRouter.use("/intern", internRouter);

module.exports = adminRouter;
