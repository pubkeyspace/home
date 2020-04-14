// small wrappers around node.js
// see shims.browser.js

module.exports = {
    real_fetch: require('node-fetch'),
    shims_version: 'node',
}
