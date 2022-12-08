const express = require("express");

const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");

const articleRoutes = require("./routes/articles");

const mongoUri =
  "mongodb+srv://AlvinAcosta:lokalsoul@nodemarkdownblogcluster.licr44p.mongodb.net/blogProject?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.set("views", "views");

// built in middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// third party middleware
app.use(cors());
app.use(methodOverride("_method"));

// application routes
app.use("/articles", articleRoutes);
app.get("/", (req, res) => res.redirect("/articles"));

//error route
app.use((req, res, next) => {
  // res.status(404).render("404", { pageTitle: "Page Not Found", path: "/404" });
  res.send("Page not found!");
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connection Established");
  app.listen(3000, () => console.log("server listening!"));
});

db.on("error", (err) => {
  console.log("connection error");
  console.log(err);
});
