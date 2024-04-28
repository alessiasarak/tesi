const express = require("express");
const router = express.Router();

const cardController = require("./../controller/cardController");


router.get("/", (req, res) => {
    res.send("Default route");
});

//getters
router.get("/card/:id", cardController.getCardById);
router.get("/email/:id", cardController.getEmailsByCardId);
router.get("/phonenumber/:id", cardController.getPhoneNumbersByCardId);
router.get("/link/:id", cardController.getLinksByCardId);

router.put('/card/:id/:idUser', cardController.putCard);

router.post('/email/:id', cardController.postEmail);
router.post('/phonenumber/:id', cardController.postPhoneNumber);
router.post('/link/:id', cardController.postLink);

router.delete('/email/:id', cardController.deleteEmail);
router.delete('/phonenumber/:id', cardController.deletePhoneNumber);
router.delete('/link/:id', cardController.deleteLink);

module.exports = router;