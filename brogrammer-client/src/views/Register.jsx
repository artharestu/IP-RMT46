import { useState } from "react";
import { serverRequest } from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await serverRequest({
        method: "post",
        url: "/register",
        data: user,
      });

      console.log("Register Successful...");
      navigate("/login");
    } catch (error) {
      error.response.data.message
        ? console.log(error.response.data.message)
        : console.log(error);
    }
  };

  return (
    <div className="p-5 my-3 border border-warning rounded shadow text-light w-75 mx-auto">
      <h3 className="text-warning">Register User</h3>
      <p>Register a new user</p>
      <div className="mb-3">
        <label className="form-label">Fullname:</label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          value={user.fullName}
          onChange={handleOnChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={user.email}
          onChange={handleOnChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={user.password}
          onChange={handleOnChange}
        />
      </div>
      <button
        className="btn btn-warning w-100 my-3 btn-lg"
        onClick={handleSubmit}
      >
        Register
      </button>
      <p className="text-light text-center">
        Dont have a account? <Link to={"/login"}>Login</Link>
      </p>
    </div>
  );
}
