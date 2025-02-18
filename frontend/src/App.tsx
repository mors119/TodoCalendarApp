import AppRoutes from './routes';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex h-full flex-1">
        <Sidebar />
        <div className="w-full h-full p-2">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}
