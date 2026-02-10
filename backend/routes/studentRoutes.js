const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Admin + User can read
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);

// Admin only operations
router.post('/', roleMiddleware('admin'), studentController.createStudent);
router.put('/:id', roleMiddleware('admin'), studentController.updateStudent);
router.delete('/:id', roleMiddleware('admin'), studentController.deleteStudent);

module.exports = router;
