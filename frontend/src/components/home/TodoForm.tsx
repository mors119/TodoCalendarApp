import { useState, useEffect } from 'react';
import useCalendarStore from '../../stores/calendarStore';
import { stringToDate } from '../../utils/date';
import { insertTodo } from '../../api/todoApi';
import { newTodoType } from '../../types/todo';
import useMemberStore from '../../stores/memberStore';

export default function TodoForm({ setAddBtn }: { setAddBtn: () => void }) {
  const { selectedDate } = useCalendarStore();
  const { member } = useMemberStore();

  const [newTodo, setNewTodo] = useState<newTodoType>({
    title: '',
    description: '',
    starts: '',
    ends: '',
    priority: 'B',
    category: '',
    userId: member!,
  });

  useEffect(() => {
    if (selectedDate) {
      setNewTodo((prev) => ({
        ...prev,
        starts: stringToDate(selectedDate),
      }));
    }
  }, [selectedDate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title.trim()) {
      alert('제목을 입력하세요');
      return;
    }
    try {
      insertTodo(newTodo);
    } catch (error) {
      console.error('API 요청 실패:', error);
    } finally {
      setNewTodo({
        title: '',
        description: '',
        starts: '',
        ends: '',
        priority: 'B',
        category: '',
        // TODO: Change id value
        userId: member!,
      });
      setAddBtn();
    }
  };

  return (
    <div className="sm:p-4 rounded-md">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3 gap-3">
        {/* 제목 */}
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={newTodo.title}
          onChange={handleChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
        />

        {/* 설명 */}
        <textarea
          name="description"
          placeholder="설명"
          value={newTodo.description}
          onChange={handleChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
        />

        {/* 시작일 & 마감일 */}
        <div className="flex justify-between mb-0">
          <span className="leading-[38px] sm:block hidden">시작&nbsp;</span>
          <input
            type="date"
            name="starts"
            value={newTodo.starts}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
          <span className="flex items-center sm:hidden">~</span>
          <span className="leading-[38px] sm:block hidden">
            &nbsp;종료&nbsp;
          </span>
          <input
            type="date"
            name="ends"
            value={newTodo.ends}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>

        {/* 우선순위 */}
        <div className="w-full px-3 py-2 border rounded-lg mb-0">
          <select
            name="priority"
            value={newTodo.priority}
            onChange={handleChange}
            className="focus:outline-none focus:ring-2 focus:ring-amber-300 w-full">
            <option value="A">🔥 HIGH</option>
            <option value="B">⚡ MEDIUM</option>
            <option value="C">🌱 LOW</option>
          </select>
        </div>

        {/* 카테고리 */}
        <input
          type="text"
          name="category"
          placeholder="카테고리"
          value={newTodo.category}
          onChange={handleChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
        />

        {/* 추가 버튼 */}
        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-amber-300/20 text-white rounded-lg hover:bg-amber-300/50 transition border cursor-pointer">
          추가하기
        </button>
      </form>
    </div>
  );
}
