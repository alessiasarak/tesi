const express = require("express");
const router = express.Router();

const userController = require("./../controller/userController");


router.get("/", (req, res) => {
    res.send("Default route");
});

router.post("/auth/create", userController.createContact);

router.post("/auth/register/:token", userController.registerUser);
router.post("/auth/login", userController.login);
router.get("/auth/logout", userController.logout);

router.post("/create", userController.createContact);

router.get("/user/:idUser", userController.getUser);
router.get("/contact", userController.getAllContacts);
router.put("/user/:idUser", userController.updateUserData);
router.put("/user/password/:idUser", userController.updateUserData);

module.exports = router;