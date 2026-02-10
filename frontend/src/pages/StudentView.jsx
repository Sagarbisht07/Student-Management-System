import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const StudentView = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await api.get(`/students/${id}`);
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching student:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, [id]);

    if (loading) return <div className="container">Loading...</div>;
    if (!student) return <div className="container">Student not found.</div>;

    return (
        <div className="container">
            <h2 style={{ marginBottom: '20px' }}>Student Details</h2>
            <div className="card">
                <div style={{ marginBottom: '10px' }}><strong>ID:</strong> {student.id}</div>
                <div style={{ marginBottom: '10px' }}><strong>Name:</strong> {student.name}</div>
                <div style={{ marginBottom: '10px' }}><strong>Email:</strong> {student.email}</div>
                <div style={{ marginBottom: '10px' }}><strong>Age:</strong> {student.age}</div>
                <div style={{ marginBottom: '10px' }}><strong>Course:</strong> {student.course}</div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Status:</strong> 
                    <span style={{ 
                        marginLeft: '10px',
                        padding: '5px 10px', 
                        borderRadius: '15px', 
                        backgroundColor: student.status === 'Active' ? '#d4edda' : '#f8d7da',
                        color: student.status === 'Active' ? '#155724' : '#721c24',
                        fontSize: '12px'
                    }}>
                        {student.status}
                    </span>
                </div>
                
                <div style={{ marginTop: '20px' }}>
                    <Link to="/students" className="btn btn-primary">Back to List</Link>
                </div>
            </div>
        </div>
    );
};

export default StudentView;
