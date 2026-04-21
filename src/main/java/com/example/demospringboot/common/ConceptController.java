package com.example.demospringboot.common;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConceptController {

    @GetMapping("/api/concepts")
    public Map<String, Object> concepts() {
        return Map.of(
                "spring", "Java framework ho tro xay dung ung dung de mo rong va bao tri",
                "ioc", "Spring Container quan ly vong doi object thay cho lap trinh vien",
                "di", "Dependency duoc inject tu ben ngoai qua constructor",
                "beanExamples", List.of("@RestController", "@Service", "@Component", "JpaRepository"),
                "architecture", List.of("Client", "Controller", "Service", "Repository", "H2 Database")
        );
    }
}
