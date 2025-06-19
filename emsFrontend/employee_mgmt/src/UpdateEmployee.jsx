import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateEmployee = ({ employeeeId, onClose, onUpdate }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/employees/${employeeeId}`);
        setEmployee(response.data);
      } catch (err) {
        setError("Error fetching employee data");
      } finally {
        setLoading(false);
      }
    };

    if (employeeeId) fetchEmployee();
  }, [employeeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/employees/${employeeeId}`, employee);
      onUpdate(); // Refresh list
      onClose();  // Close modal
    } catch (err) {
      console.error("Error updating employee", err);
      alert("Failed to update employee");
    }
  };

  if (loading) return <div className='text-center mt-5'>Loading...</div>;
  if (error) return <div className='alert alert-danger text-center'>{error}</div>;
  if (!employee) return null;

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Employee</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group mb-3">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={employee.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={employee.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              <button type="submit" className="btn btn-primary">Update Employee</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
