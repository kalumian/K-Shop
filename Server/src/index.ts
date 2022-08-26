import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import ProductRouter from "./routers/producRoute";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Routers
app.use("/product", ProductRouter);

// Listen
app.listen(port, () => {
  console.log(`⚡️[server]: Server is runiلwwng at https://localhost:${port}`);
});
