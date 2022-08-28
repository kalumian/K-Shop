import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const cors = require("cors");
import ProductRouters from "./routers/producRoute";
import UserRouters from "./routers/usersRouter";
import bodyParser from "body-parser";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Routers
app.use("/product", ProductRouters);
app.use("/user", UserRouters);

// Listen
app.listen(port, () => {
  console.log(`⚡️[server]: Server is runiلwwng at https://localhost:${port}`);
});
