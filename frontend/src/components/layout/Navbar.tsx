import { Link, useNavigate } from 'react-router';
import logo from '../../assets/logo.png';
import useMemberStore from '../../stores/memberStore';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';
import useSidebarStore from '../../stores/sidebarStore';
import Auth from '../auth/Auth';
import SearchView from '../ui/searchbar';
import { useState, useEffect } from 'react';
import { todoType } from '../../types/todo';
import { searchTodos } from '../../api/todoApi';
import useTodoStore from '../../stores/todoStore';

const Navbar = () => {
  const { toggleSidebar } = useSidebarStore();
  const { member } = useMemberStore();
  const { setSearchKeyword, setRefreshState, refreshState } = useTodoStore();

  const [keyword, setKeyword] = useState<string>('');
  const [searchData, setSearchData] = useState<todoType[]>([]);
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>(''); // 디바운싱된 키워드
  const navigate = useNavigate();

  // 검색 디바운싱 로직
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500); // 0.5초 후에 keyword 적용

    return () => {
      clearTimeout(handler); // 연속 입력 시 불필요한 요청 방지
    };
  }, [keyword]);

  // API 호출
  useEffect(() => {
    const getSearch = async () => {
      if (!debouncedKeyword.trim()) return;
      try {
        const res = await searchTodos(member!, debouncedKeyword);
        console.log(res);
        setSearchData(res.content);
      } catch (error) {
        console.error('API 호출 실패 :', error);
      }
    };

    if (debouncedKeyword.length > 1) {
      getSearch();
    }
  }, [debouncedKeyword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setSearchKeyword(e.target.value);
  };

  return (
    <div className="px-4 py-2 flex w-full items-center justify-between sm:gap-4 gap-1 h-20 bg-neutral-200/20">
      <div className="flex sm:gap-4 gap-1 items-center">
        <div className="pr-2">
          <button onClick={toggleSidebar} className="cursor-pointer">
            <MenuOutlined />
          </button>
        </div>
        {/* logo */}
        <div className="max-w-32 min-w-24 border p-1 rounded-full border-amber-300 hover:bg-amber-200/20 duration-500">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      {/* search bar */}
      <div className="flex md:h-14 max-w-[720px] w-full h-12 group relative">
        <input
          onChange={handleChange}
          value={keyword}
          type="text"
          placeholder="제목, 설명, 카테고리 검색"
          className="w-full border border-neutral-300 focus:border-amber-300 rounded-l-full focus:outline-none px-6 duration-200 text-2xl placeholder:text-neutral-400"
        />
        <button
          onClick={() => {
            navigate('/result');
            setRefreshState(refreshState);
          }}
          className="border w-14 flex cursor-pointer items-center justify-center rounded-r-full pr-2 bg-neutral-200 border-l-0 border-neutral-300 
      hover:bg-amber-300/30 hover:border-amber-300 
      group-focus-within:bg-amber-100/20 group-focus-within:border-amber-300 duration-200">
          <SearchOutlined style={{ fontSize: '150%' }} />
        </button>
        {keyword && (
          <div className="w-full h-full bg-white absolute md:top-14 top-12 left-0 z-10">
            <SearchView
              searchData={searchData}
              setKeyword={() => setKeyword('')}
            />
          </div>
        )}
      </div>
      {/* Login */}
      <Auth />
    </div>
  );
};

export default Navbar;
