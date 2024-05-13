const express = require("express");
const router = express.Router();

const contactController = require("./../controller/contactController");

router.get("/", (req, res) => {
    res.send("Default route");
});

router.get("/contact", contactController.getAllContacts);
router.post("/auth/create", contactController.createContact);

module.exports = router;