const Client = require('./src/Base/Client'),
    config = require("./config"),
    Aknya = new Client(config)

Aknya.init()