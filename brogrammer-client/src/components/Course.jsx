import { useParams } from "react-router-dom";
import errorNotification from "../utils/errorNotification";
import { useEffect, useState } from "react";
import { serverRequest } from "../utils/axios";
import Button from "./Button";

export default function Course() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const getCourse = async () => {
    setIsLoading(true);
    try {
      const response = await serverRequest.get(`/course/${id}`);
      console.log(response);
      setData(response.data);
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  const priceToRupiah = () => {
    return data.price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };
  useEffect(() => {
    getCourse();
  }, []);

  return (
    <>
      {isLoading ? (
        <h3 className="text-warning mt-5 text-center">
          <i>Loading data...</i>
        </h3>
      ) : (
        <div className="border border-warning rounded p-3 my-3 mx-auto shadow py-5 bg-dark opacity-90">
          <h3 className="text-warning">{data.title}</h3>
          <img
            src={
              data.videoThumbnail
                ? `https://img.youtube.com/vi/${data.videoThumbnail}/mqdefault.jpg`
                : ""
            }
            alt={data.title}
            className="img-fluid"
          />
          <p className="text-light mt-3">
            <span className="text-warning">Kategori: </span>
            {data.Category && data.Category.name}
          </p>
          <p className="text-light">
            <span className="text-warning">Harga: </span>
            {data.price && priceToRupiah()}
          </p>
          <p className="text-light">
            <span className="text-warning">Total: </span>
            {data.Video && data.Video.length} Video
          </p>
          <h5 className="text-warning mt-3">Description</h5>
          <p className="text-light">{data.description}</p>
          <Button className="btn btn-outline-warning btn-lg w-100 mt-3">
            Subscribe
          </Button>
        </div>
      )}
    </>
  );
}
