const express = require("express");
const { bookTicket } = require("../controllers/ticketController");
const { ticketScan, ticketUpdate } = require("../controllers/scan");
const router = express.Router();

router.post("/book", bookTicket);
router.get('/info/:id', ticketScan)
router.put('/info/:id', ticketUpdate)
module.exports = router;
