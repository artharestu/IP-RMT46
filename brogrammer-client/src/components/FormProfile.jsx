import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverRequest } from "../utils/axios";
import showToast from "../utils/toast";
import errorNotification from "../utils/errorNotification";
import Button from "./Button";

export default function FormProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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

      setProfile(response.data);
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await serverRequest({
        url: "/profile",
        method: "put",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: profile,
      });

      showToast("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formattedDate = (d) => {
    const date = new Date(d);
    const month =
      date.getMonth() < 9
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`;
    const day =
      date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    return `${date.getFullYear()}-${month}-${day}`;
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <form className="p-5 my-3 border border-warning rounded shadow">
      <h3 className="text-warning">Edit Profile</h3>
      <p>Edit your profile here</p>
      <div className="mb-3">
        <label className="form-label">First Name:</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={profile.firstName}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Last Name:</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={profile.lastName}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Date of Birth:</label>
        <input
          type="date"
          className="form-control"
          id="dateOfBirth"
          value={formattedDate(profile.dateOfBirth)}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone Number:</label>
        <input
          type="text"
          className="form-control"
          id="phoneNumber"
          value={profile.phoneNumber}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <Button
        className="btn btn-lg btn-warning w-100 my-3"
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Submit
      </Button>
    </form>
  );
}
