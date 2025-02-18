package com.example.backend.service;

import com.example.backend.entity.Todo;
import com.example.backend.model.CalendarResponse;
import com.example.backend.repository.TodoRepository;
import com.example.backend.utils.SortUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class TodoService {

    private final TodoRepository todoRepository;

    @PersistenceContext
    private EntityManager entityManager;

    // todo 전체 조회 (pagination, sort 적용)
    // ISSUE: Sort.by(Sort.Direction.ASC, "priority");가 알파벳 순서로 정렬 되는 이슈 -> priority 를 a, b, c 로 정렬 하기 쉽도록 변경
    public Page<Todo> findAllByUserId(String userId, int page, int size, String sortType) {
        Sort sort = SortUtil.getSort(sortType);
        Pageable pageable = PageRequest.of(page, size, sort);
        // 캐싱되지 않고 새로 불러올 수 있도록 추가
        entityManager.clear();

        return todoRepository.findAllByUserId(userId, pageable);
    }

    // todo 추가
    public void insertTodo(Todo todo) {
        todoRepository.save(todo);
    }

    // 완료 상태 바꾸기
    public void toggleComplete(Long todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("해당 TODO를 찾을 수 없습니다: " + todoId));
        if(todo.getComplete() == 1) {
            todo.setComplete(0);
        } else {
            todo.setComplete(1);
        }

        todoRepository.save(todo);
    }

    // 선택된 날짜의 todo 조회
    public List<Todo> getTodosByDate(String userId, LocalDate date) {
        return todoRepository.findTodosByDate(userId, date);
    }

    // title, starts, ends, id, complete 만 전체 조회
    public List<CalendarResponse> getCalendarData (String userId) {
        return todoRepository.getCalendarData(userId);
    }

    // todo 삭제
    public void deleteById(long id) {
        todoRepository.deleteById(id);
    }

    // todo 업데이트
    public void updateById(long id, Map<String, String> todoData) {
        System.out.println("id = " + id);

        Optional<Todo> existingTodoOpt = todoRepository.findById(id);

        if (existingTodoOpt.isPresent()) {
            Todo existingTodo = existingTodoOpt.get();

            // 업데이트할 필드만 변경 (null 값은 무시)
            if (todoData.containsKey("title")) existingTodo.setTitle(todoData.get("title"));
            if (todoData.containsKey("description")) existingTodo.setDescription(todoData.get("description"));
            if (todoData.containsKey("starts")) existingTodo.setStarts(LocalDateTime.parse(todoData.get("starts")));
            if (todoData.containsKey("ends")) existingTodo.setEnds(LocalDateTime.parse(todoData.get("ends")));
            if (todoData.containsKey("complete")) existingTodo.setComplete(Integer.parseInt(todoData.get("complete")));
            if (todoData.containsKey("priority")) existingTodo.setPriority(todoData.get("priority"));
            if (todoData.containsKey("category")) existingTodo.setCategory(todoData.get("category"));

            // 업데이트 시간 갱신
            existingTodo.setUpdatedAt(LocalDateTime.now());

            todoRepository.save(existingTodo);

            System.out.println(" 업데이트 완료: " + existingTodo);
        } else {
            System.out.println("🚨 업데이트 실패: 해당 ID의 Todo가 존재하지 않음");
        }
    }

    // 검색
    public Page<Todo> searchTodos(String keyword, String userId, int page, int size) {
        if (keyword == null || keyword.isBlank()) {
            return Page.empty();
        }
        entityManager.clear();

        Pageable pageable = PageRequest.of(page, size);
        return todoRepository.searchTodos(keyword, userId, pageable);
    }

    // user id가 일치하는 todo개수 조회
    public int countUserTodos(String userId) {
        return todoRepository.countTodosByUserId(userId);
    }
}
