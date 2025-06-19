import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  

const CreateEmployee = () => {
  const [employee, setEmployee] = React.useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [message, setMessage] = React.useState('');
  const navigate = useNavigate(); // For redirecting after success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error('Failed to create employee');
      }

      setMessage('Employee created successfully');
      setEmployee({
        firstName: '',
        lastName: '',
        email: '',
      });

      // Redirect to employee list page after creation
      setTimeout(() => {
        navigate('/employees'); // Adjust path if needed
      }, 1000);

    } catch (error) {
      setMessage('Error creating employee');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group mb-3'>
          <label>First Name</label>
          <input
            type='text'
            className='form-control'
            name='firstName'
            value={employee.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group mb-3'>
          <label>Last Name</label>
          <input
            type='text'
            className='form-control'
            name='lastName'
            value={employee.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group mb-3'>
          <label>Email</label>
          <input
            type='email'
            className='form-control'
            name='email'
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>Create Employee</button>
      </form>
      {message && <div className='alert alert-info mt-3'>{message}</div>}
    </div>
  );
};

export default CreateEmployee;
