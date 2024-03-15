import { useState, useEffect } from "react";
import errorNotification from "../utils/errorNotification";
import { serverRequest } from "../utils/axios";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function ShowProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await serverRequest({
        url: "/profile",
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setData(response.data);
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const dateFormatted = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="profile-container text-light bg-dark border rounded border-warning mt-3 mx-auto">
      {isLoading ? (
        <h1 className="text-warning mt-5 text-center">Loading...</h1>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center mt-1 p-3">
          <img
            src={data.profilePicture}
            alt="Profile"
            className="rounded-circle img-thumbnail border border-warning profile-picture"
          />
          <div className="text-center text-warning mt-3">
            <h3>
              {data.firstName} {data.lastName}
            </h3>
            <p className="text-light">{data.bio}</p>
            <p className="text-light">
              <span className="text-warning">Date of Birth: </span>
              {dateFormatted(data.dateOfBirth)}
            </p>
            <p className="text-light">
              <span className="text-warning">Phone Number: </span>
              {data.phoneNumber}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Button
              onClick={() => navigate("/profile/upload-image")}
              className="mt-3 btn btn-outline-success m-1"
            >
              Upload Image
            </Button>
            <Button
              onClick={() => navigate("/profile/edit")}
              className="mt-3 btn btn-outline-warning m-1"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
