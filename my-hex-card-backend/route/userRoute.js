const express = require("express");
const router = express.Router();

const userController = require("./../controller/userController");

const helper = require("./helper");

router.get("/", (req, res) => {
    res.send("Default route");
});

router.get("/user/:idUser", helper.authenticate, userController.getUser);
router.put("/user/:idUser", helper.authenticate, userController.updateUserData);
router.put("/user/password/:idUser", helper.authenticate, userController.updateUserData);

router.post("/user/reset", userController.forgotPassword);
router.put("/user/reset/:token", userController.setPassword);

module.exports = router;