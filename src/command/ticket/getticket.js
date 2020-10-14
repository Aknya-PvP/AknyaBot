const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/Helper");
class Getticket extends Command{
    constructor(client){
        super(client,HELPER.COMMAND.UTILS.GETTICKET);
    }

    run(message,args){
        if(!args[0] || isNaN(args[0])) return message.channel.send("Merci d'indiqué l'id du ticket")
        this.client.ticket.sendFile(message,args[0])
    }
}

module.exports = Getticket;