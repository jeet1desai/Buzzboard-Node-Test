import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import orderRouter from "./routes/orders.js";
import { connect } from "./db/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


connect();

app.use(cors());
app.use(express.json()); // convert Incoming JSON to Object

// routes
app.use(orderRouter);

app.use("*", (req, res) => {
  return res.status(404).send({
    status: 404,
    messgage: "Provided endpoint Could Not Found.",
  });
});

app.listen(port, () => {
  console.log(`🚀  Server ready at http://127.0.0.1:${port}`);
});
