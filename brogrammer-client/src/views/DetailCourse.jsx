import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DetailCourse() {
  return (
    <div className="container-fluid text-light">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
