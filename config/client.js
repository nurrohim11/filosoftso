const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost', // localhost
    user : 'matius19:19',
    password : 'aksamemb_ppns',
    database : 'aksamemb_ppns',
    port: 3307
  }
});

module.exports = { knex }