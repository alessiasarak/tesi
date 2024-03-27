const express = require("express");
const router = express.Router();

const cardController = require("./../controller/cardController");


router.get("/", (req, res) => {
    res.send("Default route");
});

router.get("/:id", cardController.getCard);

module.exports = router;