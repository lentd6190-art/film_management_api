# Film Management API

## 1. Project Overview

**Film Management API** is a full-stack film management application built with **ASP.NET Core Minimal API** for the backend and **React with Vite** for the frontend.

The application provides REST API endpoints for managing film information and integrates OpenAPI and Swagger to support API documentation and testing during development.

### Key Characteristics

* **Backend:** ASP.NET Core Minimal API handles HTTP requests and implements film management operations.
* **Frontend:** React and Vite provide the web-based user interface.
* **Data Storage:** Film records are currently stored in an in-memory `List<Film>`. Data is not persisted to a database and is reset whenever the backend application restarts.
* **API Documentation:** OpenAPI generates a machine-readable API description, while Swagger UI provides an interactive interface for exploring and testing endpoints.
* **Cross-Origin Requests:** CORS is configured to allow requests from HTTP origins whose hostname is `localhost`.

## 2. Project Directory Structure

The repository is organized into the following directories and files:

```text
film_management_api/
│
├── Extensions/
│   └── SwaggerExtensions.cs          # Swagger documentation configuration
│
├── Models/
│   └── Film.cs                        # Film data model
│
├── Properties/
│   └── launchSettings.json            # Application launch profiles
│
├── frontend/                          # React + Vite frontend application
│   ├── .oxlintrc.json                 # Linting configuration
│   ├── index.html                     # HTML entry point
│   ├── package.json                   # Frontend dependencies and scripts
│   ├── package-lock.json              # Locked dependency versions
│   ├── README.md                      # Frontend documentation
│   └── vite.config.js                 # Vite configuration
│
├── appsettings.json                   # Application configuration
├── appsettings.Development.json       # Development-specific configuration
├── film_management_api.csproj         # .NET project file
├── film_management_api.http           # HTTP requests for API testing
├── Program.cs                         # Application entry point and API endpoints
└── README.md                          # Project documentation
```

*Note: Build output directories and other generated files have been omitted for clarity.*

### Swagger Configuration

The `Extensions/SwaggerExtensions.cs` file defines a custom service extension named `AddSwaggerDocs()`. It registers the Swagger document with the following metadata:

* **Title:** Film Management API
* **Version:** v1
* **Description:** API for managing films

The extension is registered in `Program.cs` using `builder.Services.AddSwaggerDocs()`. Swagger middleware and Swagger UI are enabled in the Development environment.

## 3. Technologies Used

| Technology               | Purpose                                                             |
| ------------------------ | ------------------------------------------------------------------- |
| C#                       | Backend programming language                                        |
| ASP.NET Core Minimal API | Implements the backend and defines HTTP endpoints                   |
| React                    | Builds the frontend user interface                                  |
| Vite                     | Provides frontend development and build tooling                     |
| REST API                 | Enables communication between the frontend and backend over HTTP    |
| JSON                     | Data interchange format                                             |
| OpenAPI                  | Describes API operations, parameters, and data schemas              |
| Swagger UI               | Provides an interactive interface for API documentation and testing |
| CORS                     | Controls which cross-origin requests are permitted                  |
| NuGet                    | Manages .NET dependencies                                           |
| npm                      | Manages frontend dependencies and scripts                           |
| Git                      | Tracks source code changes                                          |
| GitHub                   | Hosts the repository and supports team collaboration                |

## 4. Main Features

### 4.1. Film Management

The backend provides the following film management operations:

* **Retrieve all films:** Returns the complete list of available films.
* **Retrieve a film by ID:** Finds a film using its `MaPhim` identifier. Returns `404 Not Found` if the film does not exist.
* **Create a film:** Accepts film information, generates a new ID automatically, and adds the film to the in-memory collection. Returns `201 Created` on success.
* **Update a film:** Updates the information of an existing film identified by its ID. Returns `404 Not Found` if the film does not exist.
* **Delete a film:** Removes a film from the collection by ID. Returns `204 No Content` on success or `404 Not Found` if the film does not exist.

### 4.2. Weather Forecast Demonstration

The application includes a sample `/weatherforecast` endpoint that generates five weather forecast records for the following days.

This endpoint demonstrates basic Minimal API functionality and is independent of the film management operations.

### 4.3. API Documentation and Testing

* Generates an OpenAPI document in JSON format.
* Integrates Swagger middleware and Swagger UI in the Development environment.
* Allows developers to inspect documented API operations and send test HTTP requests through Swagger UI.
* Supports API exploration during development without requiring a separate API client for basic tests.

## 5. Film Data Model

The `Film` model represents the film information handled by the backend.

