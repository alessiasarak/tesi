const asyncHandler = require("express-async-handler");

exports.getCard = asyncHandler(async (req, res) => {
    console.log(req.params);
    res.send("TODO: get card correctly");
});