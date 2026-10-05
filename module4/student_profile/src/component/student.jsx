import React from 'react';

function Student({ name, rollNo, course, college }) {
  return (
    <div className="card shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: "420px" }}>
      <div className="card-header bg-primary text-white text-center py-3 rounded-top-4">
        <h4 className="m-0 fw-bold">Student Profile</h4>
      </div>
      <div className="card-body p-4 text-start">
        <div className="mb-3">
          <label className="text-muted small fw-bold text-uppercase d-block">Student Name</label>
          <span className="fs-5 fw-semibold text-dark">{name}</span>
        </div>
        <div className="mb-3">
          <label className="text-muted small fw-bold text-uppercase d-block">Roll Number</label>
          <span className="fs-5 fw-semibold text-dark">{rollNo}</span>
        </div>
        <div className="mb-3">
          <label className="text-muted small fw-bold text-uppercase d-block">Course</label>
          <span className="fs-5 fw-semibold text-dark">{course}</span>
        </div>
        <div className="mb-0">
          <label className="text-muted small fw-bold text-uppercase d-block">College</label>
          <span className="fs-5 fw-semibold text-dark">{college}</span>
        </div>
      </div>
    </div>
  );
}

export default Student;