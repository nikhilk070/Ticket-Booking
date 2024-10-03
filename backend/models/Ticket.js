const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: String, required: true },
    qrCode: { type: String},
    scanned: {type: Boolean, default: false}
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
