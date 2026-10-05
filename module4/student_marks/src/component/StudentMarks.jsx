import React, { useState } from "react";

function StudentMarks(props) {
  // State to store student's marks (Initial value: 50)
  const [marks, setMarks] = useState(50);

  // Functions to handle mark changes
  const increaseMarks = () => {
    setMarks((prevMarks) => prevMarks + 1);
  };

  const decreaseMarks = () => {
    setMarks((prevMarks) => (prevMarks > 0 ? prevMarks - 1 : 0));
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: "420px" }}>
      <div className="card-header bg-primary text-white text-center py-3 rounded-top-4">
        <h4 className="m-0 fw-bold">Student Marks</h4>
      </div>

      <div className="card-body p-4 text-start">
        {/* Name and Subject received from Props */}
        <div className="mb-3">
          <span className="fw-bold text-secondary">Student Name: </span>
          <span className="fs-5 fw-semibold text-dark">{props.name}</span>
        </div>

        <div className="mb-3">
          <span className="fw-bold text-secondary">Subject: </span>
          <span className="fs-5 fw-semibold text-dark">{props.subject}</span>
        </div>

        <hr className="my-3 text-muted" />

        {/* Marks managed by State */}
        <div className="mb-4 text-center">
          <span className="fw-bold text-secondary d-block mb-1">Marks</span>
          <span className="display-5 fw-bold text-primary">{marks}</span>
        </div>

        {/* Action Buttons to update state */}
        <div className="d-grid gap-2">
          <button 
            onClick={increaseMarks} 
            className="btn btn-success btn-lg rounded-pill fw-bold shadow-sm"
          >
            [ Increase Marks ]
          </button>
          
          <button 
            onClick={decreaseMarks} 
            className="btn btn-danger btn-lg rounded-pill fw-bold shadow-sm"
          >
            [ Decrease Marks ]
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentMarks;