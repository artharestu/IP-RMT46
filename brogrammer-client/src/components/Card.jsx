export default function Card({
  // id,
  title,
  description,
  price,
  category,
  videoThumbnail,
}) {
  const style = {
    height: "200px",
  };

  const priceToRupiah = () => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  return (
    <div className="card bg-dark rounded shadow text-light my-3 border-warning p-0">
      <img
        src={`https://img.youtube.com/vi/${videoThumbnail}/mqdefault.jpg`}
        className="card-img-top"
        height="200px"
      />
      <div className="card-body">
        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item text-center bg-transparent">
            <h4 className="card-title card-title-home text-warning">{title}</h4>
          </li>
          <li className="list-group-item bg-dark text-light">
            <h6 className="card-title">
              <span className="text-warning">Harga: </span>
              <span className="card-text card-description">
                {priceToRupiah()}
              </span>
            </h6>
          </li>
          <li className="list-group-item bg-dark text-light">
            <h6 className="card-title">
              <span className="text-warning">Kategori: </span>
              <span className="card-text card-description">{category}</span>
            </h6>
          </li>
          <li className="list-group-item bg-dark text-light">
            <h6 className="card-text">
              <span className="text-warning">Description:</span>
            </h6>
            <p className="card-text card-description" style={style}>
              {description}
            </p>
          </li>
        </ul>
        <button
          className="btn btn-outline-warning w-100"
          // onClick={() => {
          //   handleAddCoin(id);
          // }}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
