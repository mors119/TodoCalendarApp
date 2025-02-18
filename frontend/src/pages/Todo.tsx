import TodoList from '../components/todo/ListTodo';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import useTodoStore from '../stores/todoStore';
import { todoType } from '../types/todo';
import EditTodo from '../components/todo/EditTodo';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import TodoForm from '../components/home/TodoForm';
import { SortType } from '../utils/todo';
import usePaginationStore from '../stores/paginationStore';

export default function Todo() {
  const [query, setQuery] = useState<string>(SortType.ALL);
  const [sort, setSort] = useState<string>(SortType.ALL);
  const { editTodo, resetEditTodo } = useTodoStore();
  const [edit, setEdit] = useState<todoType | null>(null);
  const [addBtn, setAddBtn] = useState(false);
  const [depth, setDepth] = useState<string>('');
  const { setCurrentPage } = usePaginationStore();

  useEffect(() => {
    setEdit(editTodo);
    setAddBtn(false);
  }, [editTodo]);

  const handleQuery = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    if (
      name === 'closest' ||
      name === 'hardest' ||
      name === 'inProgress' ||
      name === 'all'
    ) {
      setSort(name);
    } else {
      setDepth(name);
    }
    setCurrentPage(1);
    setQuery(name);
  };

  return (
    <div className="max-w-3xl mx-auto sm:p-4 relative overflow-hidden min-h-[700px]">
      <div>
        {/* Sort */}
        <div
          className={clsx(
            'h-10 flex justify-between items-center text-center text-neutral-500 mb-2',
            sort === 'hardest' || sort === 'inProgress' ? '' : 'mb-4',
          )}>
          <button
            name="closest"
            onClick={handleQuery}
            className={clsx(
              'w-1/4 border border-neutral-300 flex justify-center items-center h-full rounded-l-lg duration-200 cursor-pointer bg-amber-200/20',
              sort === SortType.CLOSEST && 'bg-amber-300/30 border-none',
            )}>
            Latest
          </button>
          <button
            name="hardest"
            onClick={handleQuery}
            className={clsx(
              'w-1/4 border border-neutral-300 flex justify-center items-center h-full duration-200 cursor-pointer bg-amber-200/20',
              sort === SortType.HARDEST && 'bg-amber-300/30 border-none',
            )}>
            Level
          </button>
          <button
            name="inProgress"
            onClick={handleQuery}
            className={clsx(
              'w-1/4 border border-neutral-300 flex justify-center items-center h-full duration-200 cursor-pointer bg-amber-200/20',
              sort === SortType.IN_PROGRESS && 'bg-amber-300/30 border-none',
            )}>
            Progress
          </button>
          <button
            name="all"
            onClick={handleQuery}
            className={clsx(
              'w-1/4 border border-neutral-300 flex justify-center items-center h-full rounded-r-lg duration-200 cursor-pointer bg-amber-200/20',
              sort === SortType.ALL && 'bg-amber-300/30 border-none',
            )}>
            ALL
          </button>
          <div className="w-1/7 justify-end items-center flex">
            <button
              onClick={() => {
                setAddBtn(!addBtn);
                resetEditTodo();
              }}
              className="bg-amber-200/20 w-10 h-10 flex justify-center items-center rounded-full border border-neutral-300 hover:bg-amber-300/50 hover:border-neutral-600 cursor-pointer duration-200">
              <PlusOutlined />
            </button>
          </div>
        </div>
        {/* Depth */}
        {sort === 'hardest' && (
          <div
            className={clsx(
              'w-full mb-4 h-0 flex justify-start duration-300',
              sort === 'hardest' && 'h-8',
            )}>
            <button
              name="HIGH"
              onClick={handleQuery}
              className={clsx(
                'w-1/4 border border-neutral-300 flex justify-center items-center h-full rounded-l-lg duration-200 cursor-pointer bg-amber-200/20',
                depth === 'HIGH' && 'bg-amber-300/30 border-none',
              )}>
              high
            </button>
            <button
              name="MEDIUM"
              onClick={handleQuery}
              className={clsx(
                'w-1/4 border border-neutral-300 flex justify-center items-center h-full duration-200 cursor-pointer bg-amber-200/20',
                depth === 'MEDIUM' && 'bg-amber-300/30 border-none',
              )}>
              medium
            </button>
            <button
              name="LOW"
              onClick={handleQuery}
              className={clsx(
                'w-1/4 border border-neutral-300 flex justify-center items-center h-full rounded-r-lg duration-200 cursor-pointer bg-amber-200/20',
                depth === 'LOW' && 'bg-amber-300/30 border-none',
              )}>
              low
            </button>
          </div>
        )}
        {sort === 'inProgress' && (
          <div
            className={clsx(
              'w-full mb-4 h-0 flex justify-start duration-300',
              sort === 'inProgress' && 'h-8',
            )}>
            <button
              name="RUNNING"
              onClick={handleQuery}
              className={clsx(
                'w-1/4 border border-neutral-300 flex justify-center items-center h-full rounded-l-lg duration-200 cursor-pointer bg-amber-200/20',
                depth === 'RUNNING' && 'bg-amber-300/30 border-none',
              )}>
              running
            </button>
            <button
              name="COMPLETE"
              onClick={handleQuery}
              className={clsx(
                'w-1/4 border border-neutral-300 flex justify-center rounded-r-lg items-center h-full duration-200 cursor-pointer bg-amber-200/20',
                depth === 'COMPLETE' && 'bg-amber-300/30 border-none',
              )}>
              completed
            </button>
          </div>
        )}
        {/* sort 설정 하기 */}
        <TodoList query={query} add={addBtn} />
      </div>
      <div
        className={clsx(
          'top-0 left-0 bg-neutral-200/20 w-full h-full absolute duration-200 z-50 sm:p-4 justify-center flex items-center',
          edit != null || addBtn
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0',
        )}>
        <div className="border border-neutral-500 bg-white h-fit rounded-xl sm:p-4 p-2 shadow md:w-[600px] w-full">
          <div className="sm:px-4 sm:pb-4 rounded-md max-w-[600px]">
            <div className="flex justify-between mb-4">
              <div></div>
              <div className="font-bold text-xl">
                {edit != null && addBtn === false ? 'Todo 수정' : 'Todo 추가'}
              </div>
              <button
                className="cursor-pointer w-6 h-6 rounded-sm flex items-center justify-center hover:bg-amber-200/20"
                onClick={() => {
                  setAddBtn(false);
                  setEdit(null);
                }}>
                <CloseOutlined className="hover:rotate-180 duration-300" />
              </button>
            </div>
            {edit != null && addBtn == false ? (
              <EditTodo />
            ) : (
              <TodoForm setAddBtn={() => setAddBtn(() => !addBtn)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
