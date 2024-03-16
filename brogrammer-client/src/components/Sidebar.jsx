import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCourseDetail } from "../features/course/courseSlice";
import { fetchSubscribers } from "../features/subscriber/subscriberSlice";

export default function Sidebar() {
  const { id } = useParams();
  const [isLoadingData, setIsLoadingData] = useState(false);

  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses.detail);
  const subscriber = useSelector((state) => state.subscribers.detail);

  useEffect(() => {
    dispatch(fetchCourseDetail(id, setIsLoadingData));
    dispatch(fetchSubscribers(id, setIsLoadingData));
  }, []);

  return (
    <div className="border border-warning rounded p-3 my-3 mx-auto shadow py-5">
      <h4 className="text-warning">Learning Path</h4>
      {isLoadingData ? (
        <p className="text-warning mt-5 text-center">
          <i>Loading data...</i>
        </p>
      ) : (
        <ul className="list-group list-group-flush">
          {course.Videos &&
            course.Videos.map((video) => (
              <li
                key={video.id}
                className="list-group-item bg-transparent text-light"
              >
                <i className="bi bi-youtube me-2"></i>
                {subscriber.status === "subscribed" ? (
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
      )}
    </div>
  );
}
