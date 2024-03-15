import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import Filter from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";

export default function HomePage() {
  const [isNewest, setIsNewest] = useState(true);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState("");

  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.list);

  const handleSort = () => {
    setIsNewest((prevIsAscending) => !prevIsAscending);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleCategory = (event) => {
    setCategoryId(event.target.value);
  };

  const handleReset = () => {
    setSearch("");
    setCategoryId("");
    setIsNewest(true);
  };

  useEffect(() => {
    dispatch(fetchCourses(isNewest, search, categoryId, setIsLoading));
  }, [isNewest, search, categoryId]);

  return (
    <div className="container-fluid text-light">
      <div className="row">
        <div className="col-md-3">
          <Filter
            handleSearch={handleSearch}
            handleSort={handleSort}
            handleCategory={handleCategory}
            isNewest={isNewest}
            search={search}
            categoryId={categoryId}
            handleReset={handleReset}
          />
        </div>
        <div className="col-md-9">
          {isLoading ? (
            <h1 className="text-warning mt-5 text-center">
              <i>Loading data...</i>
            </h1>
          ) : (
            <>
              <Cards data={courses} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
