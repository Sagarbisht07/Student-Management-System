const Student = require('../models/studentModel');

exports.getAllStudents = (req, res) => {
    Student.getAll((err, rows) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json(rows);
    });
};

exports.getStudentById = (req, res) => {
    const { id } = req.params;
    Student.getById(id, (err, row) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (!row) return res.status(404).json({ message: 'Student not found' });
        res.json(row);
    });
};

exports.createStudent = (req, res) => {
    const { name, email, age, course, status } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email are required.' });

    Student.create({ name, email, age, course, status }, (err, id) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err.message });
        res.status(201).json({ id, name, email, age, course, status });
    });
};

exports.updateStudent = (req, res) => {
    const { id } = req.params;
    const { name, email, age, course, status } = req.body;

    Student.update(id, { name, email, age, course, status }, (err) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json({ message: 'Student updated successfully' });
    });
};

exports.deleteStudent = (req, res) => {
    const { id } = req.params;
    Student.delete(id, (err) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json({ message: 'Student deleted successfully' });
    });
};
