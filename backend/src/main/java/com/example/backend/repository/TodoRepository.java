package com.example.backend.repository;

import com.example.backend.entity.Todo;
import com.example.backend.model.CalendarResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    @Query("SELECT new com.example.backend.model.CalendarResponse(t.id, t.title,t.complete, t.starts, t.ends) FROM Todo t WHERE t.userId = :userId")
    List<CalendarResponse> getCalendarData(@Param("userId") String userId);

    Page<Todo> findAllByUserId(@Param("userId") String userId, Pageable pageable);

    @Query("SELECT t FROM Todo t WHERE t.userId = :userId AND DATE(t.starts) <= :date AND DATE(t.ends) >= :date ORDER BY t.complete ASC, t.priority DESC, t.starts ASC")
    List<Todo> findTodosByDate(@Param("userId") String userId, @Param("date") LocalDate date);

    // ISSUE: 데이터를 간혹 조회 못하는 오류 발생 "(:keyword IS NULL OR " null 체크 제거
    // ISSUE: Pageable이 적용되지 않는 문제 "value =" 을 추가
    @Query(value = "SELECT t FROM Todo t WHERE t.userId = :userId " +
            "AND (LOWER(t.category) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Todo> searchTodos(@Param("keyword") String keyword, @Param("userId") String userId, Pageable pageable);

    // 특정 사용자의 TODO 개수 조회
    @Query("SELECT COUNT(t) FROM Todo t WHERE t.userId = :userId")
    int countTodosByUserId(@Param("userId") String userId);


}
