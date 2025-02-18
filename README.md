# **TodoCalendarApp**
![logo](https://github.com/user-attachments/assets/a850198e-0b1f-450b-85b4-c2b7aa1eb80d)

![React](https://img.shields.io/badge/React-19.0-blue?logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-green?logo=springboot)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?logo=mysql)

## 📝 프로젝트 개요


**TodoCalendarApp**은 **React + Spring Boot** 기반으로 **할 일 관리(TODO)와 일정(Calendar)를 결합한 웹 애플리케이션**입니다.  
사용자는 간편한 인터페이스를 통해 **할 일을 추가, 수정, 삭제**하고, **일정과 연동하여 계획을 시각적으로 확인**할 수 있습니다.

### **🌟 핵심 목표**

- **캘린더와 연동된 TODO 리스트를 웹에서 간편하게 관리**
- **한눈에 진행 상황을 파악하고 체크할 수 있는 UI 제공**
- **사용자 경험(UX)을 고려한 깔끔한 디자인 적용**

---
![favicon](https://github.com/user-attachments/assets/31ea147f-5c40-4dc2-9760-af5ea338871c)

## **🚀 사용 기술 (Tech Stack)**

### **📌 Frontend**

- **React.js** – 최신 버전 React 활용
- **Ant Design** – 깔끔한 UI 디자인 적용
- **Zustand** – 전역 상태 관리
- **TypeScript** – 타입 안정성을 위한 TS 적용

### **📌 Backend**

- **Spring Boot 3.0** – REST API 서버 개발
- **JPA (Hibernate)** – ORM 기반 데이터 관리
- **MySQL 8.0** – 관계형 데이터베이스
- **Swagger** – API 문서 자동화

---

### **✅ 프론트엔드 실행**

```sh
git clone https://github.com/mors119/TodoCalendarApp.git
cd TodoCalendarApp/frontend
npm install  # 또는 yarn install
npm start
```

- `localhost:3000`에서 앱을 확인할 수 있습니다.

### **✅ 백엔드 실행 (Spring Boot API 서버)**

```sh
cd backend
./gradlew build
java -jar build/libs/backend-0.0.1-SNAPSHOT.jar
```

- `localhost:8082`에서 API 서버가 실행됩니다.
- Swagger를 통해 API 문서를 확인할 수 있습니다. (`http://localhost:8082/swagger-ui.html`)

---

# **🖥️ 프론트엔드 (Frontend) 설명**

## **1️⃣ 프론트엔드 개요**

### **📌 주요 기능**

- **할 일 관리 (CRUD)** – 할 일을 추가, 수정, 삭제 가능
- **캘린더와 연동** – 특정 날짜에 할 일을 배정할 수 있음
- **완료 체크 기능** – 할 일 완료 여부 확인
- **리마인더 알림 기능** – 중요 일정 알림 설정

---

---

```sh
├── public
│   └── favicon.png
└─── src
    ├── App.tsx
    ├── api
    │   ├── axiosControl.ts
    │   └── todoApi.ts
    ├── assets
    │   └── logo.png
    ├── components
    │   ├── auth
    │   │   └── Auth.tsx
    │   ├── home
    │   │   ├── ReactCal.tsx
    │   │   ├── SimpleTodo.tsx
    │   │   └── TodoForm.tsx
    │   ├── layout
    │   │   ├── Loading.tsx
    │   │   ├── Login.tsx
    │   │   ├── Navbar.tsx
    │   │   └── Sidebar.tsx
    │   ├── todo
    │   │   ├── EditTodo.tsx
    │   │   └── ListTodo.tsx
    │   └── ui
    │       ├── pagination.tsx
    │       └── searchbar.tsx
    ├── main.tsx
    ├── pages
    │   ├── Calendar.tsx
    │   ├── CompleteChart.tsx
    │   ├── Home.tsx
    │   ├── NotFound.tsx
    │   ├── Result.tsx
    │   └── Todo.tsx
    ├── routes
    │   ├── index.tsx
    │   └── protectedRoute.tsx
    ├── stores
    │   ├── calendarStore.ts
    │   ├── memberStore.ts
    │   ├── paginationStore.ts
    │   ├── sidebarStore.ts
    │   └── todoStore.ts
    ├── styles
    │   └── index.css
    ├── types
    │   ├── calendar.ts
    │   └── todo.ts
    └─── utils
        ├── date.ts
        ├── download.ts
        ├── generatePagination.ts
        └── todo.ts
```

---

## **2️⃣ 주요 컴포넌트 및 사용 이유**

| 컴포넌트          | 설명                                               |
| ----------------- | -------------------------------------------------- |
| **SimpleTodo**    | 최소한의 UI로도 직관적인 할 일 관리 가능           |
| **Calendar**      | 전체 일정을 한눈에 파악할 수 있도록 캘린더 UI 적용 |
| **ReactCal**      | 할 일을 날짜별로 정렬하고 필터링할 수 있도록 구현  |
| **Search**        | 일정 및 할 일 검색 기능 추가                       |
| **CompleteChart** | 사용자 일정 패턴 분석 및 시각화 (차트 활용)        |

---

## **3️⃣ 추가 기능 설명**

- **🔐 로그인 기능** – Clerk을 이용해 사용자별 일정 관리 적용
- **🔍 검색 기능** – 키워드 검색으로 원하는 일정/할 일 필터링
- **📄 하루 일정 다운로드** – 특정 날짜의 TODO 리스트를 **텍스트 파일**(.txt)로 다운로드
- **📊 데이터 차트 분석** – 완료된 TODO와 미완료된 TODO를 **차트로 시각화**

---

# **🖥️ 백엔드 (Backend) 설명**

## **1️⃣ 백엔드 개요**

Spring Boot 기반의 REST API 서버로, **할 일 관리(TODO) 및 일정(Calendar) 데이터**를 관리하는 역할을 합니다.

- **Spring Boot + JPA** 를 사용하여 MySQL과 원활하게 연동
- **Swagger** 를 통해 API 문서를 자동으로 생성 및 제공
- **TestRestTemplate** 를 사용하여 컨트롤러의 안정성 테스트

---

#### 백엔드 폴더 구조

```sh
├── main
│   ├── java
│   │   └── com
│   │       └── example
│   │           └── backend
│   │               ├── BackendApplication.java
│   │               ├── config
│   │               │   └── WebConfig.java
│   │               ├── controller
│   │               │   ├── MainController.java
│   │               │   └── TodoController.java
│   │               ├── entity
│   │               │   └── Todo.java
│   │               ├── model
│   │               │   ├── CalendarResponse.java
│   │               │   └── TodoRequest.java
│   │               ├── repository
│   │               │   └── TodoRepository.java
│   │               ├── service
│   │               │   ├── MainService.java
│   │               │   └── TodoService.java
│   │               └── utils
│   │                   └── SortUtil.java
│   └── resources
│       ├── application.properties
│       ├── junit-platform.properties
│       ├── sql
│       │   └── insert.sql
│       ├── static
│       └── templates
└── test
    └── java
        └── com
            └── example
                └── backend
                    ├── BackendApplicationTests.java
                    └── controller
                        ├── MainControllerTest.java
                        └── TodoControllerTest.java
```

---

## **2️⃣ API 명세**

📌 **Swagger를 통해 API 문서 자동화**

- `http://localhost:8080/swagger-ui.html` 에서 API 명세 확인 가능

| HTTP Method | 엔드포인트        | 설명                |
| ----------- | ----------------- | ------------------- |
| `GET`       | `/api/todos`      | 전체 TODO 목록 조회 |
| `POST`      | `/api/todos`      | 새로운 할 일 추가   |
| `PUT`       | `/api/todos/{id}` | 특정 할 일 수정     |
| `DELETE`    | `/api/todos/{id}` | 특정 할 일 삭제     |
| `GET`       | `/api/calendar`   | 전체 일정 조회      |
| `POST`      | `/api/calendar`   | 새로운 일정 추가    |

---

## **3️⃣ 데이터베이스 스키마 (MySQL 테이블 구조)**

📌 **ERD 개요**

- `users` – 사용자 정보 저장 (JWT 기반 인증)
- `todos` – 할 일(TODO) 정보 저장
- `calendar` – 일정(Calendar) 정보 저장

```sql
CREATE TABLE TODO (
  ID BIGINT NOT NULL AUTO_INCREMENT,
  USER_ID VARCHAR(255) NOT NULL,
  TITLE VARCHAR(255) NOT NULL,
  DESCRIPTION TEXT,
  CATEGORY VARCHAR(255),
  PRIORITY VARCHAR(10),
  STARTS DATETIME(6) NOT NULL,
  ENDS DATETIME(6) NOT NULL,
  COMPLETE INTEGER NOT NULL,
  CREATED_AT DATETIME(6),
  UPDATED_AT DATETIME(6),
  PRIMARY KEY (ID));
```

---

## **4️⃣ 주요 라이브러리 및 사용 이유**

| 라이브러리                | 사용 이유                                         |
| ------------------------- | ------------------------------------------------- |
| **Spring Boot**           | 빠르고 효율적인 REST API 서버 개발                |
| **JPA (Hibernate)**       | 데이터베이스 연동 및 ORM 사용                     |
| **Lombok**                | 코드 간결화를 위해 사용 (Getter/Setter 자동 생성) |
| **Spring Security + JWT** | 사용자 인증 및 보안 강화를 위해 사용              |
| **Swagger**               | API 문서 자동화                                   |

---

## **5️⃣ 테스트 케이스 작성 및 실행**

📌 **JUnit + Mockito 기반 테스트 케이스 작성**

- `TodoServiceTest` – 할 일 관리 서비스 로직 테스트
- `CalendarServiceTest` – 일정 관리 서비스 로직 테스트
- `UserControllerTest` – 사용자 인증 테스트

```sh
./gradlew test
```

✅ 실행하면 단위 테스트 및 API 테스트 자동 실행됨

---

# **🌟 프로젝트 진행 중 고려한 사항 및 개선점**

✅ **데이터 안정성** – JPA를 활용하여 **데이터 무결성** 유지  
✅ **UX/UI 디자인** – 사용자 경험을 고려한 **직관적인 UI** 제공  
✅ **확장 가능성** – API 확장을 고려한 **모듈화된 설계**

📌 **추가 개선 가능 사항**

- **할 일 알람 기능** – 특정 일정에 대해 알림 기능 추가
- **Drag & Drop UI** – 캘린더에서 할 일을 끌어서 놓기(DnD) 기능 추가
