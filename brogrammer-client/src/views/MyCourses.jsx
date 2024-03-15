import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { serverRequest } from "../utils/axios";
import errorNotification from "../utils/errorNotification";

export default function MyCourses() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await serverRequest({
        url: "/mycourses",
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      setData(response.data);
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container text-light d-flex justify-content-center align-items-center">
      {isLoading ? (
        <h1 className="text-warning mt-5 text-center">
          <i>Loading data...</i>
        </h1>
      ) : (
        <>
          <Cards data={data} />
        </>
      )}
    </div>
  );
}
