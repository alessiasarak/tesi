const express = require('express');
const app = express();
const port = 3124;

const bodyParser = require("body-parser");
const cors = require("cors");
const useragent = require("express-useragent");

const session = require('express-session');
const cookieParser = require('cookie-parser');

const MemoryStore = require('memorystore')(session);

//route
const userRoute = require("./route/userRoute");
const cardRoute = require("./route/cardRoute");
const contactRoute = require("./route/contactRoute");
const authRoute = require("./route/authRoute");

app.use(bodyParser.json({limit: '5mb'}));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "5mb",
  })
);

app.use(cookieParser());

const corsOptions = {
  origin: function(origin, callback) {
    const allowedOrigins = ["http://localhost:4200", "http://localhost:4200", "http://localhost:9876", "http://localhost:9876"];
    if(!origin || allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionSuccessStatus: 200,
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(useragent.express());
app.get("/", (req, res) => {
  res.send(req.useragent);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Custom-Header");
  
  next();
});

// Configurazione della sessione
app.use(
  session({
    secret: "askdjflksajfd",
    resave: true,
    saveUninitialized: true,
    store: new MemoryStore({ checkPeriod: 86400000 }),
    cookie: { maxAge: 3600000, secure: false, httpOnly: true, sameSite: "strict" } // 60 minuti
  })
);

app.use((req, res, next) => {
  console.log(req.session.id)
  next();
});

app.use("/", userRoute);
app.use("/", cardRoute);
app.use("/", contactRoute);
app.use("/", authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})