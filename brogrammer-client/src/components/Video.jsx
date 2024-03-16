import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import errorNotification from "../utils/errorNotification";
import { serverRequest } from "../utils/axios";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../features/video/videoSlice";

export default function Video() {
  const { videoId } = useParams();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    "Hallo, saya adalah asisten anda dalam belajar course ini. Silahkan tanyakan apa saja yang anda butuhkan.",
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const video = useSelector((state) => state.videos.detail);

  const handleChat = async () => {
    setIsLoading(true);
    setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
    try {
      const response = await serverRequest({
        url: `/chat`,
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          message,
        },
      });
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        response.data.message,
      ]);
      setMessage("");
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  useEffect(() => {
    dispatch(fetchVideos(videoId, setIsLoadingData));
  }, [videoId]);

  return (
    <>
      {isLoadingData ? (
        <h3 className="text-warning mt-5 text-center">
          <i>Loading data...</i>
        </h3>
      ) : (
        <div className="border border-warning rounded p-3 my-3 mx-auto shadow py-5 bg-dark opacity-90">
          <h4 className="text-warning mb-3">{video.title}</h4>
          <iframe
            className="w-100"
            height={"400"}
            src={`https://www.youtube.com/embed/${video.urlVideo}`}
          ></iframe>
          <p className="text-light mt-3">{video.description}</p>
          <div className="border border-warning rounded p-4 my-2 mx-auto shadow bg-dark opacity-90">
            <h5 className="text-warning mb-3">AI Chat</h5>
            <div
              className="text-light mb-3 overflow-y-scroll"
              style={{ height: "300px" }}
            >
              {chatHistory.map((chat, index) => (
                <div
                  className={
                    index % 2 === 0
                      ? "bg-primary-subtle text-black border border-info rounded p-3 m-2 mx-auto shadow opacity-90"
                      : "bg-warning-subtle text-black border border-info rounded p-3 m-2 mx-auto shadow opacity-90"
                  }
                  key={index}
                >
                  {index % 2 === 0 ? (
                    <>
                      <b>AI: </b>
                      {chat}
                    </>
                  ) : (
                    <>
                      <b>Me: </b>
                      {chat}
                    </>
                  )}
                </div>
              ))}
            </div>
            <input
              type="text"
              className="form-control form-control-lg"
              onChange={handleOnChange}
              value={message}
              disabled={isLoading}
              placeholder="Type your message..."
            />
            <Button
              className="btn btn-warning mt-3 w-100"
              onClick={handleChat}
              isLoading={isLoading}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
