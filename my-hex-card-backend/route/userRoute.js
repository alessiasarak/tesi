const express = require("express");
const router = express.Router();

const userController = require("./../controller/userController");

router.get("/", (req, res) => {
    res.send("Default route");
});

router.get("/user/:idUser", userController.getUser);
router.put("/user/:idUser", userController.updateUserData);
router.put("/user/password/:idUser", userController.updateUserData);

router.post("/user/reset", userController.forgotPassword);
router.put("/user/reset/:token", userController.setPassword);

module.exports = router;