const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    create: async ({ email, password, role }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
                [email, hashedPassword, role],
                function (err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, email, role });
                }
            );
        });
    },

    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (err, row) => {
                    if (err) return reject(err);
                    resolve(row);
                }
            );
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT id, email, role FROM users WHERE id = ?',
                [id],
                (err, row) => {
                    if (err) return reject(err);
                    resolve(row);
                }
            );
        });
    }
};

module.exports = User;
