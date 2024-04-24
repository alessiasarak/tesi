const express = require("express");
const router = express.Router();

const userController = require("./../controller/userController");


router.get("/", (req, res) => {
    res.send("Default route");
});

router.post("/auth/register", userController.createUser);
router.post("/auth/login", userController.login);

router.post("/create", userController.createUser);

module.exports = router;