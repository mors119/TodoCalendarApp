import {
  OrderedListOutlined,
  CalendarOutlined,
  HomeOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import useSidebarStore from '../../stores/sidebarStore';
import clsx from 'clsx';

const Sidebar = () => {
  const { isOpen } = useSidebarStore();
  const currentLocation = useLocation();

  const menu = [
    {
      title: 'Home',
      link: '/',
      icon: <HomeOutlined />,
    },
    {
      title: 'Calendar',
      link: '/calendar',
      icon: <CalendarOutlined />,
    },
    {
      title: 'Todo',
      link: '/todo',
      icon: <OrderedListOutlined />,
    },
    {
      title: 'Chart',
      link: '/chart',
      icon: <LineChartOutlined />,
    },
  ];

  return (
    <div
      className={clsx(
        'duration-200 bg-neutral-200/20',
        isOpen ? 'w-40' : 'w-12',
      )}>
      <div className="flex flex-col gap-3">
        {menu.map((item) => (
          <div key={item.title} className="p-2 pl-4">
            <Link to={item.link} className="flex items-center">
              {item.icon}
              <span
                className={clsx(
                  'ml-2 pt-1 duration-200',
                  isOpen ? 'block' : 'hidden',
                  currentLocation.pathname === item.link && 'text-amber-300',
                )}>
                {item.title}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
