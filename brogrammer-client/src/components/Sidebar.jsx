import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { serverRequest } from "../utils/axios";
import errorNotification from "../utils/errorNotification";

export default function Sidebar() {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  const getCourse = async () => {
    try {
      const response = await serverRequest({
        url: `/course/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setVideos(response.data.Videos);
    } catch (error) {
      errorNotification(error.response.data.message);
    }
  };
  useEffect(() => {
    getCourse();
  }, []);
  return (
    <div className="border border-warning rounded p-3 my-3 mx-auto shadow py-5">
      <h4 className="text-warning">Learning Path</h4>
      <ul className="list-group list-group-flush">
        {videos &&
          videos.map((video) => (
            <li
              className="list-group-item bg-transparent text-light"
              key={video.id}
            >
              <i className="bi bi-youtube me-2"></i>
              <NavLink
                to="/cms/companies"
                className="text-decoration-none text-light"
                style={({ isActive }) => ({
                  color: isActive ? "yellow" : "blue",
                })}
              >
                {video.title}
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
}
