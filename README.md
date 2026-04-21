# Demo Spring Boot

Demo Spring Boot theo noi dung slide: IoC, DI, Bean, layered architecture,
REST Controller, Spring Data JPA, application.properties, main class va testing.

Ung dung quan ly sinh vien gom:

- Presentation Layer: `StudentController`
- Business Layer: `StudentService`
- Data Layer: `StudentRepository`
- Database: H2 in-memory
- UI: trang web tinh tai `src/main/resources/static`

## Chay ung dung

Neu may da co Maven:

```powershell
mvn spring-boot:run
```

Neu Maven chua co trong PATH, dung script trong project:

```powershell
.\run-demo.ps1
```

Mo trinh duyet tai:

```text
http://localhost:8080
```

H2 Console:

```text
http://localhost:8080/h2-console
```

Thong tin dang nhap H2:

```text
JDBC URL: jdbc:h2:mem:spring_demo
User Name: sa
Password:
```

## API mau

```http
GET    /api/students
GET    /api/students/{id}
POST   /api/students
PUT    /api/students/{id}
DELETE /api/students/{id}
GET    /api/health
GET    /api/concepts
```

Body tao/cap nhat sinh vien:

```json
{
  "fullName": "Nguyen Van An",
  "email": "an@example.com",
  "major": "Cong nghe thong tin",
  "gpa": 3.4
}
```

## Kiem thu

```powershell
mvn test
```

Hoac:

```powershell
.\test-demo.ps1
```

## Demo theo slide

1. Mo `DemoSpringBootApplication`: day la main class, co `@SpringBootApplication`.
2. Mo `StudentController`: minh hoa REST Controller va HTTP methods.
3. Mo `StudentService`: minh hoa DI qua constructor va logic business.
4. Mo `StudentRepository`: minh hoa Spring Data JPA tu dong tao CRUD.
5. Mo `Student`: minh hoa Entity mapping voi bang `students`.
6. Mo `application.properties`: minh hoa cau hinh port, database, JPA, H2.
7. Chay `.\run-demo.ps1`, mo `http://localhost:8080`, them/sua/xoa sinh vien.
8. Goi `GET http://localhost:8080/api/concepts` de nhac lai IoC, DI, Bean, layers.
9. Chay `.\test-demo.ps1` de minh hoa testing voi JUnit va MockMvc.
