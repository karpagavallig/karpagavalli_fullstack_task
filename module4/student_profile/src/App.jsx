import { useState } from 'react';
import Student from './component/Student';
import StudentButton from './component/StudentButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [student, setStudent] = useState({
    name: "Enter details below",
    rollNo: "-",
    course: "-",
    college: "-"
  });

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <Student 
            name={student.name}
            rollNo={student.rollNo}
            course={student.course}
            college={student.college}
          />
          <StudentButton setStudent={setStudent} />
        </div>
      </div>
    </div>
  );
}

export default App;