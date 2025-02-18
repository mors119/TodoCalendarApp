여기 Swagger API 명세를 GitHub README에 적합한 **Markdown(`.md`) 형식**으로 변환해줄게.

---

## **📌 Swagger API 명세 (`README.md` 형식)**

```md
# 📌 TODO API 문서 (Swagger 기반)

이 문서는 TODO 애플리케이션의 API 명세입니다.  
API는 **할 일 관리(TODO) 기능**을 제공하며, **Clerk 인증**을 기반으로 작동합니다.

## 📌 Base URL
```
http://localhost:8080
```

## 📌 API 목록

| 메서드 | 엔드포인트 | 설명 |
|--------|-------------|----------------------------------|
| `POST` | `/todos/insert` | 새로운 TODO 추가 |
| `GET`  | `/todos/all` | 모든 TODO 목록 조회 (페이징) |
| `GET`  | `/todos/dateAll` | 특정 날짜의 TODO 목록 조회 |
| `GET`  | `/todos/search` | TODO 검색 (제목, 카테고리 등) |
| `PUT`  | `/todos/update/{id}` | 특정 TODO 수정 |
| `DELETE` | `/todos/delete/{id}` | 특정 TODO 삭제 |
| `GET`  | `/todos/complete` | TODO 완료 상태 변경 |
| `GET`  | `/todos/count` | 특정 사용자 TODO 개수 조회 |
| `GET`  | `/todos/calendar` | 캘린더에 표시할 TODO 조회 |
| `GET`  | `/main/execute` | 기본 더미 데이터 삽입 |

---

## 📌 API 상세 명세

### ✅ 1. TODO 추가
새로운 TODO를 추가하는 API입니다.

- **Endpoint:** `POST /todos/insert`
- **요청 본문 (`application/json`):**
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
- **응답 예시 (`201 Created`)**
```json
"TODO 추가 성공"
```

---

### ✅ 2. 모든 TODO 목록 조회 (페이징 지원)
사용자의 모든 TODO를 조회합니다.

- **Endpoint:** `GET /todos/all`
- **쿼리 파라미터**
    - `userId` (필수): 사용자 ID
    - `page` (선택): 페이지 번호 (기본값: `0`)
    - `size` (선택): 페이지 크기 (기본값: `3`)
    - `sort` (선택): 정렬 기준 (`priority` 등)
- **응답 예시 (`200 OK`)**
```json
{
  "content": [
    {
      "id": 1,
      "title": "운동하기",
      "description": "아침 6시에 헬스장에서 운동하기",
      "starts": "2024-02-20T08:00:00",
      "ends": "2024-02-20T09:00:00",
      "complete": 0,
      "priority": "B",
      "category": "운동",
      "userId": "user_123456",
      "createdAt": "2024-02-18T12:00:00",
      "updatedAt": "2024-02-18T12:00:00"
    }
  ],
  "totalPages": 5,
  "totalElements": 15,
  "size": 3,
  "pageable": { "pageNumber": 0, "pageSize": 3 }
}
```

---

### ✅ 3. 특정 날짜의 TODO 목록 조회
- **Endpoint:** `GET /todos/dateAll`
- **쿼리 파라미터**
    - `userId` (필수): 사용자 ID
    - `date` (필수): 조회할 날짜 (YYYY-MM-DD)
- **응답 예시 (`200 OK`)**
```json
[
  {
    "id": 1,
    "title": "운동하기",
    "description": "헬스장에서 운동하기",
    "starts": "2024-02-20T08:00:00",
    "ends": "2024-02-20T09:00:00",
    "complete": 0,
    "priority": "B",
    "category": "운동"
  }
]
```

---

### ✅ 4. TODO 검색 (제목, 카테고리, 설명)
- **Endpoint:** `GET /todos/search`
- **쿼리 파라미터**
    - `keyword` (필수): 검색 키워드
    - `userId` (필수): 사용자 ID
    - `page` (선택): 페이지 번호 (기본값: `0`)
    - `size` (선택): 페이지 크기 (기본값: `5`)
- **응답 예시 (`200 OK`)**
```json
{
  "content": [
    {
      "id": 1,
      "title": "운동하기",
      "description": "아침 6시에 헬스장에서 운동하기",
      "category": "운동"
    }
  ],
  "totalPages": 1,
  "totalElements": 1
}
```

---

### ✅ 5. TODO 업데이트
- **Endpoint:** `PUT /todos/update/{id}`
- **요청 본문 (`application/json`):**
```json
{
  "title": "운동하기 (수정됨)",
  "description": "저녁 7시에 운동",
  "priority": "A"
}
```
- **응답 예시 (`200 OK`)**
```json
"업데이트 성공"
```

---

### ✅ 6. TODO 삭제
- **Endpoint:** `DELETE /todos/delete/{id}`
- **응답 예시 (`204 No Content`)**

---

### ✅ 7. TODO 완료 상태 변경
- **Endpoint:** `GET /todos/complete`
- **쿼리 파라미터**
    - `id` (필수): 완료할 TODO ID
- **응답 예시 (`200 OK`)**
```json
"상태 변경 성공"
```

---

### ✅ 8. 특정 사용자 TODO 개수 조회
- **Endpoint:** `GET /todos/count`
- **쿼리 파라미터**
    - `userId` (필수): 사용자 ID
- **응답 예시 (`200 OK`)**
```json
5
```

---

### ✅ 9. 캘린더에 표시할 TODO 목록 조회
- **Endpoint:** `GET /todos/calendar`
- **쿼리 파라미터**
    - `userId` (필수): 사용자 ID
- **응답 예시 (`200 OK`)**
```json
[
  {
    "id": 1,
    "title": "운동하기",
    "complete": 0,
    "starts": "2024-02-20T08:00:00",
    "ends": "2024-02-20T09:00:00"
  }
]
```

---

### ✅ 10. 기본 더미 데이터 삽입
- **Endpoint:** `GET /main/execute`
- **쿼리 파라미터**
    - `userId` (필수): 사용자 ID
- **응답 예시 (`200 OK`)**
```json
"Insert data into the database"
```

---

## 📌 TODO 모델 (`TodoRequest`)

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

---

## 📌 참고 사항
- `priority` 값:
    - `"A"` → `HIGH`
    - `"B"` → `MEDIUM`
    - `"C"` → `LOW`
- 모든 API 응답은 `JSON` 형식입니다.
- `Clerk ID`를 이용하여 인증이 필요합니다.