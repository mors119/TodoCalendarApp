import {
  OrderedListOutlined,
  CalendarOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router';
import useSidebarStore from '../../stores/sidebarStore';
import clsx from 'clsx';

const Sidebar = () => {
  const { isOpen } = useSidebarStore();
  const currentLocation = useLocation();

  return (
    <div
      className={clsx(
        'duration-200 bg-neutral-200/20',
        isOpen ? 'w-40' : 'w-12',
      )}>
      <div className="flex-col gap-6">
        <div className="p-2 pl-4">
          <Link to="/" className="flex items-center">
            <HomeOutlined />
            <span
              className={clsx(
                'ml-2 pt-1 duration-200',
                isOpen ? 'block' : 'hidden',
                currentLocation.pathname === '/' && 'text-amber-300',
              )}>
              Home
            </span>
          </Link>
        </div>
        <div className="p-2 pl-4">
          <Link to="/calendar" className="flex">
            <CalendarOutlined />
            <span
              className={clsx(
                'ml-2 pt-1 duration-200',
                isOpen ? 'block' : 'hidden',
                currentLocation.pathname === '/calendar' && 'text-amber-300',
              )}>
              Calender
            </span>
          </Link>
        </div>
        <div className="p-2 pl-4">
          <Link to="/todo" className="flex items-center">
            <OrderedListOutlined />
            <span
              className={clsx(
                'ml-2 pt-1 duration-200',
                isOpen ? 'block' : 'hidden',
                currentLocation.pathname === '/todo' && 'text-amber-300',
              )}>
              Todo
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
