//SETUP
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var port = process.env.PORT || 3001;
var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);

// figure this out for Windows
if (!process.env.NODE_ENV) {
//   var config = require("./config.js");
  var config = require("./config.js");
}

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Mongoose db setup
var mongoUser = process.env.DB_USERNAME || config.getMongoUser();
var mongoPass = process.env.DB_PASSWORD || config.getMongoPass();

mongoose.connect(`mongodb://${mongoUser}:${mongoPass}@ds131340.mlab.com:31340/libru`);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection eror:"));
db.once("open", function() {
  console.log("MongoDB Database connected");
});

//passport setup
app.use(
  session({
    secret: "123secret",
    saveUninitialized: true /*process.env.PASSPORT_SECRET*/,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());

// COMMENTED OUT FOR DEV SO IT DOESN'T LOAD THE BUILD FILE
// app.use(express.static(__dirname + "/../build"));
// app.use(express.static(__dirname + "build"));

//ROUTES
app.use("/api/resource", require("./api/resource"));
app.use("/api/add-resource", require("./api/add-resource"));
app.use("/api/all-resources", require("./api/all-resources"));
// app.use("/api/signin", require("./routes/signin"));
// app.use("/api/signout", require("./routes/signout"));

// CATCHALL FOR SERVING REACT BUNDLE
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/../build/index.html"));
// });

//launch
app.listen(port, function() {
  console.log(`DrawDash Server listening on port ${port}!`);
});
