export default function Button({
  children,
  onClick,
  isLoading = false,
  className,
}) {
  return (
    <button className={className} onClick={onClick} disabled={isLoading}>
      {isLoading ? (
        <>
          <span className="spinner-border spinner-border-sm"></span>
          <span> Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
