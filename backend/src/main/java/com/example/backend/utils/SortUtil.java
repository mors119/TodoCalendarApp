package com.example.backend.utils;

import org.springframework.data.domain.Sort;

public class SortUtil {
    public static Sort getSort(String sortType) {
        switch (sortType.toUpperCase()) {
            case "CLOSEST":
                return Sort.by(Sort.Direction.DESC, "starts"); // ✅ 시작일 기준 오름차순 정렬
            case "HARDEST":
                return Sort.by(Sort.Direction.ASC, "priority"); // ✅ 우선순위 높은 순 정렬
            case "IN_PROGRESS":
                return Sort.by(Sort.Direction.ASC, "complete"); // ✅ 미완료(0) → 완료(1) 정렬
            case "ALL":
            default:
                return Sort.by(Sort.Direction.DESC, "id"); // ✅ 최신 일정이 먼저 보이도록 ID 내림차순
        }
    }
}