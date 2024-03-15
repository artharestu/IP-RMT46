import { Outlet } from "react-router-dom";

export default function Profile() {
  return (
    <div className="container text-light">
      <Outlet />
    </div>
  );
}
