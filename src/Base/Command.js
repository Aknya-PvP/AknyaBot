class Command {
    constructor(client, options) {
        this.client = client;
        this.help = {
            name: options.name || null,
            description: options.description || "Pas d'information donnée.",
            usage: options.usage ?  `${this.client.config.prefix}${options.usage}`: "",
            category: options.category || "Information",
        };
        this.conf = {
            cooldown: options.cooldown || 1000,
            aliases: options.aliases || [],
        };
        this.cooldown = new Set();
    }

    startCooldown = (user) => {
        if(!user) return console.log("Pas d'utilisateur donné")
        this.cooldown.add(user);
        setTimeout(() => {
            this.cooldown.delete(user);
        }, this.conf.cooldown);
    }

    setMessage= (message) => {
        this.message = message;
    }
}

module.exports = Command;
