type Pros = {
  handlePageChange: (page: number) => void;
  totalPages: number;
  currentPage: number;
};

const Pagination: React.FC<Pros> = ({
  totalPages,
  handlePageChange,
  currentPage,
}) => {
  return (
    <div className="mt-4 flex justify-center">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`mx-1 py-2 px-4 rounded-lg transition-all ${
            currentPage === page
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } `}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
