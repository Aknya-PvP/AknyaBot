class Suggest {
    constructor(client) {
        this.client = client
    }

    add(author,content){
        let channel = this.client.channels.cache.get('609349723727462401')

        channel.send({
            embed:{
                title:'Nouvelle suggestion de ' + author.username,
                description : content,
            }
        }).then((msg)=>{
            this.addReaction(msg)
        })
    }

    acceptsuggestion(message,msgID) {
        this.client.channels.cache.get('609349723727462401').messages.fetch(msgID).then((msg) => {
            console.log(msg.embeds[0].title.split(' ').slice(3).join(' '))
            message.guild.channels.cache.get("766648796146171944").send({
                embed: {
                    title: `Suggestion de ${msg.embeds[0].title.split(' ').slice(3).join(' ')} accepté`,
                    description: msg.embeds[0].description

                }
            }).then(r =>{
                msg.edit({
                    embed: {
                        title: `Suggestion de ${msg.embeds[0].title.split(' ').slice(3).join(' ')} accepté`,
                        description: msg.embeds[0].description
                    }
                }).then(()=>{
                    msg.reactions.removeAll()
                })
            })
        })
    }

    remove(id){
        return new Promise((resolve, reject) => {
            let msg = this.client.channels.cache.get('609349723727462401').messages.fetch(id)
            try {
                msg.delete()
                resolve("Le message a etait supprimé")
            }catch (e) {
                reject("Le message n'as pas etait supprimé")
            }
        })

    }

    addReaction(msg){
        msg.react('👍').then(()=>{
            msg.react('👎').then(()=>{
                msg.react('🤷')
            })
        })
    }

    removeReaction(id){
        return new Promise((resolve, reject) => {
            let msg = this.client.channels.cache.get('609349723727462401').messages.fetch(id).cache
                msg.reactions.removeAll().then(r => {
                    resolve("Les reaction du message ont etait supprimé")
                }).catch(() =>{
                    reject("Les reaction du message n'ont pas etait supprimé")
                })
        })
    }
}


module.exports = Suggest