import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./Authentication/authRouter";
import cookieparser from "cookie-parser";
import dashboardRouter from "./Database/dashboardRouter";
import shopdataRouter from "./Database/shopdataRouter";
import eqptdataRouter from "./Database/eqptdataRouter";
import subeqptdataRouter from "./Database/subeqptdataRouter";
import formdataRouter from "./Database/formdataRouter";

const app = express();

const configurations = {
  origin: "http://localhost:5173",
  credentials: true,
};

// middlewares
app.use(cors(configurations));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port : ${process.env.PORT}`);
});

// routers
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/shop-data", shopdataRouter);
app.use("/api/eqpt-data", eqptdataRouter);
app.use("/api/sub-eqpt-data", subeqptdataRouter);
app.use("/api/form-data", formdataRouter);

// test route
app.get("/", (req, res) => {
  res.status(201).json({ msg: "hello" });
});
