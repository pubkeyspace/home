
// Browserify and Webpack define a process.browser field
const isNode = typeof process !== 'undefined' && !process.browser
const devmode = process.env.NODE_ENV === 'development'

// if running in Node, replace console with a more verbose version
if(console.Console) {
    console = new console.Console({stdout: process.stderr, inspectOptions: {depth: 8}}) // jshint ignore:line
}

// fn (level, event) => void
let _hook = null

// install a logging hook
function installHook(hook) {
    _hook = hook
    return {
        clear: () => { _hook = null }
    }
}

function log(...msg) {
    if(_hook)
        _hook('info', msg)
    console.log(...msg)
}

function error(msg, ...args) {
    if(_hook)
        _hook('error', msg)
    console.error(red(msg), ...args)
}

function red(text) {
    return '\x1b[31m' + text + '\x1b[0m'
}

module.exports = {
    log,
    error,
    isNode,
    devmode,
    installHook
}