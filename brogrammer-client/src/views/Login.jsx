import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { login, googleLogin } from "../features/user/userSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setForm((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(form, setIsLoading, navigate));
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "176479307085-bqd29sss2dqti79f5g854hus4ql96n1f.apps.googleusercontent.com",
      callback: (response) => {
        dispatch(googleLogin(response.credential, setIsLoading, navigate));
      },
    });
    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="card p-5 my-3 border border-warning rounded shadow text-light mx-auto bg-dark big-card">
      <h3 className="text-warning">Login User</h3>
      <p>Login to your account</p>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={form.email}
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
            value={form.password}
            onChange={handleOnChange}
            required
          />
        </div>
        <Button
          className="btn btn-warning w-100 my-3 btn-lg"
          isLoading={isLoading}
        >
          Login
        </Button>
      </form>
      <p className="text-light text-center">
        Dont have a account? <Link to={"/register"}>Register</Link>
      </p>
      <div className="d-flex justify-content-center flex-column align-items-center">
        <p className="text-warning text-center">- or -</p>
        <div id="buttonDiv"></div>
      </div>
    </div>
  );
}
