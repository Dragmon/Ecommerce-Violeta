const mysql = require('mysql');

const {config} = require('../config/index');
const dbConfig =  {
    host:config.dbHost,
    user:config.dbUser,
    password:config.dbPassword,
    database:config.dbName,
}
let connection;
function handleConnection(){
    connection =  mysql.createConnection(dbConfig);
    
    connection.connect((err)=> {
        if (err) {
            console.error('[db erro]', err);
            setTimeout(handleConnection,2000);
        } else {
            console.log('DB connected');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnection();
        } else {
            throw err;
        }
    })

}
handleConnection();

function getAll(table, fields) {
    const field = fields ? fields.join() : '*';
    return new Promise((resolve, reject) => {
        const sql = `SELECT ${field} FROM ${table} WHERE ${table}.Delete=0`;
        connection.query(sql, (err, data) => {
            if (err) {
                return reject(err)
            }
            resolve(data);
        });
    });
}
module.exports = {
    getAll
}