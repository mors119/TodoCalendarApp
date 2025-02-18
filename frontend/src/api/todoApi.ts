import { newTodoType, todoType } from '../types/todo';
import { todos, main } from './axiosControl';
import { convertToEnum } from '../utils/todo';

// todo page 모든 todo 보기 (page 3개씩,  정렬 조건 추가)
export const fetchTodos = async (
  id: string,
  currentPage: number,
  sort: string | null,
) => {
  try {
    if (sort) {
      sort = convertToEnum(sort);
    }
    const response = await todos.get(
      `/all?userId=${id}&page=${currentPage}` + (sort ? `&sort=${sort}` : ''),
    );
    return response.data;
  } catch (error) {
    console.error('API 호출 오류:', error);
    return [];
  }
};

// 날짜 별 todo 보기
export const todosByDate = async (id: string, date: string) => {
  try {
    const response = await todos.get(`/dateAll?userId=${id}&date=${date}`);
    return response.data;
  } catch (error) {
    console.error('API 호출 오류:', error);
    return [];
  }
};

// todo 추가하기
export const insertTodo = async (newTodo: newTodoType) => {
  try {
    const res = await todos.post('/insert', JSON.stringify(newTodo));
    return res.data;
  } catch (error) {
    console.error('API 호출 오류:', error);
  }
};

// 완료 버튼
export const changeComplete = async (id: number) => {
  try {
    await todos.get(`/complete?id=${id}`);
  } catch (error) {
    console.error('API 호출 오류:', error);
  }
};

// pagination 없이 전체 todo (id, title, starts, ends만) 가져오기
export const usersTodos = async (id: string) => {
  try {
    const response = await todos.get(`/calendar?userId=${id}`);
    return response.data;
  } catch (error) {
    console.error('API 호출 오류:', error);
    return [];
  }
};

// 삭제하기
export const deleteTodo = async (id: number) => {
  try {
    await todos.delete(`/delete/${id}`);
  } catch (error) {
    console.error('API 호출 오류:', error);
  }
};

// 업데이트
export const updateTodo = async (id: number, todo: todoType) => {
  try {
    const res = await todos.put(`/update/${id}`, JSON.stringify(todo));
    return res.data;
  } catch (error) {
    console.error('API 호출 오류:', error);
  }
};

// POINT: (size && `` 는 오류 발생. 삼항 연산자 사용할 것)
// 검색하기
export const searchTodos = async (
  id: string,
  keyword: string,
  currentPage?: number,
  size?: number,
) => {
  try {
    console.log(keyword);
    const response = await todos.get(
      `/search?userId=${id}&keyword=${keyword}` +
        (size ? `&page=${currentPage}&size=${size}` : ''),
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('API 호출 오류:', error);
    return [];
  }
};

// 작성한 수 조회
export const getTodoCount = async (userId: string) => {
  const response = await todos.get(`/count?userId=${userId}`);
  return response.data;
};

// 더미 데이터 삽입
export const executeQuery = async (userId: string) => {
  return main.get(`/execute?userId=${userId}`);
};
