const sharp = require("sharp");
const Ticket = require("../models/Ticket");
const generateQRCode = require("../utils/generateQRCode");
const sendEmail = require("../utils/sendEmail");
const path = require('path')
const fs = require('fs')
const {createCanvas} = require('canvas')
const bookTicket = async (req, res) => {
  const { name, email, branch, year } = req.body
  try {
    // Generate the QR code with ticket details


    // Save the ticket details in the database
    const ticket = new Ticket({ name, email, branch, year });
    await ticket.save();

    const qrdata = `${ticket._id}`
    const qrCode = await generateQRCode(qrdata);

    const ticketTemplatePath = path.join(__dirname, '../images/ticket-template.png')
    const ticketDir = path.join(__dirname, '../tickets')
    const outputTicketPath = path.join(__dirname, `../tickets/ticket-${name}.png`)
    
    if(!fs.existsSync(ticketDir)){
      fs.mkdirSync(ticketDir, {recursive : true})
    }
    const ticketTemplate = sharp(ticketTemplatePath)
    const qr = sharp(qrCode)

    const ticketmetaData = await ticketTemplate.metadata()
    const qrmetaData = await qr.metadata()

    const resizeQr = await qr.resize(330,330).toBuffer()
    const canvas = createCanvas(ticketmetaData.width, ticketmetaData.height)
    const context = canvas.getContext('2d')

    context.font = 'bold 30pt Arial'
    context.fillStyle = 'black'
    context.fillText(`Name : ${name}`, 550,50)
    context.fillText(`Branch : ${branch}`, 550,100)
    
    const textBuffer = canvas.toBuffer()

    await sharp(ticketTemplatePath)
      .composite([
        { input: resizeQr, top: 85, left: 200 }, 
        { input: textBuffer, top: 300, left: 320 }, 
      ])
      .toFile(outputTicketPath)


    // Email content
    const emailSubject = `Your Ticket for Navrang`;
    const emailBody = `
      Hi ${name},
      
      Thank you for booking a ticket for Navrang.      
      Please find your QR code attached to this email. You will need to present it at the event.

      Best regards,
      Event Team
    `;

    // Send email with the QR code
    await sendEmail(email, emailSubject, emailBody, outputTicketPath);

    // Respond with a success message
    res.status(201).json({ message: "Ticket booked successfully", ticket });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error booking ticket", error: error.message });
  }
};

module.exports = { bookTicket };
