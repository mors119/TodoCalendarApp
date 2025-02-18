import { PriorityCharToString } from './todo';
export const downloadTxt = (data: any, filename = 'todos.txt') => {
  const txtData = data
    .map(
      (todo: any) =>
        `제목: ${todo.title}\n 설명: ${todo.description}\n 기간: ${
          todo.starts
        } ~ ${todo.ends}\n 우선순위: ${PriorityCharToString(
          todo.priority,
        )}\n\n`,
    )
    .join('------------------------------\n'); // 항목 간 구분선 추가

  const blob = new Blob([txtData], { type: 'text/plain' }); // Blob 객체 생성
  const url = URL.createObjectURL(blob); // URL 생성

  const a = document.createElement('a'); // 임시 링크 생성
  a.href = url;
  a.download = filename; // 다운로드할 파일 이름 지정
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // URL 해제
};
