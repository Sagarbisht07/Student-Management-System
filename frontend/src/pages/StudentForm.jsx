import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        course: '',
        status: 'Active'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            const fetchStudent = async () => {
                setLoading(true);
                try {
                    const response = await api.get(`/students/${id}`);
                    setFormData(response.data);
                } catch (err) {
                    setError('Failed to fetch student details.');
                } finally {
                    setLoading(false);
                }
            };
            fetchStudent();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEditMode) {
                await api.put(`/students/${id}`, formData);
            } else {
                await api.post('/students', formData);
            }
            navigate('/students');
        } catch (err) {
            console.error('Error saving student:', err);
            setError(err.response?.data?.message || 'Failed to save student.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <h2 style={{ marginBottom: '20px' }}>{isEditMode ? 'Edit Student' : 'Create New Student'}</h2>
            {error && <div className="alert alert-danger" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input
                            type="number"
                            name="age"
                            className="form-control"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Course</label>
                        <select
                            name="course"
                            className="form-control"
                            value={formData.course}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Course</option>
                            <option value="React">React</option>
                            <option value="Node">Node</option>
                            <option value="Java">Java</option>
                            <option value="Python">Python</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select
                            name="status"
                            className="form-control"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : (isEditMode ? 'Update Student' : 'Create Student')}
                    </button>
                    <button 
                        type="button" 
                        className="btn" 
                        style={{ marginLeft: '10px', background: '#ccc' }}
                        onClick={() => navigate('/students')}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
