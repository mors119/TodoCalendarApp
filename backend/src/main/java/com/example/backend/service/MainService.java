package com.example.backend.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Collectors;


@Service
public class MainService {

    @PersistenceContext
    private EntityManager entityManager;

    // 최초 더미 데이터 넣기
    @Transactional
    public void executeSqlFile(String userId) throws IOException {
        String sql = Files.lines(Paths.get("src/main/resources/sql/insert.sql"))
                .collect(Collectors.joining(" "));

        sql = sql.replace(":userId", String.valueOf(userId));

        entityManager.createNativeQuery(sql).executeUpdate();
    }

}
