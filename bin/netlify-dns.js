#!/usr/bin/env node

const netlify = require('netlify')
const {search} = require('jmespath')
const fs = require('fs')
const log = new console.Console({stdout: process.stderr, inspectOptions: {depth: 8}}).log

let client
let site_id

function login() {
    const homedir = require('os').homedir()

    const state = JSON.parse(fs.readFileSync('./.netlify/state.json'))
    const config = JSON.parse(fs.readFileSync(homedir + '/.netlify/config.json'))

    console.log(JSON.stringify(state))
    console.log(JSON.stringify(config))

    site_id = state['siteId']
    const user = Object.values(config.users)[0]

    console.log('site', site_id, 'user', user.email)

    client = new netlify(user.auth.token)
}


async function getdns() {
    let raw = await client.getDNSForSite({site_id: site_id})
    let out = search(raw, '[].{name:name, records:records[].[hostname, type, ttl, value]}')
    log('dns', out)
}

async function list() {
    let raw =await client.listSites()
    let out = search(raw, '[].{url: url}')
    log('sites', out)
}

login()
list()
getdns()

