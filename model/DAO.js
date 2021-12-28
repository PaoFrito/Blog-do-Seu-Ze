const { ConnectionError } = require('sequelize');
const Sequelize = require('sequelize');

const connection = new Sequelize(
    //DB Name
    'bsz_db', 
    //user
    'root', 
    //password
    '',{
    //host
    host: 'localhost',
    //DB type
    dialect: 'mysql',
    //Timezone
    timezone: "-03:00"
});

module.exports = connection;
