// initialize a new FaunaDB database

var util = require('../lib/util')
var net = require('../lib/net')
var faunadb = require('faunadb')
var promptPassword = require('../lib/prompt').promptPassword

const DefaultUsername = 'Anon';

/**
 * Creates a basic schema and default user.
 *
 * @param secret - admin key
 * @returns token for default user
 */
async function initFaunaDB(secret) {
    var q = faunadb.query
    var client = new faunadb.Client({ secret: secret, timeout: 3000 })

    console.log('ping: ', await client.ping())

    async function call(query) {
        try {
            let r = await client.query(query)
            console.log('reply', r)
            return r
        } catch (e) {
            console.log('error', e.toString())
            return null
        }
    }

    await call(q.CreateCollection({ name: 'ChatLog' }));
    await call(q.CreateCollection({ name: 'User' }));
    await call(q.CreateIndex({
        name: 'userByName',
        permissions: { read: "public"},
        source: q.Collection("User"),
        terms: [{field: ["data", "name"]}],
        unique: true,
    }))
    await call(q.Delete(q.Role('User')))
    await call(q.CreateRole({
            name: 'User',
            membership: {
                resource: Collection("User")
            },
            privileges: {
                resource: q.Collection('ChatLog'),
                actions: { read: true, write: true },
            },
        }))
    };

    let user = await call(q.Get(q.Match(q.Index("userByName"),DefaultUsername)))
    if(! user) {
        user = await call(q.Create(q.Collection('User'), {
            data: { name: DefaultUsername },
            credentials: { password: "abc" },
        }))
    }
    return call(q.Login(user.ref,
        {password: 'abc'})
    ).secret;
}

async function setup() {
    const secret = promptPassword('What is your FaunaDB admin secret?')

    // import GraphQL schema
    const schema = require('./schema.gql')
    await net.postJSON('/import?mode=merge', schema, {
        auth: 'Bearer ' + secret
    })

    const token = await initFaunaDB(secret)

    console.log(`
        Please set the following env on Netlify and locally.
        
            export FAUNADB_TOKEN=${token}
        
        Then run "make config" to update lib/env.js.
    `)
}

util.initCLI()
setup().then(r => console.log("DONE"))
