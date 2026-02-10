const db = require('./config/db');
const User = require('./models/userModel');

const seedUsers = async () => {
    try {
        const adminEmail = 'admin@example.com';
        const userEmail = 'user@example.com';

        const existingAdmin = await User.findByEmail(adminEmail);
        if (!existingAdmin) {
            await User.create({ email: adminEmail, password: 'admin123', role: 'admin' });
            console.log('Admin user created: admin@example.com / admin123');
        } else {
            console.log('Admin user already exists.');
        }

        const existingUser = await User.findByEmail(userEmail);
        if (!existingUser) {
            await User.create({ email: userEmail, password: 'user123', role: 'user' });
            console.log('Regular user created: user@example.com / user123');
        } else {
            console.log('Regular user already exists.');
        }

    } catch (err) {
        console.error('Error seeding users:', err);
    }
};

seedUsers();
