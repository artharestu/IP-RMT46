import { useEffect, useState } from "react";
import { serverRequest } from "../utils/axios";
import Cards from "../components/Cards";
import Filter from "../components/Filter";
import errorNotification from "../utils/errorNotification";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [isNewest, setIsNewest] = useState(true);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState("");

  const fetchData = async () => {
    const requestConfig = {
      params: {},
    };

    isNewest
      ? (requestConfig.params.sort = "DESC")
      : (requestConfig.params.sort = "ASC");
    if (search) requestConfig.params.search = search;
    if (categoryId) requestConfig.params.categoryId = categoryId;

    try {
      const response = await serverRequest.get("/courses", requestConfig);
      setData(response.data.data);
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

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
    fetchData();
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
              <Cards data={data} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
