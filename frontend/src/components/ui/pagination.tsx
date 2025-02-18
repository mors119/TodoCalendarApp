import clsx from 'clsx';
import { generatePagination } from '../../utils/generatePagination';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import usePaginationStore from '../../stores/paginationStore';

export default function Pagination() {
  const { currentPage, setCurrentPage, totalPages } = usePaginationStore();

  const allPages = generatePagination(currentPage, totalPages);

  const handlePageClick = (page: number) => {
    if (typeof page === 'number' && page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        onClick={() => handlePageClick(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;

          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (page === '...') position = 'middle';

          return (
            <PaginationNumber
              key={index}
              page={page}
              position={position}
              isActive={currentPage === page}
              onClick={() => handlePageClick(Number(page))}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        onClick={() => handlePageClick(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  isActive,
  position,
  onClick,
}: {
  page: number | string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
  onClick?: () => void;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm  cursor-pointer',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-amber-300/50': isActive,
      'hover:bg-amber-300/20 bg-neutral-300/20':
        !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  );

  return (
    <div className={className} onClick={onClick}>
      {page}
    </div>
  );
}

function PaginationArrow({
  direction,
  isDisabled,
  onClick,
}: {
  direction: 'left' | 'right';
  isDisabled?: boolean;
  onClick?: () => void;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md cursor-pointer',
    {
      'pointer-events-none text-gray-300 bg-amber-200/20': isDisabled,
      'hover:opacity-50 bg-amber-300/50': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon = direction === 'left' ? <LeftOutlined /> : <RightOutlined />;

  return (
    <div className={className} onClick={!isDisabled ? onClick : undefined}>
      {icon}
    </div>
  );
}
