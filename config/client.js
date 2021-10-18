const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'project_filosoftso',
    port: 3307
  }
});

module.exports = { knex }