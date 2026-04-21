package com.example.demospringboot.student;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StudentDataSeeder implements CommandLineRunner {

    private final StudentRepository studentRepository;

    public StudentDataSeeder(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public void run(String... args) {
        if (studentRepository.count() > 0) {
            return;
        }

        studentRepository.saveAll(List.of(
                new Student("Nguyen Van An", "an@example.com", "Cong nghe thong tin", 3.4),
                new Student("Tran Thi Binh", "binh@example.com", "He thong thong tin", 3.7),
                new Student("Le Minh Chau", "chau@example.com", "Khoa hoc du lieu", 3.9)
        ));
    }
}
