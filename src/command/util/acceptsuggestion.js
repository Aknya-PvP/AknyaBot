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

       let msg =  this.client.suggest.acceptsuggestion(message,args[0])
        console.log(msg)

    }
}

module.exports = Acceptsuggestion;