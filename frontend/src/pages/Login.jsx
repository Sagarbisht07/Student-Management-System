import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        const result = await login(email, password);
        if (result === true) {
            toast.success('Login Successful! Welcome back.');
            navigate('/');
        } else {
            const errorMsg = result || 'Login failed';
            toast.error(errorMsg);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="card" style={{ width: '400px' }}>
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Student Management System</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
                </form>
                <div style={{ marginTop: '15px', fontSize: '0.9em', color: '#666' }}>
                    <p>Demo Admin: admin@example.com / admin123</p>
                    <p>Demo User: user@example.com / user123</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
