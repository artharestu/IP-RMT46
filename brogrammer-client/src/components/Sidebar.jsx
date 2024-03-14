import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { serverRequest } from "../utils/axios";
import errorNotification from "../utils/errorNotification";

export default function Sidebar() {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  const [status, setStatus] = useState("unsubscribed");
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

  const getSubcribeStatus = async () => {
    try {
      const response = await serverRequest({
        url: `/subscriber/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response) return;

      setStatus(response.data.status);
    } catch (error) {
      if (error.response) errorNotification(error.response.data.message);
    }
  };

  useEffect(() => {
    getCourse();
    getSubcribeStatus();
  }, []);

  return (
    <div className="border border-warning rounded p-3 my-3 mx-auto shadow py-5">
      <h4 className="text-warning">Learning Path</h4>
      <ul className="list-group list-group-flush">
        {videos &&
          videos.map((video) => (
            <li
              key={video.id}
              className="list-group-item bg-transparent text-light"
            >
              <i className="bi bi-youtube me-2"></i>
              {status === "subscribed" ? (
                <NavLink
                  to={`/detail-course/${id}/${video.id}`}
                  className="text-decoration-none text-light"
                  style={({ isActive }) => ({
                    color: isActive ? "yellow" : "blue",
                  })}
                >
                  {video.title}
                </NavLink>
              ) : (
                <span>{video.title}</span>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
