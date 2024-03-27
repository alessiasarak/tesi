const asyncHandler = require("express-async-handler");

exports.createUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    res.send("TODO: User create correctly");
});

exports.login = asyncHandler(async (req, res) => {
    console.log(req.body);
    res.send("TODO: User login correctly");
});