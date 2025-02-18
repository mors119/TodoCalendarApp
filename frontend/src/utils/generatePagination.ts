export const generatePagination = (currentPage: number, totalPages: number) => {
  let pages: (number | string)[] = [];

  switch (true) {
    case totalPages <= 5:
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      break;

    case currentPage <= 3:
      pages = [1, 2, 3, '...', totalPages];
      break;

    case currentPage >= totalPages - 2:
      pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
      break;

    default:
      pages = [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
      ];
  }

  return pages;
};
