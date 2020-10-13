const {Collection} = require("discord.js");
module.exports = async (client,message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(client.config.prefix)) return;
    const args = message.content.split(' ').slice(1);

    const command = message.content.split(' ')[0].slice(client.config.prefix.length);
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;

    if (!client.cooldowns.has(cmd.help.name)) {
        client.cooldowns.set(cmd.help.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(cmd.help.name);
    const cdAmount = (cmd.help.cooldown || 5) * 1000;
    //if (!client.config.owner.includes(message.author.id)) {
        if (tStamps.has(message.author.id)) {
            const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

            if (timeNow < cdExpirationTime) {
                let timeLeft = (cdExpirationTime - timeNow) / 1000;
                return message.reply(`merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${cmd.help.name}\`.`);
            }
        }
        tStamps.set(message.author.id, timeNow);
        setTimeout(() => tStamps.delete(message.author.id), cdAmount);
    //}

    if (cmd.help.category.toLowerCase() === 'owner' && !client.config.owner.includes(message.author.id)) return message.channel.send('Vous devez etre dévellopeur du bot');

    cmd.setMessage(message);
    try {
        cmd.run(message, args);
    } catch (e) {
        client.emit('error', e.stack, message.channel, cmd)
    }

    if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id);
}