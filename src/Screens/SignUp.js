import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation
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
        alert("User created successfully!");
        // Handle success scenario
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
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
            {errors.find(error => error.path === 'name') && (
              <div className="form-text text-danger">
                {errors.find(error => error.path === 'name').msg}
              </div>
            )}
          </div>
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
          <div className="mb-3">
            <label htmlFor="exampleInputGeolocation1" className="form-label">Address</label>
            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} id="exampleInputGeolocation1" onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
        </form>
      </div>
    </>
  );
}
