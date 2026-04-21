# Script demo Spring Boot theo slide

## Slide 3-5: Spring la gi va giai quyet van de nao

Noi: "Neu code tu tao object va phu thuoc chat vao nhau thi rat kho thay doi.
Trong demo nay, Controller khong tu tao Service. Spring tao Bean va inject vao
constructor."

Mo file:

- `StudentController`
- `StudentService`

Chi vao constructor cua Controller de noi ve DI.

## Slide 6-11: Co che cot loi

Noi: "Ung dung chia thanh layer: Controller nhan request, Service xu ly logic,
Repository lam viec voi database. Tat ca class duoc Spring quan ly nhu Bean."

Mo file:

- `StudentController` cho Presentation Layer
- `StudentService` cho Business Layer
- `StudentRepository` cho Data Layer
- `StudentDataSeeder` cho `@Component` va vong doi luc app start

Goi API:

```http
GET http://localhost:8080/api/concepts
```

## Slide 12-16: Spring Boot

Noi: "Spring Boot giup giam cau hinh thu cong. Chi can dependency starter trong
`pom.xml`, Boot se auto-configure Tomcat, Spring MVC, JPA, H2."

Mo file:

- `pom.xml`
- `application.properties`
- `DemoSpringBootApplication`

Lenh chay:

```powershell
.\run-demo.ps1
```

## Slide 17-19: Web App va REST Controller

Noi: "Client goi HTTP request den Controller. Controller tra JSON cho client."

Demo tren browser:

```text
http://localhost:8080
```

Demo REST:

```http
GET http://localhost:8080/api/students
POST http://localhost:8080/api/students
PUT http://localhost:8080/api/students/1
DELETE http://localhost:8080/api/students/1
```

## Slide 20-23: Data

Noi: "Entity mapping bang database, Repository ke thua JpaRepository nen co san
CRUD, Service goi Repository thay vi viet SQL thu cong."

Mo file:

- `Student`
- `StudentRepository`
- `StudentService`

Mo H2 Console:

```text
http://localhost:8080/h2-console
```

Thong tin:

```text
JDBC URL: jdbc:h2:mem:spring_demo
User Name: sa
Password:
```

Chay SQL:

```sql
select * from students;
```

## Slide 24-25: Chay va demo

Trinh tu demo:

1. Chay app bang `.\run-demo.ps1`.
2. Mo browser tai `http://localhost:8080`.
3. Them mot sinh vien moi.
4. Loc theo nganh hoc.
5. Sua GPA.
6. Xoa sinh vien vua tao.
7. Goi `GET /api/students` de xem JSON.

## Slide 26-28: Testing va danh gia

Noi: "Test giup dam bao API dung. Demo dung JUnit va MockMvc de test request
ma khong can mo browser."

Lenh:

```powershell
.\test-demo.ps1
```

Mo file:

- `StudentControllerTest`

## Slide 29-31: Ket thuc

Noi ket: "Cung mot kien truc nay co the phat trien thanh web app lon hon,
REST API cho mobile app, hoac microservice."
