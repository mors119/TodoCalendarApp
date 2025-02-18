import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 적용
import useCalendarStore from '../../stores/calendarStore';
import { EventType } from '../../types/calendar';
import { usersTodos } from '../../api/todoApi';
import { useEffect, useState } from 'react';
import { RedoOutlined } from '@ant-design/icons';
import useMemberStore from '../../stores/memberStore';
import useTodoStore from '../../stores/todoStore';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece] | null;

export default function ReactCal() {
  const { selectedDate, setSelectedDate } = useCalendarStore();
  const [events, setEvents] = useState<EventType[]>([]);
  const { member } = useMemberStore();
  const { refreshState } = useTodoStore();

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await usersTodos(member!);
        const filteredData = data.filter((todo: any) => todo.complete !== 1);
        setEvents(filteredData);
      } catch {
        console.error('Todo 로딩 오류');
      }
    };
    getTodos();
  }, [member, refreshState]);

  const getEventCount = (date: Date) => {
    return events.filter(
      (event) => new Date(event.starts) <= date && date <= new Date(event.ends),
    ).length;
  };
  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value.toDateString());
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setSelectedDate(value[0].toDateString());
    } else {
      setSelectedDate(null);
    }
  };

  return (
    <div className="border bg-amber-50 p-4 rounded-xl border-neutral-200 shadow text-center flex-col justify-items-center lg:w-[400px]">
      <h2 className="text-lg font-bold text-center mb-4 flex-col flex">
        <span>Calendar</span>
        <span className="text-xs text-rose-400">"진행 중"인 일정만 표시</span>
      </h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate ? new Date(selectedDate) : new Date()}
        tileContent={({ date }) => {
          const eventCount = getEventCount(date);
          return eventCount > 0 ? (
            <div className="text-red-500 font-bold text-xs">{eventCount}</div>
          ) : null;
        }}
      />
      <div
        className="flex mt-5 group justify-center items-center cursor-pointer p-2 hover:bg-amber-300/50 rounded-lg duration-200"
        onClick={() => {
          setSelectedDate(null);
        }}>
        <div className="group-hover:rotate-360 duration-500">
          <RedoOutlined />
        </div>
        <span className="pl-3 text-neutral-400 group-hover:text-neutral-600">
          접기
        </span>
      </div>
    </div>
  );
}
