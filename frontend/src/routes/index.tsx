import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import ProtectedRoute from './protectedRoute';

const Home = lazy(() => import('../pages/Home'));
const Todo = lazy(() => import('../pages/Todo'));
const Calendar = lazy(() => import('../pages/Calendar'));
const Result = lazy(() => import('../pages/Result'));
const NotFound = lazy(() => import('../pages/NotFound'));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="text-xl font-bold flex justify-center items-center">
          <LoadingOutlined />
          로딩 중...
        </div>
      }>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/todo" element={<Todo />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/result" element={<Result />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
