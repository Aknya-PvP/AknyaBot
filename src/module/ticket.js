const moment = require('moment')
const fs = require('fs')
class Ticket {
    constructor(client) {
        this.client = client
    }

    async createTicket(client, message, args) {

        let json = './src/asset/JSON/ticket.json'
        let backup = './src/asset/JSON/backup.json'

        fs.readFile(json, 'utf8', async function (err, data) {
            try {
                let parsedData = await JSON.parse(data.toString())
                parsedData.id++
                let currentTicket = {
                    TicketID: parsedData.id,
                    author: {
                        username: message.author.username,
                        id: message.author.id
                    },
                    subject: !args[0] ? 'Pas de sujet' : args.join(' ')
                }
                parsedData.current.push(currentTicket)
                message.guild.channels.create(`ticket-${parsedData.id}`, {
                    permissionOverwrites: [
                        {
                            id: message.author,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY']
                        },
                        {
                            id: client.user,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY']
                        },
                        {
                            id: message.guild.roles.everyone,
                            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                        }
                    ]
                }).then((channel) => {
                    channel.send('Un ticket a etait créer par ' + message.author.username)
                    channel.setParent('635143643992293404')
                    console.log(channel)
                    message.channel.send("Ticket crée " + channel.name + ' Pour sujet ' + args.join(' '))
                    let newdata = JSON.stringify(parsedData, null, 4)
                    fs.writeFile(json, newdata, (err) => {
                        console.log('Data sauvegardé\nBackup en cours')
                        fs.writeFile(backup, newdata, (err) => {
                            console.log('backup suavegardé')
                        })
                    })
                })
            } catch (err) {
                console.log(err)
                console.error('Erreur lors de la lecture des donnée JSON, Recovery mode en cours')
                fs.readFile(backup, 'utf8', async function (err, data) {
                    fs.writeFile(json, data, (err) => {
                        console.log('Backup push')
                    })
                })

            }
        })

    }

    removeTicket(message, channel) {
        let ID = channel.name.split('-')[1]
        let newCurrent = []
        channel.send('Fermeture du ticket').then(() => {
            let json = './src/asset/JSON/ticket.json'
            let backup = './src/asset/JSON/backup.json'

            fs.readFile(json, 'utf8', async function (err, data) {
                let parsData = JSON.parse(data.toString())
                for (const current of parsData.current) {
                    if (current.TicketID.toString() === ID) {
                        channel.messages.fetch().then(async (messageSave) => {
                            let final = {
                                content: current,
                                user: [],
                                sentance: []
                            }
                            messageSave.array().map(msg => {
                                console.log(msg.author.username)
                                if (!final.user.includes(msg.author.username)) {

                                    final.user.push(msg.author.username)
                                }
                            })

                            const pushArray = async (data) => final.sentance.push(data)
                            const time = (timestamp) => moment(timestamp).format("DD/MM/YYYY - HH:mm:ss")


                            for (const msg of messageSave.array().reverse()) {
                                await pushArray(`${time(msg.createdTimestamp)} ${msg.author.username} : ${msg.content}`)
                            }
                            let newData = JSON.stringify(final, null, 4)
                            fs.writeFile(`./src/asset/Logs/${channel.name}.json`, newData, async function (err) {
                                channel.send('Logs sauvegardé')
                                await message.channel.send('Le channel a etait supprimé')
                                await message.guild.channels.cache.get('616266903400218639').send(`Le ${channel.name} a été archiver`, {
                                    files: [`./src/asset/Logs/${channel.name}.json`]
                                })

                            })
                        })

                    } else {
                        newCurrent.push(current)
                    }
                }
                parsData.current = newCurrent
                let newData = JSON.stringify(parsData, null, 4)
                fs.writeFile(json, newData, async function (err) {
                    fs.writeFile(backup, newData, (err) => {
                        console.log('backup suavegardé')
                    })
                    channel.send('Le JSON des ticket et mis a jour').then(() => {
                        channel.delete()
                    })
                })
            })

        })
    }

    sendFile(message, id) {
        fs.readdir("./src/asset/Logs", (err, files) => {
            for (const file of files) {
                let scrap = file.split('.')[0]
                if (`ticket-${id}` === scrap) {
                    fs.readFile(`./src/asset/Logs/${file}`, 'utf8', async function (err, data) {
                        let parseData = JSON.parse(data.toString())
                        await message.channel.send(`Voici les logs du ticket ${parseData.content.TicketID} par ${parseData.content.author.username}`, {
                            files: [`./src/asset/Logs/${file}`]
                        })
                    })
                }
            }
        })
    }

    recoveryJSON() {
        let json = './src/asset/JSON/ticket.json'
        let backup = './src/asset/JSON/backup.json'
        fs.readFile(backup, 'utf8', function (err, data) {
            fs.writeFile(json, data, (err) => {
                console.log('Backup push')
            })
        })
        this.loadJSON()
    }
}

module.exports = Ticket