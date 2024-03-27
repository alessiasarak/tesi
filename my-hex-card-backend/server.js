const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
const cors = require("cors");
const useragent = require("express-useragent");

//route
const authRoute = require("./route/authRoute");

app.use(bodyParser.json());

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

app.use("/", authRoute);

/*app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/prova', (req, res) => {
  console.log("BUUU");
  res.send('YAAAAAY!')
})

app.get('/auth/register', (req, res) => {
  console.log("SERVER JS");
  console.log(req.body);


  res.send('YAAAAAY!')
})*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})