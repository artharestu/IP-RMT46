import { useParams } from "react-router-dom";
import errorNotification from "../utils/errorNotification";
import { useEffect, useState } from "react";
import { serverRequest } from "../utils/axios";
import Button from "./Button";
import showToast from "../utils/toast";

export default function Course() {
  const [data, setData] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("unsubscribed");
  const [tokenPayment, setTokenPayment] = useState("");
  const [orderId, setOrderId] = useState("");
  const { id } = useParams();

  const getCourse = async () => {
    setIsLoadingData(true);
    try {
      const response = await serverRequest({
        url: `/course/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response.data);
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoadingData(false);
    }
  };
  const priceToRupiah = () => {
    return data.price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  const handleSubcribe = async () => {
    setIsLoading(true);
    try {
      const response = await serverRequest({
        url: `subscription/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStatus(response.data.status);
      setTokenPayment(response.data.tokenPayment);
      setOrderId(response.data.orderId);
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPayment = async () => {
    try {
      await serverRequest({
        url: `/verify/${orderId}`,
        method: "patch",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStatus("subscribed");
      showToast("Payment Success!");
    } catch (error) {
      errorNotification(error.response.data.message);
    }
  };

  const handlePayment = async () => {
    window.snap.pay(tokenPayment, {
      onSuccess: function (result) {
        verifyPayment();
        console.log(result);
      },
      onPending: function (result) {
        showToast("wating your payment!");
        console.log(result);
      },
      onError: function (result) {
        showToast("payment failed!");
        console.log(result);
      },
      onClose: function () {
        showToast("You closed the popup without finishing the payment");
      },
    });
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

      setTokenPayment(response.data.tokenPayment);
      setStatus(response.data.status);
      setOrderId(response.data.orderId);
    } catch (error) {
      if (error.response) errorNotification(error.response.data.message);
    }
  };

  useEffect(() => {
    getCourse();
    getSubcribeStatus();
  }, []);

  return (
    <>
      {isLoadingData ? (
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
            {data.Videos && data.Videos.length} Video
          </p>
          <h5 className="text-warning mt-3">Description</h5>
          <p className="text-light">{data.description}</p>
          {status === "unsubscribed" && (
            <Button
              className="btn btn-outline-warning btn-lg w-100 mt-3"
              onClick={handleSubcribe}
              isLoading={isLoading}
            >
              Subscribe
            </Button>
          )}
          {status === "pending" && (
            <Button
              className="btn btn-outline-warning btn-lg w-100 mt-3"
              onClick={handlePayment}
              isLoading={isLoading}
            >
              Payment
            </Button>
          )}
          {status === "subscribed" && (
            <button
              className="btn btn-outline-warning btn-lg w-100 mt-3"
              disabled={true}
            >
              Subscribed
            </button>
          )}
        </div>
      )}
    </>
  );
}
