import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await api.get('/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await api.delete(`/students/${id}`);
                setStudents(students.filter(student => student.id !== id));
            } catch (error) {
                console.error('Error deleting student:', error);
                alert('Failed to delete student');
            }
        }
    };

    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(search.toLowerCase()) || 
        student.email.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Student List</h2>
                {user.role === 'admin' && (
                    <Link to="/students/new" className="btn btn-primary">Create New Student</Link>
                )}
            </div>

            <div className="search-bar" style={{ marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Search by name or email..." 
                    className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="card" style={{ padding: '0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
                            <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Age</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Course</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(student => (
                            <tr key={student.id} style={{ borderBottom: '1px solid #ececec' }}>
                                <td style={{ padding: '12px' }}>{student.id}</td>
                                <td style={{ padding: '12px' }}>{student.name}</td>
                                <td style={{ padding: '12px' }}>{student.email}</td>
                                <td style={{ padding: '12px' }}>{student.age}</td>
                                <td style={{ padding: '12px' }}>{student.course}</td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{ 
                                        padding: '5px 10px', 
                                        borderRadius: '15px', 
                                        backgroundColor: student.status === 'Active' ? '#d4edda' : '#f8d7da',
                                        color: student.status === 'Active' ? '#155724' : '#721c24',
                                        fontSize: '12px'
                                    }}>
                                        {student.status}
                                    </span>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        <Link to={`/students/${student.id}`} className="btn" style={{ background: '#17a2b8', color: 'white', padding: '5px 10px', fontSize: '12px' }}>View</Link>
                                        {user.role === 'admin' && (
                                            <>
                                                <Link to={`/students/edit/${student.id}`} className="btn" style={{ background: '#ffc107', color: 'black', padding: '5px 10px', fontSize: '12px' }}>Edit</Link>
                                                <button onClick={() => handleDelete(student.id)} className="btn btn-danger" style={{ padding: '5px 10px', fontSize: '12px' }}>Delete</button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredStudents.length === 0 && (
                            <tr>
                                <td colSpan="7" style={{ padding: '20px', textAlign: 'center' }}>No students found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
