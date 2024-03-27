const asyncHandler = require("express-async-handler");
const Role = require("../model/role");
const Style = require("../model/style");
const User = require("../model/user");
const Card = require("../model/card");
const Link = require("../model/link");
const Email = require("../model/email");
const PhoneNumber = require("../model/phoneNumber");

exports.getCard = asyncHandler(async (req, res) => {
    console.log(req.params);

    res.send("TODO: get card correctly");
});