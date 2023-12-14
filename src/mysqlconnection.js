
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proyecto'
});


db.connect((err) => {
    if(err) {
        console.log('Hubo un error');
        throw err;
    } else {
        console.log('Conectado a la base de datos');
    }
});

module.exports = db;