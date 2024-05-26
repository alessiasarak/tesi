const express = require("express");
const router = express.Router();

const cardController = require("./../controller/cardController");


router.get("/", (req, res) => {
    res.send("Default route");
});

router.put('/card/all-style/:idUser', cardController.putStyleAllCard);

//getters
router.get("/card/:id", cardController.getCardByToken);
router.get("/card/a-card/:idUser", cardController.getACardByUser);

router.get("/card/contact/:id", cardController.getCardsByContact);
router.get("/card/user/:id", cardController.getCardsByUser);

router.put('/card/update/:idUser/:token', cardController.putCard);
router.put('/card/update/style/:idUser/:token', cardController.putStyleCard);

router.post('/card/:idContact', cardController.postCard);
router.put('/card/name-surname/update/:token', cardController.updateNameSurname);

module.exports = router;