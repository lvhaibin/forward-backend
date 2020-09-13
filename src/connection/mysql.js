import mysql from 'mysql';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'lvhaibin',
    database: 'Forward'
});

const query = (sql, val) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            else {
                connection.query(sql, val, (err, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(fields);
                    }
                    connection.release();
                })
            }
        });
    });
}

export default query;
