var readline = require('readline')

async function askPass(msg) {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });

    process.stdout.write(msg + '\n')
    return await new Promise(resolve => {
        rl.question(']> ', function (password) {
            resolve(password)
            rl.close()
        });
    })
}

function initCLI() {
    process.on('unhandledRejection', (reason, promise) => {
        console.log('async error', promise)
    });
    process.on('uncaughtException', (err, origin) => {
        console.log('uncaught error', err, origin, err.stack)
        process.exitCode = 1
    });
}

module.exports = {
    askPass,
    initCLI,
}