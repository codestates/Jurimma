const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const userRouter = require("./routes/user");
const searchRouter = require("./routes/search");
const myContentsRouter = require("./routes/myContents");
const contentsRouter = require("./routes/contents");

require("dotenv").config();

const { sequelize } = require("./models");

const app = express();
const port = process.env.DATABASE_SERVER_PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger("dev"));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/search", searchRouter);
app.use("/myContents", myContentsRouter);
app.use("/contents", contentsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {
  res.status(404).send("Not Found!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: "Internal Server Error",
    stacktrace: err.toString(),
  });
});

// 데이터베이스 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(port, () => {
  console.log(`Jurimma app listening at http://localhost:${port} 😘`);
});
