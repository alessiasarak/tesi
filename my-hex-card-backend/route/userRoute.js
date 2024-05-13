const express = require("express");
const router = express.Router();

const userController = require("./../controller/userController");

router.get("/", (req, res) => {
    res.send("Default route");
});

router.get("/user/:idUser", userController.getUser);
router.put("/user/:idUser", userController.updateUserData);
router.put("/user/password/:idUser", userController.updateUserData);

module.exports = router;