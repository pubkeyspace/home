var readline = require('readline')

async function promptPassword(msg) {
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

module.exports = {
    promptPassword: promptPassword,
}