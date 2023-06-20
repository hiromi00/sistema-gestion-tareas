import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
