const { Sequelize, DataTypes } = require("sequelize");
const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
} = require("../../configs/database");

const sequelize = new Sequelize(
  `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`
);

const User = sequelize.define("user", {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false }, //ENUM("admin", "intern"),
});

const Student = sequelize.define("student", {
  studentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  major: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  cvURL: { type: DataTypes.STRING, allowNull: false }, // url map to the file
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: true },
  result: { type: DataTypes.BOOLEAN, allowNull: true },
});

const CV = sequelize.define("cv", {
  cvId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  file: { type: DataTypes.BLOB, allowNull: false },
});

const Comment = sequelize.define("comment", {
  commentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: { type: DataTypes.DATE, allowNull: false },
  editedDate: { type: DataTypes.DATE, allowNull: true },
  content: { type: DataTypes.STRING, allowNull: false },
});

const Task = sequelize.define("task", {
  taskId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  completedDate: { type: DataTypes.DATE, allowNull: true },
  status: {
    type: DataTypes.STRING, //ENUM("DONE", "ONGOING", "SUSPEND"),
    allowNull: true,
  },
});

User.hasOne(Student, { foreignKey: { name: "userId", allowNull: true } });

Student.belongsTo(User);

Student.hasOne(CV, {
  foreignKey: { name: "studentId", allowNull: false },
  onDelete: "CASCADE",
});

CV.belongsTo(Student);

Task.hasMany(Comment, {
  foreignKey: { name: "taskId", allowNull: false },
  onDelete: "CASCADE",
});

Comment.belongsTo(Task);

User.hasMany(Comment, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});

Comment.belongsTo(User);

User.belongsToMany(Task, {
  through: "UserTask",
});

Task.belongsToMany(User, {
  through: "UserTask",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await User.sync({ alter: true });
    await Student.sync({ alter: true });
    await CV.sync({ alter: true });
    await Comment.sync({ alter: true });
    await Task.sync({ alter: true });
    console.log("Tables created");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = {
  User,
  Student,
  CV,
  Comment,
  Task,
};
