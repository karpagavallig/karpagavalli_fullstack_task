import LoginForm from "./component/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default App;