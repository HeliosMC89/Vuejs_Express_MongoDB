const mongodb = require('mongodb');

async function loadCollection() {
  const client = await mongodb('mongodb://helios89:H140989@ds021343.mlab.com:21343/vue_expressjs', {
    useNewUrlParser: true
  });
  return client.db('vue_expressjs').collection('posts');
}

module.exports = loadCollection;
