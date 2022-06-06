const cors = require("cors");
const express = require("express");

require("./databases/models");
const restRouter = require("./routes");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// multer

// passport

app.use("/", restRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  next(error);
});

app.use((error, req, res, next) => {
  res.status(500).json({
    status: 500,
    error: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
