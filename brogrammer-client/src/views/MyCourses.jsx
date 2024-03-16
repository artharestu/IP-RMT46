import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { fetchMyCourses } from "../features/course/courseSlice";
import { useDispatch, useSelector } from "react-redux";

export default function MyCourses() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const myCourses = useSelector((state) => state.courses.myCourses);

  useEffect(() => {
    dispatch(fetchMyCourses(setIsLoading));
  }, []);

  return (
    <div className="container text-light d-flex justify-content-center align-items-center">
      {isLoading ? (
        <h1 className="text-warning mt-5 text-center">
          <i>Loading data...</i>
        </h1>
      ) : myCourses.length === 0 ? (
        <div className="bg-dark rounded mt-5 p-3 border border-warning">
          <h1 className="text-warning text-center">
            <i>You don&lsquo;t have any courses yet!</i>
          </h1>
        </div>
      ) : (
        <>
          <Cards data={myCourses} />
        </>
      )}
    </div>
  );
}
