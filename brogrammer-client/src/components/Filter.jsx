import { useEffect, useState } from "react";
import errorNotification from "../utils/errorNotification";
import { serverRequest } from "../utils/axios";
import Button from "./Button";

export default function Filter({
  handleSearch,
  handleSort,
  handleCategory,
  isNewest,
  search,
  categoryId,
  handleReset,
}) {
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    try {
      const response = await serverRequest({
        url: "/categories",
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategory(response.data);
    } catch (error) {
      errorNotification(error.response.data.message);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <fieldset className="border border-warning rounded p-3 my-3 mx-auto shadow text-start">
      <legend className="text-warning">Filter</legend>
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
      />
      <div className="mt-3">
        <label className="form-check-label text-warning">Sort by:</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="radioNewest"
            checked={isNewest}
            onChange={handleSort}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Newest
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="radioOldest"
            checked={!isNewest}
            onChange={handleSort}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Oldest
          </label>
        </div>
      </div>
      <div className="my-3">
        <label className="form-check-label text-warning">Category:</label>
        <select
          className="form-select"
          value={categoryId}
          onChange={handleCategory}
        >
          <option value="">All</option>
          {category.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <Button className="btn btn-outline-warning w-100" onClick={handleReset}>
        Reset Filter
      </Button>
    </fieldset>
  );
}
