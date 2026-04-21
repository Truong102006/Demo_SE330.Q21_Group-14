package com.example.demospringboot.student;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findAllByOrderByIdAsc();

    List<Student> findByMajorContainingIgnoreCaseOrderByIdAsc(String major);
}
