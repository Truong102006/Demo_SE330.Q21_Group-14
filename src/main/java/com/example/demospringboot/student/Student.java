package com.example.demospringboot.student;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String major;

    @Column(nullable = false)
    private double gpa;

    protected Student() {
    }

    public Student(String fullName, String email, String major, double gpa) {
        this.fullName = fullName;
        this.email = email;
        this.major = major;
        this.gpa = gpa;
    }

    public void updateFrom(StudentRequest request) {
        this.fullName = request.fullName();
        this.email = request.email();
        this.major = request.major();
        this.gpa = request.gpa();
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getMajor() {
        return major;
    }

    public double getGpa() {
        return gpa;
    }
}
