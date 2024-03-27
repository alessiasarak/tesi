const asyncHandler = require("express-async-handler");

exports.createUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    res.send("User create correctly");
});