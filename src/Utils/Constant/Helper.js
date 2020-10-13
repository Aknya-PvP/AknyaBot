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
            }

        }
    }
}

module.exports.HELPER = HELPER