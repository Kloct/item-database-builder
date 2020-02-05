var mysql = require('mysql'),
    util = require('util')
    
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '192.168.0.12',
    user: 'kloct',
    password: 'm3GMBU3uw6w8u6T5',
    database: 'trade_broker'
})

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if (connection) connection.release()

    return
})

pool.query = util.promisify(pool.query)
module.exports = pool