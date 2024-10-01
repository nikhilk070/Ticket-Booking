const express = require("express");
const { bookTicket } = require("../controllers/ticketController");
const router = express.Router();

router.post("/book", bookTicket);

module.exports = router;
