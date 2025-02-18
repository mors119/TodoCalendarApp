import { useNavigate } from 'react-router';
import useTodoStore from '../../stores/todoStore';
import { todoType } from '../../types/todo';
import { useRef, useEffect } from 'react';

interface SearchProps {
  searchData?: todoType[];
  setKeyword: (keyword: string) => void;
}

const SearchView = ({ searchData, setKeyword }: SearchProps) => {
  const navigate = useNavigate();
  const { setSearchKeyword } = useTodoStore();
  const searchRef = useRef<HTMLDivElement>(null); // ✅ 검색창 참조를 위한 useRef 추가

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setKeyword(''); // 외부 클릭 시 검색어 초기화
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // 클릭 이벤트 등록
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // 언마운트 시 이벤트 제거
    };
  }, [setKeyword]);

  return (
    <div
      ref={searchRef}
      className="absolute left-0 w-full bg-white border border-neutral-300 shadow-lg rounded-lg max-h-60 overflow-y-auto">
      {searchData && searchData.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {searchData.map((item) => (
            <li
              key={item.id}
              className="p-3 hover:bg-amber-100/30 transition duration-200 cursor-pointer"
              onClick={() => {
                setSearchKeyword(item.title);
                setKeyword('');
                navigate('/result');
              }}>
              <div className="font-semibold text-gray-900">
                <span className="text-neutral-300 text-sm mr-1">제목</span>{' '}
                {item.title}
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-neutral-300 text-sm mr-1">설명</span>
                {item.description}
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-neutral-300 text-sm mr-1">카테고리</span>
                {item.category}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-3 text-gray-500 text-center">
          🔍 검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default SearchView;
