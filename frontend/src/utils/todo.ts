// 정렬 조건
export const SortType = Object.freeze({
  CLOSEST: 'closest',
  HARDEST: 'hardest',
  IN_PROGRESS: 'inProgress',
  ALL: 'all',
});

export const PriorityType = Object.freeze({
  HIGH: 'A',
  MEDIUM: 'B',
  LOW: 'C',
});

export const PriorityCharToString = (char: string) => {
  if (char === 'A') {
    return 'HIGH';
  }
  if (char === 'B') {
    return 'MEDIUM';
  }
  if (char === 'C') {
    return 'LOW';
  }
};

export const convertToEnum = (sort: string) => {
  return sort.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
};
