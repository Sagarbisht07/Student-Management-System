import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">SMS</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Dashboard</Link>
                <Link to="/students">Student List</Link>
                {user.role === 'admin' && (
                    <Link to="/students/new">Create Student</Link>
                )}
            </div>
            <div className="navbar-user">
                <span>{user.email} ({user.role})</span>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
