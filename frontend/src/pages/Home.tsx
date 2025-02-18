import { useUser } from '@clerk/clerk-react';
import ReactCal from '../components/home/ReactCal';
import Login from '../components/layout/Login';
import useCalendarStore from '../stores/calendarStore';
import clsx from 'clsx';
import SimpleTodo from '../components/home/SimpleTodo';
import TodoForm from '../components/home/TodoForm';
import { useState } from 'react';
import { formatDate } from '../utils/date';
import { Tag } from 'antd';

export default function Home() {
  const { isSignedIn } = useUser();
  const { selectedDate } = useCalendarStore();
  const [addBtn, setAddBtn] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center gap-4 sm:gap-8 lg:gap-16 lg:flex-row shrink-0">
      <ReactCal />
      <div
        className={clsx(
          selectedDate != null &&
            'border bg-amber-50 rounded-xl border-neutral-200 shadow lg:w-[500px]',
        )}>
        {/* 선택된 날짜 */}
        {selectedDate != null && (
          <div className="mt-2 relative md:p-6 p-4">
            <div className="text-md font-semibold text-center">
              {formatDate(selectedDate)}
            </div>
            <div className="lg:overflow-y-auto lg:h-[700px] h-full pt-2">
              {!addBtn ? (
                <SimpleTodo addBtn={addBtn} />
              ) : (
                <TodoForm setAddBtn={() => setAddBtn(() => !addBtn)} />
              )}
            </div>
            <div
              onClick={() => setAddBtn(!addBtn)}
              className="absolute top-3 right-4 font-bold p-2">
              <Tag className="cursor-pointer">{!addBtn ? 'add' : 'view'}</Tag>
            </div>
          </div>
        )}
      </div>
      {!isSignedIn && <Login />}
    </div>
  );
}
