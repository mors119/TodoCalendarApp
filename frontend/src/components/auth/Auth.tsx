import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from '@clerk/clerk-react';
import { LoginOutlined } from '@ant-design/icons';
import useMemberStore from '../../stores/memberStore';
import { useEffect } from 'react';
import { message, Modal } from 'antd';
import { getTodoCount, executeQuery } from '../../api/todoApi';

export default function Auth() {
  const { user } = useUser();
  const { setMember, member } = useMemberStore();

  useEffect(() => {
    const checkTodos = async () => {
      if (!user || user.id === member) return; // user 정보 없거나 이미 설정된 경우 실행 안 함

      const hasChecked = localStorage.getItem('checkedTodos'); // 로컬 스토리지 확인
      if (hasChecked) return; // 이미 체크한 경우 중복 실행 방지

      try {
        const count = await getTodoCount(user.id);
        if (count === 0) {
          Modal.confirm({
            title: 'TODO가 없습니다.',
            content: '더미 데이터를 추가하시겠습니까?',
            onOk: async () => {
              await executeQuery(user.id);
              message.success('더미 데이터가 추가되었습니다.');
              localStorage.setItem('checkedTodos', 'true'); // 더미 추가 여부 저장
            },
          });
        }
      } catch (error) {
        console.error('TODO 개수 확인 실패:', error);
      }
    };

    setMember(user?.id || ''); // user.id가 없으면 빈 값 설정
    checkTodos();
  }, [user]);

  return (
    <div className="max-w-32 min-w-24 text-center">
      <SignedIn>
        <SignOutButton>
          <button className="flex gap-2 px-4 py-2 max-w-32 min-w-26 h-12 items-center text-sm font-medium border duration-200 hover:bg-amber-300/20 hover:border-amber-500/20 rounded-full shadow-none [&_svg]:size-4 cursor-pointer">
            <UserButton />
            Sign out
          </button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="flex gap-2 px-4 py-2 max-w-32 min-w-26 h-12 items-center text-sm font-medium border duration-200 hover:bg-amber-300/20 hover:border-amber-500/20 rounded-full shadow-none [&_svg]:size-4 cursor-pointer">
            <LoginOutlined />
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
