import React, { useEffect, useState } from 'react';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'; // 추가
dayjs.extend(isBetween); // 적용
import { CloseOutlined } from '@ant-design/icons';
import { EventType } from '../types/calendar';
import { usersTodos } from '../api/todoApi';
import SimpleTodo from '../components/home/SimpleTodo';
import clsx from 'clsx';
import useMemberStore from '../stores/memberStore';

// 날짜별 일정 데이터 가져오기
const getListData = (value: Dayjs, events: EventType[]) => {
  return events
    .filter((event) => {
      const start = dayjs(event.starts);
      const end = dayjs(event.ends);
      return value.isBetween(start, end, 'day', '[]');
    })
    .map((event) => ({
      type: event.complete === 1 ? 'success' : 'error',
      content: event.title,
    }));
};

const App: React.FC = () => {
  const { member } = useMemberStore();
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    const getTodos = async () => {
      try {
        // TODO: Change id value
        const data = await usersTodos(member!);
        setEvents(data);
      } catch {
        console.error('Todo 로딩 오류');
      }
    };
    getTodos();
  }, [selectedDate]);

  // 날짜 클릭 시 선택한 날짜 업데이트
  const handleDateSelect = (value: Dayjs) => {
    setSelectedDate(value);
  };

  // 특정 날짜의 이벤트 렌더링
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value, events);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps['status']}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') {
      return dateCellRender(current);
    }
    return info.originNode;
  };

  return (
    <div className="relative">
      <Calendar cellRender={cellRender} onSelect={handleDateSelect} />
      {selectedDate && (
        <div
          className={clsx(
            'top-0 left-0 bg-amber-200/20 w-full h-full absolute duration-200 z-50 p-4 justify-center flex items-center',
            selectedDate
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0',
          )}>
          <div className="border border-neutral-400 bg-white rounded-xl p-4 shadow md:w-[600px] w-full">
            <div className="px-4 pb-4 rounded-md max-w-[600px] h-96 overflow-y-auto relative">
              <div className="flex justify-between mb-4">
                <div></div>
                <div className="font-bold text-xl">
                  {selectedDate.format('YYYY-MM-DD')}
                </div>
                <button
                  className="cursor-pointer w-6 h-6 rounded-sm flex items-center justify-center hover:bg-amber-200/20"
                  onClick={() => {
                    setSelectedDate(null);
                  }}>
                  <CloseOutlined className="hover:rotate-180 duration-300" />
                </button>
              </div>
              <SimpleTodo dateState={selectedDate.format('YYYY-MM-DD')} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
