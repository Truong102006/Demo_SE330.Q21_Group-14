package com.example.demospringboot.student;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Transactional(readOnly = true)
    public List<Student> findAll() {
        return studentRepository.findAllByOrderByIdAsc();
    }

    @Transactional(readOnly = true)
    public Optional<Student> findById(Long id) {
        return studentRepository.findById(id);
    }

    public Student create(StudentRequest request) {
        return studentRepository.save(new Student(
                request.fullName(),
                request.email(),
                request.major(),
                request.gpa()
        ));
    }

    public Optional<Student> update(Long id, StudentRequest request) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.updateFrom(request);
                    return studentRepository.save(student);
                });
    }

    public boolean delete(Long id) {
        if (!studentRepository.existsById(id)) {
            return false;
        }

        studentRepository.deleteById(id);
        return true;
    }

    @Transactional(readOnly = true)
    public List<Student> searchByMajor(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return findAll();
        }

        return studentRepository.findByMajorContainingIgnoreCaseOrderByIdAsc(keyword.trim());
    }
}
