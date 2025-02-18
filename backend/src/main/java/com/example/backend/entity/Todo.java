package com.example.backend.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "todo")
@Schema(description = "할 일(Todo) 엔티티") // ✅ 엔티티 설명 추가
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "할 일 ID", example = "1")
    private Long id;

    @Column(nullable = false)
    @Schema(description = "할 일 제목", example = "운동하기")
    private String title;

    @Column(columnDefinition = "TEXT")
    @Schema(description = "할 일 설명", example = "아침 6시에 헬스장에서 운동하기")
    private String description;

    @Column(nullable = false)
    @Schema(description = "시작 날짜 및 시간", example = "2024-02-20T09:00:00")
    private LocalDateTime starts;

    @Column(nullable = false)
    @Schema(description = "마감 날짜 및 시간", example = "2024-02-21T09:00:00")
    private LocalDateTime ends;

    @Column(nullable = false)
    @Schema(description = "완료 여부 (0: 진행 중, 1: 완료)", example = "0")
    private int complete = 0;

    @Column(length = 10)
    @Schema(description = "우선순위 (A: HIGH, B: MEDIUM, C: LOW)", example = "B")
    private String priority = "B"; // ✅ 기본값 MEDIUM 설정

    @Schema(description = "카테고리", example = "운동")
    private String category;

    @Column(nullable = false)
    @Schema(description = "사용자 ID", example = "user_123456")
    private String userId;

    @Column(updatable = false)
    @Schema(description = "생성일", example = "2024-02-19T12:00:00")
    private LocalDateTime createdAt;

    @Column
    @Schema(description = "수정일", example = "2024-02-20T15:30:00")
    private LocalDateTime updatedAt;

    // 기본값 설정
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.starts == null) {
            this.starts = LocalDateTime.now();
        }
        if (this.ends == null) {
            this.ends = this.starts.plusDays(1); // 기본값: 시작일 +1일
        }
    }

    // 업데이트 시 수정일 자동 변경
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
