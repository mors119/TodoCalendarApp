package com.example.backend.controller;

import com.example.backend.service.MainService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/main")
@Tag(name = "Main API", description = "기본 실행 API")
public class MainController {

    private final MainService mainService;

    @GetMapping("/execute")
    @Operation(summary = "기본 더미 데이터 SQL", description = "기본 TODO 데이터를 삽입")
    public ResponseEntity<Void> execute(
            @Parameter(description = "사용자(clerk) ID", example = "user_1dsAFSasdawef234ewqrASF56") @RequestParam String userId
    ) throws IOException {
        mainService.executeSqlFile(userId);
        return ResponseEntity.ok().build();
    }
}
