const HELPER ={
    COMMAND:{
        UTILS:{
            SUGGEST:{
                name:"suggest",
                description:"Fait une suggestion",
                usage:"suggest <texte>",
                aliases:["s","suggestion"],
                coolDown:5000,
                category:'Utilitaire',
                permissions:["SEND_MESSAGES","MANAGE_MESSAGES"]
            },
            HELP:{
                name:"help",
                description:"Envoie la page d'aide",
                usage:"help <command>",
                aliases:["h"],
                coolDown:5000,
                category:'Général',
                permissions:["SEND_MESSAGES"]
            },
            TICKET:{
                name:"ticket",
                description:"Fait un ticket",
                usage:"ticket",
                aliases:["t"],
                coolDown:5000,
                category:'Ticket',
                permissions:["SEND_MESSAGES","MANAGE_GUILD"]
            },
            REMTICKET:{
                name:"remticket",
                description:"Supprime un ticket",
                usage:"remticket [channel]",
                aliases:["rt"],
                coolDown:5000,
                category:'Ticket',
                permissions:["SEND_MESSAGES","MANAGE_GUILD"]
            },
            GETTICKET:{
                name:"getticket",
                description:"Get les logs d'un ticket",
                usage:"getticket <id>",
                aliases:["gt"],
                coolDown:5000,
                category:'Ticket',
                permissions:["SEND_MESSAGES"]
            },
            KICK:{
                name:"kick",
                description:"Fait un kick",
                usage:"kick <username> <raison>",
                aliases:[],
                coolDown:5000,
                category:'Moderation',
                permissions:["SEND_MESSAGES","KICK_MEMBERS"]
            },
            BAN:{
                name:"ban",
                description:"Fait un ban",
                usage:"ban <username> <raison>",
                aliases:[],
                coolDown:5000,
                category:'Moderation',
                permissions:["SEND_MESSAGES","BAN_MEMBERS"]
            },
            ACCEPTSUGGEST:{
                name:"acceptsuggest",
                description:"Fait une suggestion",
                usage:"suggest <texte>",
                aliases:["as"],
                coolDown:5000,
                category:'Utilitaire',
                permissions:["SEND_MESSAGES","MANAGE_MESSAGES"]
            }
        }
    }
}

module.exports.HELPER = HELPER