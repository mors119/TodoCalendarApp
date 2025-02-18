import { useEffect, useState } from 'react';
import { List, Card, Tag, Pagination, Modal, message } from 'antd';
import { CheckCircleOutlined, CaretRightOutlined } from '@ant-design/icons';
import useTodoStore from '../stores/todoStore';
import useMemberStore from '../stores/memberStore';
import usePaginationStore from '../stores/paginationStore';
import { searchTodos, deleteTodo } from '../api/todoApi';
import { todoType } from '../types/todo';
import { formatDate } from '../utils/date';
import { PriorityCharToString } from '../utils/todo';
import { useLocation } from 'react-router';

export default function Result() {
  const { searchKeyword, setEditTodo, refreshState, setRefreshState } =
    useTodoStore();
  const { member } = useMemberStore();
  const { currentPage, setTotalPages } = usePaginationStore();
  const [todos, setTodos] = useState<todoType[]>([]);
  const location = useLocation();

  const prevUrl: string = location.state?.from;
  useEffect(() => {
    const getSearchResult = async () => {
      if (!searchKeyword) return; // 검색어 없으면 요청하지 않음
      try {
        const res = await searchTodos(
          member!,
          searchKeyword,
          currentPage - 1,
          3,
        );
        setTodos(res.content);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.error('검색 API 호출 실패:', error);
      }
    };
    getSearchResult();
  }, [refreshState, member, currentPage]);

  const handleComplete = async (todo: todoType) => {
    console.log(`완료 상태 변경: ${todo.id}`);
  };

  return (
    <div>
      {prevUrl !== '/calendar' && (
        <h2 className="text-xl font-bold mb-4">
          🔍 검색 결과: "{searchKeyword}"
        </h2>
      )}
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
                          setRefreshState(refreshState);
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
