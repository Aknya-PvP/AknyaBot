const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/Helper");
class Ticket extends Command{
    constructor(client){
        super(client,HELPER.COMMAND.UTILS.TICKET);
    }

    run(message,args){
        this.client.ticket.createTicket(this.client,message,args)
    }
}

module.exports = Ticket;