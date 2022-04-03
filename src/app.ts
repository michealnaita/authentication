import express, { Express } from "express";

const app: Express = express();
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(3000, () => {
  console.log("server running on port 3000");
});
