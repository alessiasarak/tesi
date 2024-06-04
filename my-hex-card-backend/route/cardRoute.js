const express = require("express");
const router = express.Router();

const cardController = require("./../controller/cardController");

const helper = require("./helper");

router.get("/", (req, res) => {
    res.send("Default route");
});

router.put('/card/all-style/:idUser', helper.authenticate, cardController.putStyleAllCard);

//getters
router.get("/card/:id", cardController.getCardByToken);
router.get("/card/a-card/:idUser", helper.authenticate, cardController.getACardByUser);

router.get("/card/contact/:id", helper.authenticate, cardController.getCardsByContact);
router.get("/card/user/:id", helper.authenticate, cardController.getCardsByUser);

router.put('/card/update/:idUser/:token', helper.authenticate, cardController.putCard);
router.put('/card/update/style/:idUser/:token', helper.authenticate, cardController.putStyleCard);

router.post('/card/:idContact', helper.authenticate, cardController.postCard);
router.put('/card/name-surname/update/:token', helper.authenticate, cardController.updateNameSurname);
router.put('/card/associate/:idUser', helper.authenticate, cardController.associate);

router.delete('/card/:token', helper.authenticate, cardController.delete);

module.exports = router;