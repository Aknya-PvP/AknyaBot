const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/Helper");
class Suggest extends Command{
    constructor(client){
        super(client,HELPER.COMMAND.UTILS.SUGGEST);
    }

    run(message,args){
        if(!args[0]){
            return message.channel.send('Merci d\'indiqué un texte')
        }

        this.client.suggest.add(message.author,args.join(' '))
        message.channel.send('La suggestion a etait posté')
    }
}

module.exports = Suggest;