const express = require("express");
const router = express.Router();

const cardController = require("./../controller/cardController");


router.get("/", (req, res) => {
    res.send("Default route");
});

//getters
router.get("/card", cardController.getAllCards);
router.get("/card/:id", cardController.getCardById);
router.get("/card/user/:id", cardController.getCardByUser);

router.put('/card/:id/:idUser', cardController.putCard);
router.put('/card/style/:id/:idUser', cardController.putStyleCard);

module.exports = router;