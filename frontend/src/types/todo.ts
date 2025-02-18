// todo
export interface todoType {
  id: number;
  title: string;
  description: string;
  starts: string;
  ends: string;
  complete: number;
  priority: string;
  category: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// insert 타입
export interface newTodoType {
  title: string;
  description: string;
  starts: string;
  ends: string;
  priority: string;
  category: string;
  userId: string;
}
