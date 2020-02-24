// faunadb wrapper

const faunadb = require('faunadb')
var net = require('../lib/net')
var {log, error} = require('../lib/util')

// global client and secret
let client
let secret

async function connect(_secret) {
    secret = _secret
    client = new faunadb.Client({secret: secret, timeout: 3000})
    log('ping', await client.ping())
}

let lastqid = 0

// call FaunaDB
// return null on error
async function call(query) {
    const qid = lastqid++
    try {
        log('fauna', qid, query)
        let r = await client.query(query)
        log('reply', qid, r)
        return r
    } catch (e) {
        error('error', qid, e.requestResult.responseContent)
        return null
    }
}

async function importGraphQLSchema(schema) {
    const r = await net.post('https://graphql.fauna.com/import?mode=merge', schema, {
        auth: 'Bearer ' + secret
        //auth: 'Basic fnADk-9qBxACFJFwDMycdLhnuxASVjcH7Ri8UnoC:kzg2:server:'
    })
    return r.text()
}

async function graphQuery(q, vars) {
    log('graphql', q, vars)
    const reply = await net.postJSON('https://graphql.fauna.com/graphql',
        { query: q, variables: vars },
        { auth: 'Bearer ' + secret },
    )
    if(reply.errors)
        error('error', reply)
    else
        log('reply', reply)

    return reply
}

// mark as GraphQL query - don't do anything special
function gql(strings, ...args) {
    return strings.reduce((accumulator, part, i) => {
        return accumulator + args[i - 1] + part
    })
}

module.exports = {
    connect,
    call,
    importGraphQLSchema,
    graphQuery,
    gql,
    q: faunadb.query,
}