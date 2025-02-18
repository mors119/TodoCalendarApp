package com.example.backend.controller;

import com.example.backend.entity.Todo;
import com.example.backend.model.CalendarResponse;
import com.example.backend.model.TodoRequest;
import com.example.backend.service.TodoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Map;

import static org.mockito.ArgumentMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TodoController.class)
public class TodoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    // ISSUE: MockBean을 사용할 수 없는 이슈 @InjectMocks와 컨트롤러로 대체
    @MockitoBean
    private TodoService todoService;

    @Autowired
    private ObjectMapper objectMapper;

    private Todo testTodo;



    @BeforeEach
    void setup() {
        testTodo = new Todo();
        testTodo.setId(1L);
        testTodo.setTitle("운동하기");
        testTodo.setDescription("헬스장에서 1시간 운동");
        testTodo.setStarts(LocalDate.now().atStartOfDay());
        testTodo.setEnds(LocalDate.now().plusDays(1).atStartOfDay());
        testTodo.setPriority("A");
        testTodo.setUserId("user_123456");
    }

    // 모든 TODO 조회  
    @Test
    void testGetAllTodos() throws Exception {
        Mockito.when(todoService.findAllByUserId(anyString(), anyInt(), anyInt(), anyString()))
                .thenReturn(null);

        mockMvc.perform(get("/todos/all")
                        .param("userId", "user_123456")
                        .param("page", "0")
                        .param("size", "3"))
                .andExpect(status().isOk());
    }

    // 특정 날짜 TODO 조회  
    @Test
    void testGetTodosByDate() throws Exception {
        Mockito.when(todoService.getTodosByDate(anyString(), any(LocalDate.class)))
                .thenReturn(Collections.singletonList(testTodo));

        mockMvc.perform(get("/todos/dateAll")
                        .param("userId", "user_123456")
                        .param("date", "2024-02-20"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("운동하기"));
    }

    // TODO 추가  
    @Test
    void testInsertTodo() throws Exception {
        TodoRequest request = new TodoRequest();
        request.setTitle("운동하기");
        request.setDescription("헬스장에서 1시간 운동");
        request.setStarts("2024-02-20");
        request.setEnds("2024-02-21");
        request.setPriority("B");
        request.setCategory("운동");
        request.setUserId("user_123456");

        Mockito.doNothing().when(todoService).insertTodo(any(Todo.class));

        mockMvc.perform(post("/todos/insert")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    // TODO 완료 상태 변경  
    @Test
    void testCompleteTodo() throws Exception {
        Mockito.doNothing().when(todoService).toggleComplete(anyLong());

        mockMvc.perform(get("/todos/complete")
                        .param("id", "1"))
                .andExpect(status().isOk());
    }

    // TODO 조회  
    @Test
    void testGetCalendarData() throws Exception {
        Mockito.when(todoService.getCalendarData(anyString()))
                .thenReturn(Collections.singletonList(new CalendarResponse(1L, "운동하기", 0, LocalDate.now().atStartOfDay(), LocalDate.now().plusDays(1).atStartOfDay())));

        mockMvc.perform(get("/todos/calendar")
                        .param("userId", "user_123456"))
                .andExpect(status().isOk());
    }

    // TODO 삭제  
    @Test
    void testDeleteTodo() throws Exception {
        Mockito.doNothing().when(todoService).deleteById(anyLong());

        mockMvc.perform(delete("/todos/delete/1"))
                .andExpect(status().isNoContent());
    }

    // TODO 업데이트  
    @Test
    void testUpdateTodo() throws Exception {
        Mockito.doNothing().when(todoService).updateById(anyLong(), any(Map.class));

        mockMvc.perform(put("/todos/update/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("title", "새 제목"))))
                .andExpect(status().isOk());
    }

    // TODO 검색  
    @Test
    void testSearchTodos() throws Exception {

        Mockito.when(todoService.searchTodos(anyString(), anyString(), anyInt(), anyInt()))
                .thenReturn(null);

        mockMvc.perform(get("/todos/search")
                        .param("keyword", "운동")
                        .param("userId", "user_123456")
                        .param("page", "0")
                        .param("size", "5"))
                .andExpect(status().isOk());
    }

    // TODO 개수 조회  
    @Test
    void testGetTodoCount() throws Exception {
        Mockito.when(todoService.countUserTodos(anyString()))
                .thenReturn(5);

        mockMvc.perform(get("/todos/count")
                        .param("userId", "user_123456"))
                .andExpect(status().isOk())
                .andExpect(content().string("5"));
    }
}
