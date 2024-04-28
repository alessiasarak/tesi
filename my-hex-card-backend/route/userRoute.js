const express = require("express");
const router = express.Router();

const userController = require("./../controller/userController");


router.get("/", (req, res) => {
    res.send("Default route");
});

router.post("/auth/register", userController.createUser);
router.post("/auth/login", userController.login);
router.get("/auth/logout", userController.logout);

router.post("/create", userController.createUser);

router.get("/user/:idUser", userController.getUser);
router.put("/user/:idUser", userController.updateData);
router.put("/user/password/:idUser", userController.updateData);

module.exports = router;