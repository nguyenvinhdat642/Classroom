const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'classroom',
});

connection.connect((err) => {
    if (err) {
        console.error('Không thể kết nối đến MySQL:', err);
    } else {
        console.log('Kết nối đến MySQL thành công!');
    }
});

class User {
    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    static async create({ email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = 'user';
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO Users (email, password, role) VALUES (?, ?, ?)', [email, hashedPassword, role], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static async comparePassword(inputPassword, hashedPassword) {
        return await bcrypt.compare(inputPassword, hashedPassword);
    }
}

module.exports = User;
