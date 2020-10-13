const {Client,Collection} = require('discord.js'),
    Logger = require('../Utils/Logger'),
    Suggest = require('../module/suggest'),
    Utils = require('../Utils/Utils');
    const {readdir} = require('fs')

class Aknya extends Client{
    constructor(option) {
        super(option.client);
        ["commands","aliases","cooldowns"].forEach(x=>this[x] = new Collection());

        this.config = option.config
        require("../Utils/errorHandler")(this.client);
        this.logger = new Logger()
        this.suggest = new Suggest(this)
        this.utils = new Utils()
    }

    init = () =>{
        this._cmdLoad();
        this._evtLoad();
        this._connect();
    }
    _connect = () =>{
        super.login(this.config.token)
    }

    _cmdLoad = () =>{
        readdir("./src/command/", (err, files) => {
            if (err) this.emit("error", err);
            for (const dir of files) {
                readdir(`./src/command/${dir}/`, (err, commands) => {
                    if (err) this.emit("error", err);
                    for (const com of commands) {
                        try {
                            if (!com) return;
                            const command = new (require(`../command/${dir}/${com}`))(this);
                            this.commands.set(command.help.name, command);
                            command.conf.aliases.forEach(a => this.aliases.set(a, command.help.name));
                            this.logger.info(`${com} chargé`)

                        } catch (e) {
                            this.emit("error", `${com} n"a pas chargé ${e.message}`)
                        }
                    }

                })
            }
        });
    }

    _evtLoad = () =>{
        readdir("./src/event", (err, files) => {
            if (!files) return;
            if (err) this.emit("error", err);
            for (const dir of files) {
                readdir(`./src/event/${dir}`, (err, file) => {
                    if (!file) return;
                    if (err) this.emit("error", err);
                    for (const evt of file) {
                        try {
                            if (!evt) return;
                            const event =require(`../event/${dir}/${evt}`);
                            console
                            this.logger.info(`${evt} chargé`);
                            super.on(evt.split(".")[0], event.bind(null, this));
                        } catch (e) {
                            this.emit("error", `${evt} n"a pas chargé ${e.stack}`)
                        }
                    }
                })
            }
        });
    }


}

module.exports = Aknya