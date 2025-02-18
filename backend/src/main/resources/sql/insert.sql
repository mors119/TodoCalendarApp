INSERT INTO todo (title, description, starts, ends, complete, priority, category, user_id)
VALUES
    ('제출기한 확인', '과제 제출 기한은 최대 7일입니다.', NOW(), NOW() + INTERVAL 7 DAY, 0, 'A', '과제 준비', ':userId'),
    ('과제 평가 및 인터뷰 준비', '과제 제출 후 최대 7일 내 평가 및 인터뷰 진행', NOW(), NOW() + INTERVAL 7 DAY, 0, 'A', '과제 준비', ':userId'),
    ('인터뷰 준비', '제출한 과제를 기반으로 질문하며, 인성 위주로 진행됨', NOW(), NOW() + INTERVAL 7 DAY, 0, 'B', '인터뷰 준비', ':userId'),
    ('프론트엔드 + 백엔드 수행 여부 확인', '프론트엔드 & 백엔드 과제를 함께 수행 시 가산점 부여', NOW(), NOW() + INTERVAL 7 DAY, 0, 'A', '과제 준비', ':userId'),
    ('GitHub Repo 생성', 'GitHub에 레포지토리를 생성하고 과제 소스를 관리', NOW(), NOW() + INTERVAL 3 DAY, 0, 'A', '개발 준비', ':userId'),
    ('README.md 작성', '프로젝트 설명, 실행 방법, 주요 라이브러리 및 API 명세 포함', NOW(), NOW() + INTERVAL 3 DAY, 0, 'A', '개발 문서화', ':userId'),
    ('할일 (ToDo) 또는 일정 (Calendar) 앱 개발', 'React + Ant Design을 사용하여 개발 진행', NOW(), NOW() + INTERVAL 7 DAY, 0, 'A', '프론트엔드 개발', ':userId'),
    ('백엔드 API 개발', 'Spring Boot 또는 Vert.X를 사용하여 API 개발', NOW(), NOW() + INTERVAL 7 DAY, 0, 'A', '백엔드 개발', ':userId'),
    ('Swagger 설정', 'API 명세를 Swagger로 문서화하여 확인 가능하도록 설정', NOW(), NOW() + INTERVAL 5 DAY, 0, 'B', '백엔드 개발', ':userId'),
    ('테스트 코드 작성', 'JUnit을 사용하여 기본 CRUD 및 추가 기능 테스트 작성', NOW(), NOW() + INTERVAL 6 DAY, 0, 'A', '백엔드 개발', ':userId'),
    ('추가 기능 구현', '기본 기능 외 1개 이상의 부가 기능 구현 (예: 일정 공유)', NOW(), NOW() + INTERVAL 7 DAY, 0, 'A', '기능 확장', ':userId'),
    ('과제 제출 및 실행 확인', 'GitHub에 소스를 업로드하고 실행이 가능한지 검토', NOW(), NOW() + INTERVAL 7 DAY, 0, 'A', '과제 제출', ':userId')
;
