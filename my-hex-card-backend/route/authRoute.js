const express = require("express");
const router = express.Router();

const authController = require("./../controller/authController");


router.get("/", (req, res) => {
    res.send("Default route");
});
router.post("/auth/register", authController.createUser);
router.post("/auth/login", authController.login);

module.exports = router;