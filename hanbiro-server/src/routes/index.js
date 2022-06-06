const adminRouter = require("../modules/admin");

const restRouter = require("express").Router();

restRouter.use("/admin", adminRouter);

module.exports = restRouter;