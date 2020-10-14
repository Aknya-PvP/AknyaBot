const {Client,Collection} = require('discord.js'),
    Logger = require('../Utils/Logger'),
    Suggest = require('../module/suggest'),
    Ticket = require('../module/ticket'),
    Utils = require('../Utils/Utils');
    const {readdir,readFile,writeFile} = require('fs')

class Aknya extends Client{
    constructor(option) {
        super(option.client);
        ["commands","aliases","cooldowns"].forEach(x=>this[x] = new Collection());

        this.config = option.config
        require("../Utils/errorHandler")(this.client);
        this.logger = new Logger()
        this.suggest = new Suggest(this)
        this.ticket = new Ticket(this)
        this.utils = new Utils()
    }

    init = () => {
        this.initJSON()
        this._cmdLoad()
        this._evtLoad()
        this._connect()

    }

    initJSON = () =>{
        let json = './src/asset/JSON/ticket.json'
        let backup = './src/asset/JSON/backup.json'
        readFile(json,'utf8',function (err,data) {
            try {
                if(!data){
                    console.log('Donnée vide')

                    readFile(backup,'utf8',function (err,data) {
                        if(!data) return console.log("Backup vide")
                        writeFile(json,data,(err) =>{
                            console.log('Backup push')

                        })
                    })
                    return false
                }
                let parsedData = JSON.parse(data.toString())
                if (parsedData.id === undefined) {
                    let rawData = {
                        id: 0,
                        current: []
                    }
                    let StringifyData = JSON.stringify(rawData, null, 4);
                    writeFile(json, StringifyData, (err) => {
                        console.log('Data implemented')

                    })
                }
                readFile(json,'utf8',function (err,data) {
                    writeFile(backup,data,(err) =>{
                        console.log('Data backup')
                    })
                })
                return true
            } catch (err) {
                console.log(err)
                console.error('Erreur lors de la lecture des donnée JSON, Recovery mode en cours')

                readFile(backup,'utf8',function (err,data) {
                    if(!data) return console.log("Backup vide")
                    writeFile(json,data,(err) =>{
                        console.log('Backup push')
                        return false

                    })
                })
            }
        })
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