| Property        | Description            |
| --------------- | ---------------------- |
| `MaPhim`        | Film identifier        |
| `TenPhim`       | Film title             |
| `MoTa`          | Film description       |
| `ThoiLuong`     | Film duration          |
| `NamPhatHanh`   | Release year           |
| `NgayKhoiChieu` | Release date           |
| `NgonNgu`       | Film language          |
| `QuocGia`       | Country of origin      |
| `MaTheLoai`     | Genre identifier       |
| `MaDaoDien`     | Director identifier    |
| `PosterUrl`     | URL of the film poster |

The `MaPhim` property is used to identify individual films. When a film is created, the backend assigns an ID based on the maximum ID currently in the in-memory collection.

## 6. API Endpoints Reference

### 6.1. Film Management Endpoints

| HTTP Method | Endpoint          | Description             | Expected Response                 |
| ----------- | ----------------- | ----------------------- | --------------------------------- |
| GET         | `/api/films`      | Retrieve all films      | `200 OK`                          |
| GET         | `/api/films/{id}` | Retrieve a film by ID   | `200 OK`, `404 Not Found`         |
| POST        | `/api/films`      | Create a new film       | `201 Created`                     |
| PUT         | `/api/films/{id}` | Update an existing film | `200 OK`, `404 Not Found`         |
| DELETE      | `/api/films/{id}` | Delete a film by ID     | `204 No Content`, `404 Not Found` |

### 6.2. Sample and Documentation Endpoints

The following URLs assume that the backend is running at `http://localhost:5220`. The actual URL and port depend on the application's launch configuration.

| Type       | Method / URL                               | Description                                       |
| ---------- | ------------------------------------------ | ------------------------------------------------- |
| Sample API | `GET /weatherforecast`                     | Returns five sample weather forecast records      |
| OpenAPI    | `http://localhost:5220/openapi/v1.json`    | Returns the OpenAPI JSON document                 |
| Swagger UI | `http://localhost:5220/swagger/index.html` | Opens the interactive API documentation interface |

The OpenAPI and Swagger UI endpoints are mapped within the Development environment branch in `Program.cs`. They may not be available when the application runs in another environment.

## 7. Installation and Setup

### 7.1. Prerequisites

Install the following tools before running the project:

* A .NET SDK compatible with the version specified in `film_management_api.csproj`.
* Node.js and npm.
* Git.

### 7.2. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/lentd6190-art/film_management_api.git
cd film_management_api
```

### 7.3. Run the Backend

From the project root directory, execute:

```bash
dotnet restore
dotnet run
```

The first command restores the required NuGet dependencies. The second builds and starts the backend application.

Check the terminal output for the actual listening URL and port.

For example, if the backend runs at `http://localhost:5220`, the OpenAPI document is available at:

`http://localhost:5220/openapi/v1.json`

In the Development environment, Swagger UI can be accessed at:

`http://localhost:5220/swagger/index.html`

### 7.4. Run the Frontend

Open a separate terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

Vite displays a local URL in the terminal. Open that URL in a web browser to access the frontend.

Ensure that:

* The backend is running.
* The frontend uses the correct backend API base URL.
* The frontend origin is permitted by the configured CORS policy.

## 8. Technical Notes and Limitations

### 8.1. In-Memory Data Storage

Film records are stored in an in-memory `List<Film>` rather than a database.

Consequently:

* Film data is initialized when the backend starts.
* Newly created films and subsequent updates exist only in the running application's memory.
* Changes are lost when the backend restarts.
* The current implementation does not provide persistent data storage.

### 8.2. Development Environment

OpenAPI and Swagger UI are configured inside the `app.Environment.IsDevelopment()` condition. Their availability therefore depends on the active application environment.

### 8.3. CORS Configuration

The `FrontendPolicy` CORS policy permits origins that use HTTP and have `localhost` as their hostname. It allows any request header and HTTP method.

Origins such as `http://127.0.0.1:5173` or deployed website domains are not automatically permitted by this policy.

### 8.4. API Response Handling

The API uses HTTP status codes to indicate operation results:

* `200 OK`: The request was processed successfully and a response body is returned.
* `201 Created`: A new film was created successfully.
* `204 No Content`: A film was deleted successfully without a response body.
* `404 Not Found`: The requested film does not exist.
* `400 Bad Request`: The request contains invalid or missing data when the corresponding validation is triggered.

The current implementation includes basic existence checks but does not yet demonstrate comprehensive business validation or persistent database integration.

## 9. Project Purpose

This project is developed for educational purposes to practise:

* Building web APIs with ASP.NET Core Minimal API.
* Implementing REST-style CRUD operations.
* Integrating a React frontend with a backend API.
* Describing API operations using OpenAPI.
* Exploring and testing endpoints through Swagger UI.
* Managing source code and collaborating through Git and GitHub.
