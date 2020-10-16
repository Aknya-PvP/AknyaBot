const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/Helper");
class Remticket extends Command{
    constructor(client){
        super(client,HELPER.COMMAND.UTILS.REMTICKET);
    }

    async run(message,args){
        let querry =  !message.mentions.channels.first() ? args[0] :  message.mentions.channels.first() ? message.mentions.channels.first() : message.channel.name
        let channel = await message.guild.channels.cache.find(x => x.name.includes(querry) || x.name === querry.name )
        if(!channel) return message.channel.send("Ce channel n'est pas un ticket")
        this.client.ticket.removeTicket(message,channel)
    }
}

module.exports = Remticket;