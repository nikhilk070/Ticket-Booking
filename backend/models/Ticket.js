const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    event: { type: String, required: true },
    seat: { type: String, required: true },
    qrCode: { type: String, required: true },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
