
module.exports = {
    initCLI: () => {
        process.on('unhandledRejection', (reason, promise) => {
            console.log('async error', promise)
        });
        process.on('uncaughtException', (err, origin) => {
            console.log('uncaught error', err, origin, err.stack)
            process.exitCode = 1
        });
    }
}