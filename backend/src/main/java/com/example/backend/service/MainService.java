package com.example.backend.service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.Statement;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainService {

    @Autowired
    private DataSource dataSource;

    public void executeSqlFile(String userId) {
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("sql/insert.sql");
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
             Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement()) {

            StringBuilder sqlBuilder = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                sqlBuilder.append(line).append("\n");
            }

            // :userId를 실제 userId 값으로 치환
            String sql = sqlBuilder.toString().replace(":userId", userId);

            // SQL 실행
            for (String query : sql.split(";")) {
                if (!query.trim().isEmpty()) {
                    statement.execute(query.trim());
                }
            }

            System.out.println("SQL 실행 완료!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
