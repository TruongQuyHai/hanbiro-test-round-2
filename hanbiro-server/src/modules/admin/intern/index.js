const { User, Student } = require("../../../databases/models");

const internRouter = require("express").Router();

internRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await Student.findOne({ where: { studentId: req.params.id } });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

internRouter.get("/", async (req, res, next) => {
  try {
    const users = await Student.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

internRouter.post("/", async (req, res, next) => {
  const student = req.body;
  try {
    const studentCreated = await Student.create({
      ...student,
      cvURL: "",
      startDate: new Date(),
    });
    res.json(studentCreated);
  } catch (err) {
    next(err);
  }
});

internRouter.put("/:id", async (req, res, next) => {
  try {
    const user = await Student.update(
      { ...req.body },
      {
        where: {
          studentId: req.params.id,
        },
      }
    );

    res.json(user);
  } catch (err) {
    next(err);
  }
});

internRouter.delete("/:id", async (req, res, next) => {
  try {
    const r = await Student.destroy({
      where: {
        studentId: req.params.id,
      },
    });
    res.json(r);
  } catch (err) {
    next(err);
  }
});

module.exports = internRouter;
