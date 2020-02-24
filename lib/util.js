
const isNode = typeof process !== 'undefined'

if(isNode) {
    var {Console} = require('console')
    console = new Console({stdout: process.stderr, inspectOptions: {depth: 8}}) // jshint ignore:line
}

function log(...msg) {
    console.log(...msg)
}

function error(msg, ...args) {
    console.error(red(msg), ...args)
}

function red(text) {
    return '\x1b[31m' + text + '\x1b[0m'
}

module.exports = {
    log,
    error,
    isNode,
}