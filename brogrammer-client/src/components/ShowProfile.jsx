import { useState, useEffect } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/profile/profileSlice";

export default function ShowProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profiles.detail);

  const dateFormatted = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  useEffect(() => {
    dispatch(fetchProfile(setIsLoading));
  }, []);

  return (
    <div className="profile-container text-light bg-dark border rounded border-warning mt-3 mx-auto">
      {isLoading ? (
        <h1 className="text-warning mt-5 text-center">Loading...</h1>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center mt-1 p-3">
          <img
            src={profile.profilePicture}
            alt="Profile"
            className="rounded-circle img-thumbnail border border-warning profile-picture"
          />
          <div className="text-center text-warning mt-3">
            <h3>
              {profile.firstName} {profile.lastName}
            </h3>
            <p className="text-light">{profile.bio}</p>
            <p className="text-light">
              <span className="text-warning">Date of Birth: </span>
              {dateFormatted(profile.dateOfBirth)}
            </p>
            <p className="text-light">
              <span className="text-warning">Phone Number: </span>+{" "}
              {profile.phoneNumber}
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
