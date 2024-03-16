import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { register } from "../features/user/userSlice";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(user, setIsLoading, navigate));
  };

  return (
    <div className="card p-5 my-3 border border-warning rounded shadow text-light mx-auto bg-dark auth">
      <h3 className="text-warning">Register User</h3>
      <p>Register a new user</p>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={user.email}
            onChange={handleOnChange}
            required
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
            required
          />
        </div>
        <Button
          className="btn btn-warning w-100 my-3 btn-lg"
          isLoading={isLoading}
        >
          Register
        </Button>
      </form>
      <p className="text-light text-center">
        Dont have a account? <Link to={"/login"}>Login</Link>
      </p>
    </div>
  );
}
