package com.example.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "TODO 요청 모델") // ✅ 전체 모델 설명 추가
public class TodoRequest {

        @Schema(description = "할 일 제목", example = "운동하기")
        private String title;

        @Schema(description = "할 일 설명", example = "헬스장에서 1시간 운동")
        private String description;

        @Schema(description = "시작 날짜 (YYYY-MM-DD 형식)", example = "2024-02-20")
        private String starts;

        @Schema(description = "마감 날짜 (YYYY-MM-DD 형식, 선택 사항)", example = "2024-02-21")
        private String ends;

        @Schema(description = "우선순위 (A: HIGH, B: MEDIUM, C: LOW)", example = "B")
        private String priority;

        @Schema(description = "카테고리", example = "운동")
        private String category;

        @Schema(description = "사용자 ID", example = "user_123456")
        private String userId;
}
