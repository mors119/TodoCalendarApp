package com.example.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@Schema(description = "캘린더 응답 모델") // ✅ 전체 설명 추가
public class CalendarResponse {

    @Schema(description = "TODO ID", example = "1")
    private Long id;

    @Schema(description = "할 일 제목", example = "운동하기")
    private String title;

    @Schema(description = "완료 여부 (0: 진행 중, 1: 완료)", example = "0")
    private int complete;

    @Schema(description = "시작 날짜 및 시간", example = "2024-02-20T09:00:00")
    private LocalDateTime starts;

    @Schema(description = "마감 날짜 및 시간", example = "2024-02-21T18:00:00")
    private LocalDateTime ends;
}
