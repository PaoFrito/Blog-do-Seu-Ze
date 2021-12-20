const { ConnectionError } = require('sequelize');
const Sequelize = require('sequelize');

const connection = new Sequelize(
    //DB Name
    'bsz_db', 
    //user
    'root', 
    //password
    '',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
