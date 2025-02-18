import { useState, useEffect } from 'react';
import { changeComplete, deleteTodo, todosByDate } from '../../api/todoApi';
import useCalendarStore from '../../stores/calendarStore';
import { Tag } from 'antd';
import {
  CheckCircleOutlined,
  CaretRightOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { todoType } from '../../types/todo';
import { stringToDate, formatDate } from '../../utils/date';
import EditTodo from '../todo/EditTodo';
import useTodoStore from '../../stores/todoStore';
import clsx from 'clsx';
import useMemberStore from '../../stores/memberStore';
import { DownloadOutlined } from '@ant-design/icons';
import { downloadTxt } from '../../utils/download';
import { Modal, message } from 'antd';

interface SimpleTodoProps {
  dateState?: string;
  addBtn?: boolean;
}

const SimpleTodo = ({ dateState, addBtn }: SimpleTodoProps) => {
  const { editTodo, resetEditTodo, setEditTodo } = useTodoStore();
  const { selectedDate } = useCalendarStore();
  const [todos, setTodos] = useState<todoType[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const { member } = useMemberStore();

  // 할 일 목록 불러오기
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const targetDate = dateState || stringToDate(selectedDate);
        const data = await todosByDate(member!, targetDate);
        const sortData = data.sort((a: any, b: any) => a.complete - b.complete);
        setTodos(sortData);
      } catch (error) {
        console.error(' Todo 로딩 오류:', error);
        setTodos([]);
      }
    };

    fetchTodos();
  }, [selectedDate, dateState, refresh, addBtn]);

  // 완료 상태 토글
  const handleComplete = async (todoId: number) => {
    await changeComplete(todoId);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? { ...todo, complete: todo.complete === 1 ? 0 : 1 }
          : todo,
      ),
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-4 min-h-96">
      {todos.length > 0 ? (
        !editTodo ? (
          todos.map((todo) => (
            <>
              <div className="absolute top-3">
                <Tag
                  onClick={() =>
                    downloadTxt(todos, `todos_${selectedDate}.txt`)
                  }
                  className="mb-4 cursor-pointer">
                  <DownloadOutlined />
                  <span className="text-xs">일정 다운로드</span>
                </Tag>
              </div>
              <div
                key={todo.id}
                className="p-4 bg-amber-400/10 rounded-md mt-2 shadow-md">
                <div className="flex justify-between items-center">
                  <div
                    className="text-lg font-semibold cursor-pointer hover:underline"
                    onClick={() => {
                      setEditTodo(todo);
                    }}>
                    {todo.title}
                  </div>
                  <Tag
                    color={todo.complete === 1 ? 'green' : 'red'}
                    className="cursor-pointer"
                    onClick={() => handleComplete(todo.id)}>
                    {todo.complete ? (
                      <>
                        완료됨&nbsp;&nbsp;
                        <CheckCircleOutlined />
                      </>
                    ) : (
                      <>
                        진행 중&nbsp;&nbsp;
                        <CaretRightOutlined />
                      </>
                    )}
                  </Tag>
                </div>
                <p className="text-neutral-600">{todo.description}</p>
                <div className="flex justify-between">
                  <div className="text-sm text-neutral-400">
                    {formatDate(todo.starts)} ~ {formatDate(todo.ends)}
                  </div>
                  <Tag
                    className="cursor-pointer"
                    onClick={async () => {
                      Modal.confirm({
                        title: '삭제하면 복구되지 않습니다.',
                        content: '데이터를 삭제하시겠습니까?',
                        onOk: async () => {
                          await deleteTodo(todo.id);
                          message.success('데이터가 삭제되었습니다.');
                          setRefresh((prev) => prev + 1);
                        },
                      });
                    }}>
                    삭제하기
                  </Tag>
                </div>
              </div>
            </>
          ))
        ) : (
          <div
            className={clsx(
              'top-0 left-0 bg-neutral-200/20 w-full h-full absolute duration-200 z-50 sm:p-4 justify-center flex items-center',
              editTodo != null
                ? 'translate-x-0 opacity-100'
                : 'translate-x-full opacity-0',
            )}>
            <div className="border border-neutral-500 bg-white h-fit rounded-xl sm:p-4 p-2 shadow md:w-[600px] w-full">
              <div className="sm:px-4 sm:pb-4 rounded-md max-w-[600px]">
                <div className="flex justify-between mb-4">
                  <div></div>
                  <div className="font-bold text-xl">Todo 수정</div>
                  <button
                    className="cursor-pointer w-6 h-6 rounded-sm flex items-center justify-center hover:bg-amber-200/20"
                    onClick={() => {
                      resetEditTodo();
                      setRefresh((prev) => prev + 1);
                    }}>
                    <CloseOutlined className="hover:rotate-180 duration-300" />
                  </button>
                </div>
                <EditTodo />
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="text-center text-neutral-400 mt-4">
          등록된 일정이 없습니다.
        </div>
      )}
    </div>
  );
};

export default SimpleTodo;
