import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadProfilePicture } from "../features/profile/profileSlice";

export default function FormProfile() {
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    dispatch(uploadProfilePicture(file, setIsLoading, navigate));
  };

  return (
    <form
      className="p-5 my-3 border border-warning rounded shadow upload-form"
      encType="multipart/form-data"
      onSubmit={handleOnSubmit}
    >
      <h2 className="text-warning">Profile</h2>
      <p>Update your profile picture here</p>
      <div className="mb-3">
        <input
          type="file"
          className="form-control form-control-lg"
          accept="image/*"
          id="fileImage"
          disabled={isLoading}
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <Button
        className="btn btn-warning w-100 my-3 btn-lg"
        isLoading={isLoading}
      >
        Update
      </Button>
    </form>
  );
}
