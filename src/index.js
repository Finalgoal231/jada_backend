import express from "express";
import bodyParser from "body-parser";
import passportMiddleware from "./middlewares/passport";
import passport from "passport";
import { SERVER_PORT } from "./config/keys";
import api from "./api";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
passportMiddleware(passport);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type, authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  next();
});

app.use("/api", api);

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on ${SERVER_PORT}`)
);
