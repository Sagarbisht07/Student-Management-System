const db = require('../config/db');

class Student {
    static getAll(callback) {
        db.all('SELECT * FROM students', [], callback);
    }

    static getById(id, callback) {
        db.get('SELECT * FROM students WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        const { name, email, age, course, status } = data;
        db.run(
            'INSERT INTO students (name, email, age, course, status) VALUES (?, ?, ?, ?, ?)',
            [name, email, age, course, status],
            function (err) {
                callback(err, this.lastID);
            }
        );
    }

    static update(id, data, callback) {
        const { name, email, age, course, status } = data;
        db.run(
            'UPDATE students SET name = ?, email = ?, age = ?, course = ?, status = ? WHERE id = ?',
            [name, email, age, course, status, id],
            callback
        );
    }

    static delete(id, callback) {
        db.run('DELETE FROM students WHERE id = ?', [id], callback);
    }
}

module.exports = Student;
