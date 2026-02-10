import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="container">
            <div className="card">
                <h1>Welcome, {user.email}!</h1>
                <p>Role: {user.role}</p>
                <div style={{ marginTop: '20px' }}>
                    <p>Use the navigation menu to manage students.</p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <Link to="/students" className="btn btn-primary">View Students</Link>
                        {user.role === 'admin' && (
                            <Link to="/students/new" className="btn btn-primary">Add Student</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
