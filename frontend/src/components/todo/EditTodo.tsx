import { useState, useEffect } from 'react';
import { updateTodo } from '../../api/todoApi';
import useTodoStore from '../../stores/todoStore';
import { todoType } from '../../types/todo';

export default function EditTodo() {
  const { editTodo, resetEditTodo } = useTodoStore();
  const [updatedTodo, setUpdatedTodo] = useState<todoType | null>(null);

  useEffect(() => {
    if (editTodo) {
      setUpdatedTodo(editTodo);
    }
  }, [editTodo]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    if (!updatedTodo) return;
    const { name, value } = e.target;
    setUpdatedTodo((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatedTodo || !updatedTodo.title.trim()) {
      alert('제목을 입력하세요');
      return;
    }

    try {
      await updateTodo(updatedTodo.id, updatedTodo);
      alert('수정 완료');
      resetEditTodo();
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
  };

  return (
    <>
      {updatedTodo && (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 gap-3">
          {/* 제목 */}
          <input
            type="text"
            name="title"
            placeholder="제목"
            value={updatedTodo.title}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
          />

          {/* 설명 */}
          <textarea
            name="description"
            placeholder="설명"
            value={updatedTodo.description}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
          />

          {/* 시작일 & 마감일 */}
          <div className="flex justify-between mb-0 items-center">
            <span className="leading-[38px] sm:block hidden">시작&nbsp;</span>
            <input
              type="date"
              name="starts"
              value={updatedTodo.starts.split('T')[0]}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <span className="leading-[38px] sm:block hidden">
              &nbsp;종료&nbsp;
            </span>
            <span className="sm:hidden block">&nbsp;~&nbsp;</span>
            <input
              type="date"
              name="ends"
              value={updatedTodo.ends.split('T')[0]}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>

          {/* 우선순위 */}
          <div className="w-full px-3 py-2 border rounded-lg mb-0">
            <select
              name="priority"
              value={updatedTodo.priority}
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
            value={updatedTodo.category}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
          />

          {/* 수정 버튼 */}
          <button
            type="submit"
            className="mt-3 px-4 py-2 bg-amber-200/50 text-white rounded-lg hover:bg-amber-300/50 transition border cursor-pointer">
            수정하기
          </button>
        </form>
      )}
    </>
  );
}
