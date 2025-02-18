# **TodoCalendarApp** 🚀 (Frontend + Backend Full-Stack 프로젝트)

![React](https://img.shields.io/badge/React-19.0-blue?logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-green?logo=springboot)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?logo=mysql)

![logo](https://github.com/user-attachments/assets/a850198e-0b1f-450b-85b4-c2b7aa1eb80d)

## 📝 프로젝트 개요

**TodoCalendarApp**은 **React + Spring Boot** 기반으로 **할 일 관리(TODO)와 일정(Calendar)를 결합한 웹 애플리케이션**입니다.  
사용자는 간편한 인터페이스를 통해 **할 일을 추가, 수정, 삭제**하고, **일정과 연동하여 계획을 시각적으로 확인**할 수 있습니다.

기존의 TODO 앱은 리스트 기반으로만 되어 있어, 사용자가 할 일을 **날짜별로 정리하는 기능이 부족**했습니다.
이 프로젝트에서는 **캘린더와 연동하여, 직관적으로 할 일을 관리할 수 있도록 개발**하는 것이 목표였습니다.
추가적으로, 할 일의 **완료 비율을 시각화**하여, 사용자가 스스로의 생산성을 분석할 수 있도록 차트 기능을 추가했습니다.

### **🌟 핵심 목표**

- **캘린더와 연동된 TODO 리스트를 웹에서 간편하게 관리**
- **한눈에 진행 상황을 파악하고 체크할 수 있는 UI 제공**
- **사용자 경험(UX)을 고려한 깔끔한 디자인 적용**
- **반응형 디자인으로 다양한 디바이스에서 사용성 향상**

---

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

# **🚀 설치 및 사용방법**
![favicon](https://github.com/user-attachments/assets/31ea147f-5c40-4dc2-9760-af5ea338871c)

## **💽 설치 방법**

### **✅ 프론트엔드 실행**

```sh
git clone https://github.com/mors119/TodoCalendarApp.git
cd TodoCalendarApp/frontend
npm install  # 또는 yarn install
npm start
```

- `localhost:5173`에서 앱을 확인할 수 있습니다.
- `.env.local` 파일을 생성하고 Clerk key를 넣어야 합니다.

### **✅ 백엔드 실행 (Spring Boot API 서버)**

```sh
cd backend
./gradlew build
java -jar build/libs/backend-0.0.1-SNAPSHOT.jar
```

- `localhost:8080`에서 API 서버가 실행됩니다.
- Swagger를 통해 API 문서를 확인할 수 있습니다. (`http://localhost:8080/swagger-ui.html`)

---

## 📌 프로젝트 사용 가이드 및 미리보기

### 🎨 첫화면
> 사이트를 이용하려면 반드시 로그인이 필요합니다.

<img src="https://github.com/user-attachments/assets/2b473b42-09b6-4424-b0ae-b7c65113cfef" width="1000" height="574" />

---

### 🔐 로그인
> Google 아이디를 사용하여 로그인합니다.

<img src="https://github.com/user-attachments/assets/fa123681-533f-48ad-b397-973f880a0d2d" width="1000" height="574" />

---

### 📥 데이터 추가하기
> 테스트용 데이터가 필요하면 추가합니다.

<img src="https://github.com/user-attachments/assets/c750e13b-0364-409b-8691-8fdd7385a786" width="1000" height="574" />

---

## 🏠 Root Page

### 📆 날짜 선택하기
> 날짜를 선택하면 선택된 날짜에 할 일을 확인할 수 있습니다. (캘린더에는 완료된 일정은 표시되지 않습니다.)<br>
> 제목을 누르면 수정이 가능하며, 각 버튼을 통해 삭제 및 진행 상태 변경이 가능합니다.

<img src="https://github.com/user-attachments/assets/598a560d-23a9-4f89-ac1c-067217125fa1" width="1000" height="574" />

---

### ➕ 할 일 추가하기
> 우측 상단 `Add` 버튼을 눌러 할 일을 추가할 수 있습니다.

<img src="https://github.com/user-attachments/assets/4b18b88f-c465-4db7-b518-e326ce8206db" width="1000" height="574" />

---

## ✅ Todo Page

### 🗂️ Todo 관리
> Todo 페이지에서는 원하는 데이터를 선택하여 **상단 + 버튼으로 할 일을 추가하고, 리스트의 버튼으로 조회, 수정, 삭제, 완료 상태 변경**이 가능합니다.

<img src="https://github.com/user-attachments/assets/eefd78f1-9aa0-4985-a583-0eb5cc85957d" width="1000" height="574" />

---

## 🔎 Search & Result Page

### 🔍 검색하기
> 검색을 통해 빠르게 필요한 정보를 조회할 수 있습니다.

<img src="https://github.com/user-attachments/assets/79b01680-4b29-4049-af77-bc15f46c7834" width="1000" height="574" />

---

## 🗓️ Calendar Page

### 📅 캘린더 페이지
> 달력의 날짜를 클릭하면 해당 날짜의 할 일을 확인할 수 있습니다.<br>
> 일정 제목을 클릭하면 상세보기 페이지로 이동할 수 있습니다.

<img src="https://github.com/user-attachments/assets/3a2425d1-74ac-4df9-91dc-4aabfd45f6b0" width="1000" height="574" />

---

## 📊 Chart Page

### 📈 차트 보기
> 할 일의 진행 상태와 완료 상태를 한눈에 확인할 수 있습니다.

<img src="https://github.com/user-attachments/assets/b04e7f3a-7688-480a-bb18-88132298ce96" width="1000" height="574" />

---

# **🖥️ 프론트엔드 (Frontend) 설명**

## **1️⃣ 프론트엔드 개요**

React JS 기반의 클라이언트 화면으로, **할 일 관리(TODO) 및 일정(Calendar) 데이터**를 보여주고 사용자 경험을 향상시키는 역할을 합니다.

- **React-Router-Dom** 을 사용하여 SPA 내부에서 페이지 이동과 제한
- **TypeScript** 를 사용하여 타입 안정성을 확보
- **TailwindCSS + clsx** 를 사용하여 빠르게 조건부 스타일링
- **Zustand** 를 사용하여 전역상태 관리
- **Axios** 를 사용하여 서버와 통신
- **Antd** (Ant-Design)을 사용하여 컴포넌트 구성
- **Clerk** 을 통해 안전하고 빠르게 로그인

### **📌 주요 기능**

- **할 일 관리 (CRUD)** – 할 일을 추가, 수정, 삭제 가능
- **캘린더와 연동** – 특정 날짜에 할 일을 배정할 수 있음
- **완료 체크 기능** – 할 일 완료 여부 확인

### 🌟 추가 기능
- ✅ **검색 기능** – 할 일 및 일정 내에서 키워드 검색 지원  
- ✅ **하루 일정 다운로드** – 원하는 날짜의 TODO를 `.txt` 파일로 저장 가능  
- ✅ **데이터 차트 분석** – TODO 완료 비율을 차트로 시각화  
- ✅ **Drag & Drop 지원** – 마우스로 할 일 순서를 변경 가능  
- ✅ **Clerk OAuth 로그인 연동** – Google 계정으로 로그인 가능  
- ✅ **반응형 디자인** – 모바일 & 태블릿에서도 최적 UI 제공  
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
| **Search**        | 할 일 검색 기능 추가                               |
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

#### API 종류

- **Main API**: 기본 실행 API (초기 데이터 관리)
- **Todo API**: 할 일(Todo) 관리 API

### Todo API

#### 1. TODO 추가

| 메소드 | URL             | 설명             |
| ------ | --------------- | ---------------- |
| `POST` | `/todos/insert` | 새로운 TODO 추가 |

#### 요청 본문

```json
{
  "title": "운동하기",
  "description": "헬스장에서 1시간 운동",
  "starts": "2024-02-20",
  "ends": "2024-02-21",
  "priority": "B",
  "category": "운동",
  "userId": "user_123456"
}
```

#### 응답

`201 Created`

---

#### 2. TODO 업데이트

| 메소드 | URL                  | 설명                      |
| ------ | -------------------- | ------------------------- |
| `PUT`  | `/todos/update/{id}` | 지정된 ID의 TODO 업데이트 |

##### 요청 파라미터

- `id` (path): TODO ID (예: `1`)

##### 요청 본문

```json
{
  "title": "운동하기",
  "description": "수영장에서 1시간 운동",
  "priority": "A"
}
```

#### 응답

`200 OK`

---

#### 3. TODO 삭제

| 메소드   | URL                  | 설명                  |
| -------- | -------------------- | --------------------- |
| `DELETE` | `/todos/delete/{id}` | 지정된 ID의 TODO 삭제 |

##### 요청 파라미터

- `id` (path): TODO ID (예: `1`)

##### 응답

`204 No Content`

---

#### 4. TODO 검색

| 메소드 | URL             | 설명                               |
| ------ | --------------- | ---------------------------------- |
| `GET`  | `/todos/search` | 카테고리, 제목, 내용으로 TODO 검색 |

##### 요청 파라미터

- `keyword` (query): 검색 키워드 (예: `운동`)
- `userId` (query): 사용자 ID (예: `user_2t3nspGX5YffVAadfadfSbXsCXS`)
- `page` (query): 페이지 번호 (기본값: `0`)
- `size` (query): 페이지 크기 (기본값: `5`)

##### 응답

`200 OK`

---

#### 5. TODO 완료 상태 변경

| 메소드 | URL               | 설명                      |
| ------ | ----------------- | ------------------------- |
| `GET`  | `/todos/complete` | TODO의 완료 상태 업데이트 |

##### 요청 파라미터

- `id` (query): TODO ID (예: `1`)

##### 응답

`200 OK`

---

#### 6. 특정 날짜의 TODO 목록 조회

| 메소드 | URL              | 설명                  |
| ------ | ---------------- | --------------------- |
| `GET`  | `/todos/dateAll` | 특정 날짜의 TODO 조회 |

##### 요청 파라미터

- `userId` (query): 사용자 ID (예: `user_2t3nspGX5YffVAadfadfSbXsCXS`)
- `date` (query): 조회할 날짜 (예: `2024-02-20`)

##### 응답

`200 OK`

---

#### 7. 캘린더 TODO 조회

| 메소드 | URL               | 설명                             |
| ------ | ----------------- | -------------------------------- |
| `GET`  | `/todos/calendar` | 캘린더에 들어갈 TODO 데이터 조회 |

##### 요청 파라미터

- `userId` (query): 사용자 ID (예: `user_123456`)

##### 응답

`200 OK`

---

#### 8. 모든 TODO 목록 조회 (페이징 적용)

| 메소드 | URL          | 설명                |
| ------ | ------------ | ------------------- |
| `GET`  | `/todos/all` | 모든 TODO 목록 조회 |

##### 요청 파라미터

- `userId` (query): 사용자 ID (예: `user_2t3nspGX5YffVAadfadfSbXsCXS`)
- `page` (query): 페이지 번호 (기본값: `0`)
- `size` (query): 페이지 크기 (기본값: `3`)
- `sort` (query): 정렬 기준 (예: `A(priority)`)

##### 응답

`200 OK`

---

#### 9. 사용자 TODO 개수 조회

| 메소드 | URL            | 설명                                |
| ------ | -------------- | ----------------------------------- |
| `GET`  | `/todos/count` | 사용자 ID와 일치하는 TODO 개수 조회 |

##### 요청 파라미터

- `userId` (query): 사용자 ID (예: `user_2t3nspGX5YffVAadfadfSbXsCXS`)

##### 응답

`200 OK`

---

### Main API

#### 1. 기본 더미 데이터 삽입

| 메소드 | URL             | 설명                       |
| ------ | --------------- | -------------------------- |
| `GET`  | `/main/execute` | 기본 TODO 더미 데이터 삽입 |

##### 요청 파라미터

- `userId` (query): 사용자 ID (예: `user_1dsAFSasdawef234ewqrASF56`)

##### 응답

`200 OK`

---

## **3️⃣ 데이터베이스 스키마 (MySQL 테이블 구조)**

- Cleck을 통해 고유한 유저 Id를 만들수 있었기 때문에, 한 개의 Table만을 사용하였습니다.
  이를 통해 데이터 조회 속도를 높일 수 있었습니다.

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

```sh
./gradlew test
```

✅ 실행하면 단위 테스트 및 API 테스트 자동 실행됨 
(Mock 버전 경고가 있지만 테스트에 영향은 없음)

---

# **🌟 프로젝트 진행 중 고려한 사항 및 개선점**

✅ **데이터 안정성** – JPA를 활용하여 **데이터 무결성** 유지  
✅ **UX/UI 디자인** – 사용자 경험을 고려한 **직관적인 UI** 제공  
✅ **확장 가능성** – API 확장을 고려한 **모듈화된 설계**

📌 **추가 개선 가능 사항**

- **할 일 알람 기능** – 특정 일정에 대해 알림 기능 추가
- **Drag & Drop UI** – 캘린더에서 할 일을 끌어서 놓기(DnD) 기능 추가
