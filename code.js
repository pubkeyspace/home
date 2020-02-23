var faunadb = require('faunadb'),
    q = faunadb.query

function init() {
  var e = document.createElement('div')
  e.innerHTML = 'page loaded'
  document.getElementById('log').appendChild(e)



    var client = new faunadb.Client({ secret: 'YOUR_FAUNADB_SECRET' });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
