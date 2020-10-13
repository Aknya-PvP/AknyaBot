const {Client,Collection} = require('discord.js'),
    Logger = require('../Utils/Logger'),
    Utils = require('../Utils/Utils');

class Class extends Client{
    constructor(option) {
        super(option.client);

        this.config = option.config
        this.logger = new Logger()
        this.utils = new Utils
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

    }

    _evtLoad = () =>{

    }


}