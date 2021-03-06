const Command = require("../../Base/Command");
const {HELPER } = require("../../Utils/Constant/Helper");

class Ban extends Command{
    constructor(client){
        super(client,HELPER.COMMAND.UTILS.BAN);
    }

    async run(message,args){
        let member = message.mentions.members.first();
        const reason = args.slice(1).join(" ") || "Aucune raison";
        if(!this.client.utils.resolveUser(message, member, HELPER.COMMAND.KICK.permission)) return;

        member = message.guild.member(member);

        if(!member.kickable) return message.channel.send("Je ne peux pas kick un utilisateur");

        member.ban(reason).then(()=>{
            super.respond(`${member.user.username} a était ban par ${message.author.username} `)
        })
    }
}

module.exports = Ban;