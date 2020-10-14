const HELPER ={
    COMMAND:{
        UTILS:{
            SUGGEST:{
                name:"suggest",
                description:"Fait une suggestion",
                usage:"suggest <texte>",
                aliases:["s","suggestion"],
                coolDown:5000
            },
            HELP:{
                name:"help",
                description:"Envoie la page d'aide",
                usage:"help <command>",
                aliases:["h"],
                coolDown:5000
            },
            TICKET:{
                name:"ticket",
                description:"Fait un ticket",
                usage:"ticket",
                aliases:["t"],
                coolDown:5000
            },
            REMTICKET:{
                name:"remticket",
                description:"Supprime un ticket",
                usage:"remticket [channel]",
                aliases:["rt"],
                coolDown:5000
            },
            GETTICKET:{
                name:"getticket",
                description:"Get les logs d'un ticket",
                usage:"getticket <id>",
                aliases:["gt"],
                coolDown:5000
            },
        }
    }
}

module.exports.HELPER = HELPER