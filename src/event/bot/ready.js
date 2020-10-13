module.exports = async (client)=>{
    //fetch all message on suggestion channel
    const channel = client.channels.cache.get('609349723727462401')
    await channel.messages.fetch({ limit: 100 });



}