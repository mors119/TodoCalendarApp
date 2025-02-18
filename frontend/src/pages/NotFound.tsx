import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Result
        status="404"
        title="페이지를 찾을 수 없습니다."
        subTitle="요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다."
        extra={
          <Button type="primary" onClick={() => navigate(-1)}>
            🔙 뒤로 가기
          </Button>
        }
      />
    </div>
  );
}
