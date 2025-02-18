import { SignInButton } from '@clerk/clerk-react';
import { GoogleOutlined } from '@ant-design/icons';

export const Login = () => {
  return (
    <div className="absolute top-0 left-0 w-screen">
      <div className="flex flex-col rounded-2xl items-center justify-center bg-neutral-700/50 h-screen w-full">
        <img src="" alt="" />
        <div className="bg-amber-100 p-8 rounded-2xl shadow-lg text-center">
          {/* ✨ 로그인 안내 멘트 */}
          <h1 className="text-2xl font-semibold text-gray-900">
            🚀 원활한 서비스 이용을 위해 <br />
            <span className="text-blue-600">Google 계정</span>으로
            로그인해주세요!
          </h1>
          <p className="text-gray-600 mt-3">
            가입 없이 간편하게 로그인하고 <br />
            개인화된 경험을 누려보세요. 😊
          </p>

          {/* 🟢 Google 로그인 버튼 */}
          <div className="mt-6 ">
            <SignInButton mode="modal">
              <button className="flex items-center cursor-pointer hover:bg-amber-300 justify-center w-full bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg shadow hover:shadow-md transition">
                <GoogleOutlined className="text-2xl mr-2" /> Google로 로그인
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
