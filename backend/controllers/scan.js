const Ticket = require("../models/Ticket")



const ticketScan = async(req,res) => {
    try{
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        return res.status(404).json({msg : "ticket not found"})
    }
    if (ticket.scanned){
        return res.status(400).json({msg : "ticket already scanned"})
    }
    res.json(ticket)
    } catch(err){
        return res.status(500).json({msg : "smtg went wrong", err})
    }
}

const ticketUpdate = async(req,res) => {
    try{
        const ticket = await Ticket.findById(req.params.id)
        if(!ticket){
            return res.status(404).json({msg : "ticket not found"})
        }
        if (ticket.scanned){
            return res.status(400).json({msg : "ticket already scanned"})
        }
        ticket.scanned = true
        await ticket.save()
        res.json({msg : "ticket scanned successfully"})
        } catch(err){
            return res.status(500).json({msg : "err in updating", err})
        }
}

module.exports = {ticketScan, ticketUpdate}