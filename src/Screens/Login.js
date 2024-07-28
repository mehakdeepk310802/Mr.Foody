import React, {useState} from 'react'
import { Link , useNavigate} from 'react-router-dom';
export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: ""});
  const [errors, setErrors] = useState([]);
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });
      const json = await response.json();
      if (!response.ok || !json.success) {
        alert("Enter Valid Credentials");
        setErrors(json.errors || []);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      console.log(json);
      if (json.success) {
        alert("Login successfully");
        localStorage.setItem("userEmail", credentials.email)
        localStorage.setItem("authToken", json.authToken)
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      alert(`Failed to fetch data. Error: ${error.message}`);
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            {errors.find(error => error.path === 'email') && (
              <div className="form-text text-danger">
                {errors.find(error => error.path === 'email').msg}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange} />
            {errors.find(error => error.path === 'password') && (
              <div className="form-text text-danger">
                {errors.find(error => error.path === 'password').msg}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-success">Login</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>New user</Link>
        </form>
      </div>
    </>
  );
}
