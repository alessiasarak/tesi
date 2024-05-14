const express = require('express');
const app = express();
const port = 3124;

const bodyParser = require("body-parser");
const cors = require("cors");
const useragent = require("express-useragent");

const session = require('express-session');
const cookieParser = require('cookie-parser');

//route
const userRoute = require("./route/userRoute");
const cardRoute = require("./route/cardRoute");
const contactRoute = require("./route/contactRoute");
const authRoute = require("./route/authRoute");

app.use(bodyParser.json({limit: '5mb'}));
app.use(cookieParser());

const corsOptions = {
  origin: function(origin, callback) {
    const allowedOrigins = ["http://127.0.0.1:4200", "http://localhost:4200"];
    if(!origin || allowedOrigins.includes(origin)){
      callback(null, true);
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(useragent.express());
app.get("/", (req, res) => {
  res.send(req.useragent);
});

// Configurazione della sessione
app.use(
  session({
    secret: "askdjflksajfd",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", userRoute);
app.use("/", cardRoute);
app.use("/", contactRoute);
app.use("/", authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})