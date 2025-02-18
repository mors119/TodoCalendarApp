package com.example.backend.controller;

import com.example.backend.entity.Todo;
import com.example.backend.model.CalendarResponse;
import com.example.backend.model.TodoRequest;
import com.example.backend.service.TodoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/todos")
@RestController
@Tag(name = "Todo API", description = "할 일(Todo) 관리 API") // API 그룹 지정
public class TodoController {

    private final TodoService todoService;

    @GetMapping("/all")
    @Operation(summary = "모든 TODO 목록 조회", description = "모든 TODO 목록을 Pagination을 적용하여 조회")
    @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json"))
    public ResponseEntity<Page<Todo>> getAllTitle(
            @Parameter(description = "사용자(Clerk) ID", example = "user_2t3nspGX5YffVAadfadfSbXsCXS") @RequestParam String userId,
            @Parameter(description = "페이지 번호 (기본값: 0)", example = "0") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "페이지 크기 (기본값: 3)", example = "3") @RequestParam(defaultValue = "3") int size,
            @Parameter(description = "정렬 기준", example = "A(priority)") @RequestParam(required = false) String sort
    ) {
        Page<Todo> todolist = todoService.findAllByUserId(userId, page, size, sort);
        return ResponseEntity.ok(todolist);
    }

    @GetMapping("/dateAll")
    @Operation(summary = "선택된 날짜의 TODO 목록 조회", description = "특정 날짜에 작성된 TODO 목록을 조회")
    @ApiResponse(responseCode = "200", description = "조회 성공")
    public ResponseEntity<List<Todo>> getTodosByDate(
            @Parameter(description = "사용자(Clerk) ID", example = "user_2t3nspGX5YffVAadfadfSbXsCXS") @RequestParam String userId,
            @Parameter(description = "조회할 날짜 (YYYY-MM-DD 형식)", example = "2024-02-20") @RequestParam String date
    ) {
        LocalDate day = LocalDate.parse(date);
        List<Todo> todos = todoService.getTodosByDate(userId, day);
        return ResponseEntity.ok(todos);
    }

    @PostMapping("/insert")
    @Operation(summary = "새로운 TODO 추가", description = "새로운 TODO를 추가")
    @ApiResponse(responseCode = "201", description = "TODO 추가 성공")
    public ResponseEntity<String> insertTodo(@RequestBody TodoRequest todoData) {
        Todo todo = new Todo();
        todo.setTitle(todoData.getTitle());
        todo.setDescription(todoData.getDescription());

        if (todoData.getStarts() != null && !todoData.getStarts().isBlank()) {
            todo.setStarts(LocalDate.parse(todoData.getStarts()).atStartOfDay());
            todo.setEnds(todoData.getEnds() != null && !todoData.getEnds().isBlank() ?
                    LocalDate.parse(todoData.getEnds()).atStartOfDay() :
                    LocalDate.parse(todoData.getStarts()).atStartOfDay());
        }

        todo.setPriority(todoData.getPriority());
        todo.setUserId(todoData.getUserId());
        todo.setCategory(todoData.getCategory());
        todoService.insertTodo(todo);

        return ResponseEntity.ok("insert success");
    }

    @GetMapping("/complete")
    @Operation(summary = "TODO 완료 상태 변경", description = "TODO의 완료 상태를 업데이트")
    @ApiResponse(responseCode = "200", description = "상태 변경 성공")
    public ResponseEntity<String> complete(
            @Parameter(description = "TODO ID", example = "1") @RequestParam String id
    ) {
        todoService.toggleComplete(Long.parseLong(id));
        return ResponseEntity.ok("complete success");
    }

    @GetMapping("/calendar")
    @Operation(summary = "데이터 조회", description = "캘린더에 들어갈 id, title, starts, ends, complete 를 전체 조회")
    @ApiResponse(responseCode = "200", description = "캘린더 데이터 반환 성공")
    public ResponseEntity<List<CalendarResponse>> calendar(
            @Parameter(description = "사용자 ID", example = "user_123456") @RequestParam String userId
    ) {
        List<CalendarResponse> data = todoService.getCalendarData(userId);
        return ResponseEntity.ok(data);
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "TODO 삭제", description = "지정된 ID의 TODO를 삭제")
    @ApiResponse(responseCode = "204", description = "삭제 성공")
    public ResponseEntity<Void> delete(
            @Parameter(description = "TODO ID", example = "1") @PathVariable long id
    ) {
        todoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    @Operation(summary = "TODO 업데이트", description = "지정된 ID의 TODO 정보를 업데이트")
    @ApiResponse(responseCode = "200", description = "업데이트 성공")
    public ResponseEntity<Void> update(
            @Parameter(description = "TODO ID", example = "1") @PathVariable long id,
            @RequestBody Map<String, String> todo
    ) {
        todoService.updateById(id, todo);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/search")
    @Operation(summary = "TODO 검색", description = "카테고리, 제목, 내용으로 TODO를 검색")
    @ApiResponse(responseCode = "200", description = "검색 성공")
    public ResponseEntity<Page<Todo>> searchTodos(
            @Parameter(description = "검색 키워드", example = "운동") @RequestParam String keyword,
            @Parameter(description = "사용자(Clerk) ID", example = "user_2t3nspGX5YffVAadfadfSbXsCXS") @RequestParam String userId,
            @Parameter(description = "페이지 번호 (기본값: 0)", example = "0") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "페이지 크기 (기본값: 3)", example = "5") @RequestParam(defaultValue = "5") int size
    ) {
        Page<Todo> todos = todoService.searchTodos(keyword, userId, page, size);
        return ResponseEntity.ok(todos);
    }

    @GetMapping("/count")
    @Operation(summary = "일치하는 작성자 조회", description = "더미데이터 삽입을 위해 작성자 중 현재 userId와 일치하는 작성자 조회")
    @ApiResponse(responseCode = "200", description = "전송 성공")
    public ResponseEntity<Integer> getTodoCount(
            @Parameter(description = "사용자(Clerk) ID", example = "user_2t3nspGX5YffVAadfadfSbXsCXS") @RequestParam String userId
    ) {
        int count = todoService.countUserTodos(userId);
        return ResponseEntity.ok(count);
    }

}
