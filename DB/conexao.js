import mysql from 'mysql2/promise';

export default async function connect() {
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
      } else {
        global.poolConexoes = mysql.createPool({
            host: 'localhost',       
            user: 'root',
            password: '',
            database: 'backend',
            port: 3306,
            waitForConnections: true,   
            connectionLimit: 10,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });
        return await global.poolConexoes.getConnection();
    }
}
