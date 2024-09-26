require("dotenv").config({ path: `${process.cwd()}/.env` });

const express = require("express");
const cors = require("cors");

const authRouter = require("./route/authRoute");
const productRouter = require("./route/productRoute");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errControler");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "succeed",
    message: "REST API, are working",
  });
});

// all route here

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError("Can't find this route", 404);
  })
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log("Server up and running", PORT);
  
  console.log(process.env.DB_PORT);
});

app.listen();
