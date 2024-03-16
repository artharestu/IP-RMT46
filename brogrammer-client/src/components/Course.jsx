import { useParams } from "react-router-dom";
import errorNotification from "../utils/errorNotification";
import { useEffect, useState } from "react";
import { serverRequest } from "../utils/axios";
import Button from "./Button";
import showToast from "../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseDetail } from "../features/course/courseSlice";
import { fetchSubscribers } from "../features/subscriber/subscriberSlice";

export default function Course() {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenPayment, setTokenPayment] = useState("");
  const [orderId, setOrderId] = useState("");
  const { id } = useParams();

  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses.detail);
  const subscriber = useSelector((state) => state.subscribers.detail);
  const status = useSelector((state) => state.subscribers.status);

  const priceToRupiah = () => {
    return course.price.toLocaleString("id-ID", {
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

  useEffect(() => {
    dispatch(fetchCourseDetail(id, setIsLoadingData));
    dispatch(fetchSubscribers(id, setIsLoadingData));
    if (JSON.stringify(subscriber) !== "{}") {
      setTokenPayment(subscriber.tokenPayment);
      setOrderId(subscriber.orderId);
    }
  }, []);

  return (
    <>
      {isLoadingData ? (
        <h3 className="text-warning mt-5 text-center">
          <i>Loading data...</i>
        </h3>
      ) : (
        <div className="border border-warning rounded p-3 my-3 mx-auto shadow py-5 bg-dark opacity-90">
          <h3 className="text-warning">{course.title}</h3>
          <div className="d-flex align-items-center justify-content-start gap-3">
            <img
              src={
                course.videoThumbnail
                  ? `https://img.youtube.com/vi/${course.videoThumbnail}/mqdefault.jpg`
                  : ""
              }
              alt={course.title}
              className="img-fluid w-50"
            />
            <div>
              <p className="text-light mt-3">
                <span className="text-warning">Kategori: </span>
                {course.Category && course.Category.name}
              </p>
              <p className="text-light">
                <span className="text-warning">Harga: </span>
                {course.price && priceToRupiah()}
              </p>
              <p className="text-light">
                <span className="text-warning">Total: </span>
                {course.Videos && course.Videos.length} Video
              </p>
            </div>
          </div>
          <h5 className="text-warning mt-3">Description</h5>
          <p className="text-light">{course.description}</p>
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
