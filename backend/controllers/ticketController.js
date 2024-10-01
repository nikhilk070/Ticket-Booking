const Ticket = require("../models/Ticket");
const generateQRCode = require("../utils/generateQRCode");
const sendEmail = require("../utils/sendEmail");

const bookTicket = async (req, res) => {
  const { name, email, event, seat } = req.body;

  try {
    // Generate the QR code with ticket details
    const qrCode = await generateQRCode(
      `Ticket for ${name}, Event: ${event}, Seat: ${seat}`
    );

    // Save the ticket details in the database
    const ticket = new Ticket({ name, email, event, seat, qrCode });
    await ticket.save();

    // Email content
    const emailSubject = `Your Ticket for ${event}`;
    const emailBody = `
      Hi ${name},
      
      Thank you for booking a ticket for ${event}.
      Your seat number is: ${seat}.
      
      Please find your QR code attached to this email. You will need to present it at the event.

      Best regards,
      Event Team
    `;

    // Send email with the QR code
    await sendEmail(email, emailSubject, emailBody, qrCode);

    // Respond with a success message
    res.status(201).json({ message: "Ticket booked successfully", ticket });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error booking ticket", error: error.message });
  }
};

module.exports = { bookTicket };
