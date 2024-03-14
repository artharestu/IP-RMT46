import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-lg">
      <div className="container-fluid d-flex">
        <Link to={"/"} className="navbar-brand">
          <div className="d-flex">
            <h3>
              <i className="bi bi-tencent-qq m-1 text-light"></i>
            </h3>
            <div className="d-none d-md-block m-1 text-light">Brogrammer</div>
          </div>
        </Link>
        <div className="flex-fill d-flex justify-content-between">
          <ul className="navbar-nav">
            <li className="nav-item">
              {localStorage.getItem("token") && (
                <Link to={"/mycourses"} className="nav-link text-light">
                  My Courses
                </Link>
              )}
            </li>
          </ul>

          <div>
            {localStorage.getItem("token") ? (
              <button className="btn btn-outline-light" onClick={handleLogout}>
                <i className="bi bi-box-arrow-in-right text-light me-1"></i>
                Logout
              </button>
            ) : (
              <button className="btn btn-outline-light" onClick={handleLogin}>
                <i className="bi bi-box-arrow-in-right text-light me-1"></i>
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
