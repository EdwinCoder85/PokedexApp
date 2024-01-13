import "./styles/Pagination.css";

const Pagination = ({
  setCurrentPage,
  currentPage,
  pages
}) => {

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSpecificPage = e => {
    setCurrentPage(Number(e.target.id));
  };

  return (
    <div className="pagination">
      <button
        onClick={handlePrevbtn}
        disabled={currentPage == pages[0] ? true : false}
        className={currentPage == 1 ? "disabled" : "active"}
      >
        {"<<"}
      </button>
      {pages.map((page, index) => {
          return (
            <button
              key={index}
              id={page}
              onClick={handleSpecificPage}
              className={page == currentPage ? "active" : ""}
            >
              {page}
            </button>
          );
      })}
      <button
        onClick={handleNextbtn}
        disabled={currentPage == pages[pages.length - 1] ? true : false}
        className={currentPage >= pages[pages.length - 1] ? "disabled" : "active"}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
