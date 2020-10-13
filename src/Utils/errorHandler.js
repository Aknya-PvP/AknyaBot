module.exports = async (client) => {

    process.on('unhandledRejection', err =>{
        if(err) {
            if(err.stack.includes('[TOKEN_INVALID]') ){
                console.log("Mauvais token")
            }else if(err.stack.includes('Missing Permissions')){
                console.log('Erreur de permission');
            }else if (err.stack.includes(' getaddrinfo ENOTFOUND discordapp.com')){
                console.log('Impossible to get information from discord');
                client.destroy();
                process.exit(0);
            }else{
                console.log(err)
            }
        }
    });

    process.on('uncaughtException', err =>{
        if (err.stack.includes('Promise { <pending> }')) return;
        console.log(err.stack)
    });

    process.on('warning', (err) => {
        console.log(err.stack)
    })
};