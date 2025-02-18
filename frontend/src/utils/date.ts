// string -> date
export const stringToDate = (date: any) => {
  const localDate = new Date(date);
  // ISSUE: 하루가 없어지는 현상 발생, 하루 추가
  localDate.setUTCDate(localDate.getUTCDate() + 1);
  return localDate.toISOString().split('T')[0];
};

// 한국 형식으로 날짜 변환
export const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
};
