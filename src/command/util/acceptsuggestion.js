const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/Helper");
class Acceptsuggestion extends Command{
    constructor(client){
        super(client,HELPER.COMMAND.UTILS.ACCEPTSUGGEST);
    }

    run(message,args){
        if(!args[0]){
            return message.channel.send('Merci d\'indiqué un texte')
        }
        if(!this.client.config.owners.includes(message.author.id)){
            return message.channel.send('Vous n\'etes pas autorisé a utilise cette commandes')
        }
       this.client.suggest.acceptsuggestion(message,args[0])

    }
}

module.exports = Acceptsuggestion;