interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  const getDisplayedPages = () => {
    if (totalPages <= 5) return pages;
    
    if (currentPage <= 3) return [...pages.slice(0, 5)];
    
    if (currentPage >= totalPages - 2) {
      return [...pages.slice(totalPages - 5)];
    }
    
    return [...pages.slice(currentPage - 3, currentPage + 2)];
  };

  const baseButtonClass = "px-3 py-1.5 rounded-lg transition-all duration-200 backdrop-blur-sm";
  const activeButtonClass = "glass-card border border-white/20 text-white hover:bg-white/10";
  const inactiveButtonClass = "glass-card border border-white/10 text-white/70 hover:text-white hover:border-white/20 hover:bg-white/5";
  const disabledButtonClass = "bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700/50";

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseButtonClass} ${currentPage === 1 ? disabledButtonClass : inactiveButtonClass}`}
      >
        ←
      </button>
      
      {getDisplayedPages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${baseButtonClass} ${
            currentPage === page
              ? activeButtonClass
              : inactiveButtonClass
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseButtonClass} ${currentPage === totalPages ? disabledButtonClass : inactiveButtonClass}`}
      >
        →
      </button>
    </div>
  );
};

export default Pagination; 