const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user");
const searchRouter = require("./routes/search");
const myContentsRouter = require("./routes/myContents");
const contentsRouter = require("./routes/contents");

const app = express();
const port = 4000;

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true
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

app.listen(port, () => {
  console.log(`Jurimma app listening at http://localhost:${port} 😘`);
});
