package com.example.backend.controller;

import com.example.backend.service.MainService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MainController.class)
public class MainControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MainService mainService;


    @BeforeEach
    void setup() throws Exception {
        Mockito.doNothing().when(mainService).executeSqlFile(anyString()); // ✅ Mock 설정
    }

    @Test
    void testExecuteSqlFile() throws Exception {
        mockMvc.perform(get("/main/execute")
                        .param("userId", "user_1dsAFSasdawef234ewqrASF56") // ✅ 요청 파라미터 추가
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()); // ✅ HTTP 200 응답 확인
    }
}
