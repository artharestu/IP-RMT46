import Card from "./Card";

export default function Cards({ data }) {
  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
      {data &&
        data.map((course) => {
          return (
            <Card
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              price={course.price}
              videoThumbnail={course.videoThumbnail}
              category={course.Category.name}
            />
          );
        })}
    </div>
  );
}
