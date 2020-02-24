
var {initCLI} = require('../lib/cli')
var {FAUNADB_TOKEN} = require('../lib/env')
var {call, connect, gql, graphQuery} = require('../lib/fauna')

var {Get, Select, Call, Function, Identity} = require('faunadb/src/query')

async function test() {
    await connect(FAUNADB_TOKEN)
    await call(Select(["data", "name"], Get(Identity())))

    await graphQuery(gql`{
        sayHello(name: "Jane")
    }`)

    await call(Call(Function('addMessage'), 'jo'))
    await graphQuery(gql`
        mutation newMsg {
            addMessage(body: "Hello Guys") {
                _id
            }
        }
    `)
    await graphQuery(gql`
        {
            latestMessages {
                username, time, body
            }
        }
    `)
}

initCLI()
test()
