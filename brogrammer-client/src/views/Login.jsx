import { useState } from "react";
import { serverRequest } from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import errorNotification from "../utils/errorNotification";
import Button from "../components/Button";
import showToast from "../utils/toast";

export default function Login() {
  const navigate = useNavigate();
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

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await serverRequest({
        method: "post",
        url: "/login",
        data: user,
      });
      localStorage.setItem("token", response.data.access_token);
      showToast("Login Successful..");
      navigate("/");
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 my-3 border border-warning rounded shadow text-light w-75 mx-auto bg-dark">
      <h3 className="text-warning">Login User</h3>
      <p>Login to your account</p>
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
      <Button
        className="btn btn-warning w-100 my-3 btn-lg"
        onClick={handleLogin}
        isLoading={isLoading}
      >
        Login
      </Button>
      <p className="text-light text-center">
        Dont have a account? <Link to={"/register"}>Register</Link>
      </p>
    </div>
  );
}
