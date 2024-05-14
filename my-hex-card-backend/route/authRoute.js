const express = require("express");
const router = express.Router();

const authController = require("./../controller/authController");

router.get("/", (req, res) => {
    res.send("Default route");
});

router.post("/auth/register/:token", authController.registerUser);
router.post("/auth/login", authController.login);
router.post("/auth/login/:token", authController.loginWithToken);
router.get("/auth/logout", authController.logout);

module.exports = router;