import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateEmployee from './UpdateEmployee'; // ✅ Make sure this path is correct

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching employees');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (id) => {
    setSelectedEmployeeId(id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedEmployeeId(null);
  };

  const handleModalSave = () => {
    fetchEmployees();
    handleModalClose();
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`/api/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Employee List</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(emp.id)}>Update</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <UpdateEmployee
          employeeeId={selectedEmployeeId}
          onClose={handleModalClose}
          onUpdate={handleModalSave}
        />
      )}
    </div>
  );
};

export default EmployeeList;
