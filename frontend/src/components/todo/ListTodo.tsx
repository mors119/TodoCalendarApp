import { useEffect, useState } from 'react';
import { Card, Tag, List, message, Modal } from 'antd';
import { deleteTodo, fetchTodos, changeComplete } from '../../api/todoApi';
import Pagination from '../ui/pagination';
import { CaretRightOutlined, CheckCircleOutlined } from '@ant-design/icons';
import usePaginationStore from '../../stores/paginationStore';
import { todoType } from '../../types/todo';
import { PriorityCharToString } from '../../utils/todo';
import { formatDate } from '../../utils/date';
import useTodoStore from '../../stores/todoStore';
import useMemberStore from '../../stores/memberStore';

export default function TodoList({
  query,
  add,
}: {
  query: string;
  add: boolean;
}) {
  const { currentPage, setTotalPages } = usePaginationStore();
  const { setEditTodo, editTodo } = useTodoStore();
  const [todos, setTodos] = useState<todoType[]>([]);
  const [refresh, setRefresh] = useState<number>(0); //  refresh 관리 개선
  const { member } = useMemberStore();

  // 할 일 목록 불러오기
  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos(member!, currentPage - 1, query);
        setTodos(data.content);
        setTotalPages(data.totalPages);
      } catch {
        console.error('Todo 목록 로딩 오류');
      }
    };
    getTodos();
  }, [currentPage, refresh, query, !add]);

  // 수정 시 목록 갱신
  useEffect(() => {
    setRefresh((prev) => prev + 1);
  }, [editTodo]);

  // 완료 상태 변경 핸들러
  const handleComplete = async (todo: todoType) => {
    await changeComplete(todo.id);
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id ? { ...t, complete: t.complete === 1 ? 0 : 1 } : t,
      ),
    );
    setRefresh((prev) => prev + 1);
  };

  return (
    <div>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item>
            <Card title={todo.title} className="shadow-md">
              <p className="text-gray-600">{todo.description}</p>

              <div className="mt-2 flex justify-between items-center mb-2">
                {todo.category ? (
                  <Tag color="blue">{todo.category}</Tag>
                ) : (
                  <div></div>
                )}
                <Tag color={todo.priority === 'A' ? 'red' : 'orange'}>
                  {PriorityCharToString(todo.priority)}
                </Tag>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {formatDate(todo.starts)} ~ {formatDate(todo.ends)}
              </p>

              <div className="flex justify-between">
                {/* 완료 상태 변경 */}
                <Tag
                  className="cursor-pointer"
                  color={todo.complete === 1 ? 'green' : 'red'}
                  onClick={() => handleComplete(todo)}>
                  {todo.complete ? (
                    <span>
                      완료됨&nbsp;&nbsp;
                      <CheckCircleOutlined />
                    </span>
                  ) : (
                    <span>
                      진행 중&nbsp;&nbsp;
                      <CaretRightOutlined />
                    </span>
                  )}
                </Tag>

                {/* 수정 및 삭제 */}
                <div className="flex">
                  <Tag
                    color="yellow"
                    className="cursor-pointer"
                    onClick={() => setEditTodo(todo)}>
                    수정하기
                  </Tag>
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
            </Card>
          </List.Item>
        )}
      />
      {/* 페이징 컴포넌트 */}
      <div className="flex justify-center mt-2 sm:mt-4">
        <Pagination />
      </div>
    </div>
  );
}
