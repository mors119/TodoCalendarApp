import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { usersTodos } from '../api/todoApi';
import dayjs from 'dayjs';
import useMemberStore from '../stores/memberStore';
import { Button } from 'antd';
import { BarChartOutlined, LineChartOutlined } from '@ant-design/icons';

interface MonthlyData {
  month: string;
  total: number;
  completed: number;
  completionRate: number; // ✅ 완료 비율 (%)
}

export default function CompleteChart() {
  const { member } = useMemberStore();
  const [chartData, setChartData] = useState<MonthlyData[]>([]);
  const [view, setView] = useState<boolean>(false);

  useEffect(() => {
    if (!member) return;

    const getTodos = async () => {
      try {
        const todos = await usersTodos(member);
        processChartData(todos);
      } catch (error) {
        console.error('📌 월별 데이터 로드 실패:', error);
      }
    };

    getTodos();
  }, [member]); // ✅ member가 변경될 때 다시 실행

  // 월별 데이터 가공
  const processChartData = (todos: any[]) => {
    const monthlyStats: Record<string, { total: number; completed: number }> =
      {};

    todos.forEach((todo) => {
      const month = dayjs(todo.starts).format('YYYY-MM'); // YYYY-MM 형식으로 변환

      if (!monthlyStats[month]) {
        monthlyStats[month] = { total: 0, completed: 0 };
      }

      monthlyStats[month].total += 1;
      if (todo.complete === 1) {
        monthlyStats[month].completed += 1;
      }
    });

    // 데이터 변환
    const formattedData = Object.entries(monthlyStats)
      .map(([month, stats]) => ({
        month,
        total: stats.total,
        completed: stats.completed,
        completionRate:
          stats.total > 0
            ? Math.round((stats.completed / stats.total) * 100)
            : 0,
        unCompletionRate:
          stats.total > 0
            ? Math.round(100 - (stats.completed / stats.total) * 100)
            : 0,
      }))
      .sort((b, a) => b.month.localeCompare(a.month)); // YYYY-MM 기준 내림차순 정렬

    setChartData(formattedData);
  };

  if (chartData.length === 0) {
    return (
      <div className="text-center py-6 text-gray-400">
        📊 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-4 shadow-md rounded-lg">
      <div className="flex justify-center items-center px-5 relative">
        <h2 className="text-lg font-bold mb-4 flex gap-3">
          {!view ? <BarChartOutlined /> : <LineChartOutlined />}
          <span> 월별 완료 비율</span>
        </h2>
        <div className="flex gap-2 absolute right-0 top-0">
          <Button onClick={() => setView(!view)}>
            {view ? (
              <span className="flex gap-1">
                <BarChartOutlined />
                Bar
              </span>
            ) : (
              <span className="flex gap-1">
                <LineChartOutlined />
                Line
              </span>
            )}
          </Button>
        </div>
      </div>

      {!view ? (
        <div>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8524d0" name="전체 할 일" />
              <Bar dataKey="completed" fill="#ff734d" name="완료된 할 일" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="completionRate"
                stroke="#ff7300"
                strokeWidth={2}
                name="완료 비율 (%)"
              />
              <Line
                type="monotone"
                dataKey="unCompletionRate"
                stroke="#573623"
                name="진행 비율 (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
