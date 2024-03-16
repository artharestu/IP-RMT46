import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { fetchProfile, updateProfile } from "../features/profile/profileSlice";

export default function FormProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  // const profile = useSelector((state) => state.profiles.detail);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProfile(form, setIsLoading, navigate));
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
    dispatch(fetchProfile(setIsLoading, setForm));
  }, []);

  return (
    <form
      onSubmit={handleOnSubmit}
      className="p-5 my-3 border border-warning rounded shadow"
    >
      <h3 className="text-warning">Edit Profile</h3>
      <p>Edit your profile here</p>
      <div className="mb-3">
        <label className="form-label">First Name:</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={form.firstName}
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
          value={form.lastName}
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
          value={formattedDate(form.dateOfBirth)}
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
          value={form.phoneNumber}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <Button
        className="btn btn-lg btn-warning w-100 my-3"
        isLoading={isLoading}
      >
        Submit
      </Button>
    </form>
  );
}
