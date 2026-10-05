import React, { useState } from 'react';

function StudentButton({ setStudent }) {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    course: '',
    college: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    setStudent(formData);
    setFormData({ name: '', rollNo: '', course: '', college: '' });
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 mt-4 mx-auto" style={{ maxWidth: '420px' }}>
      <h5 className="fw-bold text-center mb-3 text-secondary">Enter Student Details</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Student Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Roll Number"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="College"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100 py-2 rounded-pill fw-bold"
        >
          Update Student Details
        </button>
      </form>
    </div>
  );
}

export default StudentButton;