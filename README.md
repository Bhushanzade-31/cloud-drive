# Cloud Drive

A cloud-based file storage application that allows users to upload, store, manage, and download files securely. The project provides a simple interface for managing personal files in one place.

## Features

* User registration and login
* Secure user authentication
* Upload files to cloud storage
* Download stored files
* View uploaded files
* Delete files
* Manage files based on the logged-in user
* File metadata management
* Secure access to user files

## Tech Stack

* **Backend:** Java, Spring Boot
* **Database:** MySQL / PostgreSQL
* **Frontend:** HTML, CSS, JavaScript
* **Authentication:** Spring Security / JWT
* **Build Tool:** Maven
* **Version Control:** Git & GitHub

## Project Structure

```text
Cloud-Drive/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com.example.clouddrive/
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── repository/
│   │   │       ├── model/
│   │   │       └── config/
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   └── test/
├── pom.xml
└── README.md
```

## Database

The application stores information such as:

* User details
* File name
* File type
* File size
* File location
* Upload date
* File owner

Example entities:

```text
User
 └── id
 └── name
 └── email
 └── password

File
 └── id
 └── fileName
 └── fileType
 └── fileSize
 └── filePath
 └── uploadedAt
 └── userId
```

## Getting Started

### Prerequisites

Make sure the following are installed:

* Java 17 or later
* Maven
* MySQL or PostgreSQL
* Git

### Clone the Repository

```bash
git clone <repository-url>
cd Cloud-Drive
```

### Configure the Database

Update the database configuration in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cloud_drive
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Run the Application

Using Maven:

```bash
mvn spring-boot:run
```

Or build and run the JAR:

```bash
mvn clean package
java -jar target/cloud-drive.jar
```

The application will normally be available at:

```text
http://localhost:8080
```

## API Endpoints

Example REST APIs:

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| POST   | `/api/auth/register`       | Register a new user |
| POST   | `/api/auth/login`          | Login user          |
| POST   | `/api/files/upload`        | Upload a file       |
| GET    | `/api/files`               | Get user's files    |
| GET    | `/api/files/{id}/download` | Download a file     |
| DELETE | `/api/files/{id}`          | Delete a file       |

## Security

The application ensures that users can access and manage only their own files. Authentication and authorization are implemented using Spring Security.

Passwords should never be stored as plain text and should be securely hashed before being stored in the database.

## Future Enhancements

* File sharing between users
* Public/private file links
* Folder creation and management
* File search
* File preview
* File versioning
* Storage usage limits
* Cloud storage integration such as AWS S3
* Role-based access control
* Docker deployment

## Author

**Bhushan Zade**

## License

This project is for educational and development purposes.
