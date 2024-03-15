import { serverRequest } from "../utils/axios";
import showToast from "../utils/toast";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import errorNotification from "../utils/errorNotification";

export default function FormProfile() {
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      await serverRequest({
        url: `/profile`,
        method: "patch",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: formData,
      });

      showToast("Image updated successfully.");
      navigation("/profile");
    } catch (error) {
      console.log(error);
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="p-5 my-3 border border-warning rounded shadow upload-form"
      encType="multipart/form-data"
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
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Update
      </Button>
    </form>
  );
}
