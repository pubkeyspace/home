// initialize a new FaunaDB database

var fs = require('fs')
var cli = require('../lib/cli')
var {log} = require('../lib/util')
var {call, connect, importGraphQLSchema} = require('../lib/fauna')
var {
    Collection, Function, Create, Lambda, Query, Update,
    Var, Now, Get, Select, Call, Identity, Delete, Role, CreateRole, // jshint ignore:line
    Match, Index, Login, CreateIndex, Concat, Paginate, Map // jshint ignore:line
} = require('faunadb/src/query')

const DefaultUsername = 'Anon'

/**
 * Add a role and default user.
 *
 * @param secret - admin key
 * @returns token for default user
 */
async function addRoles(secret) {

    await call(Delete(Role('UserRole')))
    await call(CreateRole({
        name: 'UserRole',
        membership: [{
            resource: Collection("User")
        }],
        privileges: [
            {
                resource: Collection('ChatMessage'),
                actions: { read: true, create: true },
            },
            {
                resource: Collection('User'),
                actions: { read: true },
            },
            {
                resource: Function('sayHello'),
                actions: { call: true },
            },
            {
                resource: Function('latestMessages'),
                actions: { call: true },
            },
            {
                resource: Function('addMessage'),
                actions: { call: true },
            },
        ]
    }))

    let user = await call(Get(Match(Index("userByName"),DefaultUsername)))
    if(! user) {
        user = await call(Create(Collection('User'), {
            data: { name: DefaultUsername },
            credentials: { password: "abc" },
        }))
    }
    return (await call(Login(user.ref,
        {password: 'abc'})
    )).secret;
}

async function defineUDFs() {
    await call(Update(Function("sayHello"), {
        body: Query(Lambda(["name"],
            Concat(["Hello ", Var("name")])
        ))
    }))
    await call(Update(Function("addMessage"), {
            body: Query(Lambda(["body"],
                Create(Collection('ChatMessage'), {
                    data: {
                        username: Select(['data', 'name'], Get(Identity())),
                        body: Var('body'),
                        time: Now(),
                    },
                }
            ))),
            role: "server",
        }))
    await call(CreateIndex({
        name: "latestMessages",
        source: Collection("ChatMessage"),
        values: [
            { field: ["data", "time"], reverse: true },
            { field: ["ref"] },
        ]
    }))
    // Map(Paginate(Match(Index('ChatMessageByTime')), { size: 10 }), Lambda('x', {"x": Var('x')}))
    await call(Update(Function("latestMessages"), {
        body: Query(Lambda([],
            Select('data', Map(
                Paginate(Match(Index('latestMessages')), { size: 10 }),
                Lambda(['time', 'ref'], Get(Var('ref')))
            ))
        )),
        role: "server",
    }))
}

async function setup() {
    const secret = await cli.askPass('What is your FaunaDB admin secret?')
    await connect(secret)

    const schema = fs.readFileSync(__dirname + '/schema.graphql').toString()
    await importGraphQLSchema(schema)
    const token = await addRoles()

    await defineUDFs()


    log(`
        Please set the following env on Netlify and locally.
        
            export FAUNADB_TOKEN=${token}
        
        Then run "make config" to update lib/env.js.
    `)
}

cli.initCLI()
setup()
