package com.example.demospringboot.student;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record StudentRequest(
        @NotBlank(message = "Ho ten khong duoc de trong")
        String fullName,

        @NotBlank(message = "Email khong duoc de trong")
        @Email(message = "Email khong hop le")
        String email,

        @NotBlank(message = "Nganh hoc khong duoc de trong")
        String major,

        @DecimalMin(value = "0.0", message = "GPA phai tu 0.0 den 4.0")
        @DecimalMax(value = "4.0", message = "GPA phai tu 0.0 den 4.0")
        double gpa
) {
}
