import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const ProtectedRoute = () => {
  const { isSignedIn } = useUser(); // ✅ 로그인 여부 확인
  return isSignedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
