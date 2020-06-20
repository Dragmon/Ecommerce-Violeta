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
    let field =  formatFields(fields);
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
function findId(table, conditions, fields) {
    const field = fields ? fields.join() : '*';
    return new Promise((resolve, reject) => {
        const sql = `SELECT ${field} FROM ${table} WHERE ${table}.Delete=0 ${createConditions(conditions)}`;
        connection.query(sql, (err, data) => {
            if (err) {
                return reject(err)
            }
            resolve(data);
        });
    });
}
function createConditions(conditions){
    if (conditions) {
        let string = '';
        Object.entries(conditions).forEach(([key, value]) => {
            string += ` AND ${key}='${value}'`;
        });
        return string;
    } else {
        return '';
    }
}
function formatFields(fields) {
    if (fields) {
        if (typeof fields === 'object') {
            let field = '';
            let i=0;
            Object.entries(fields).forEach(([key, value]) => {
                if (i){
                    field += ',';
                }
                field += ` ${key} AS ${value}`;
                i++;
            })
            return field;
        } else if (Array.isArray(fields)) {
            return fields.join();
        }
    }
    return '*';
}
module.exports = {
    getAll,
    findId
}