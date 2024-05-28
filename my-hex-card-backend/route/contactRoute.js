const express = require("express");
const router = express.Router();

const contactController = require("./../controller/contactController");

const helper = require("./helper");

router.get("/", (req, res) => {
    res.send("Default route");
});

router.get("/contact", helper.authenticate, contactController.getAllContacts);
router.delete("/contact/:id", helper.authenticate, contactController.deleteContact);
router.post("/auth/create", helper.authenticate, contactController.createContact);

module.exports = router;