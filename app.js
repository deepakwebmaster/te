let express = require("express");
let app = express();
let mongoose = require("mongoose");
let morgan = require("morgan");
let bodyParser = require("body-parser");
let dotenv = require("dotenv");
let user = require("./routes/user");
let port = 9000;
dotenv.config();
// db options
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

// db url
const url = "mongodb://localhost/nodetask";

// db connection
mongoose
    .connect(url, option)
    .then(res => console.log("connection success"))
    .catch(err => console.log(err));

//don't show the log
if (process.env.NODE_ENV !== "test") {
    //use morgan for log
    app.use(morgan("combined"));
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.get("/", (req, res) => {
    res.json("welcome to my repo");
});
app.route("/user")
    .get(user.getUsers)
    .post(user.postUser);

app.route("/user/:id")
    .get(user.getUser)
    .delete(user.deleteUser)
    .put(user.updateUser);

// assign port
app.listen(port, () => {
    console.log(`server is running on port:${port}`);
});

module.exports = app;
