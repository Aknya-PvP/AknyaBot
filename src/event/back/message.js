module.exports = (client,message) =>{
    if(message.channel.id === '609349723727462401'){
        if(client.config.owners.includes(message.author.id)){
            message.channel.send({
                embed:{
                    title:'Nouvelle suggestion de ' + message.author.username,
                    description : message.content,
                }
            }).then((msg)=>{
                msg.react('👍').then(()=>{
                    msg.react('👎').then(()=>{
                        msg.react('🤷')
                    })
                })
            })
        }
    }
}