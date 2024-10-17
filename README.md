# Juno SDK

**Juno SDK** is a development toolkit for interacting with Juno's central infrastructure. It provides convenient models and API methods for handling common tasks like authentication, email management, user management, and project-related operations. This document outlines the core structure of the SDK.

## SDK Structure

### Models

The SDK uses several models to structure the data exchanged between the client and Juno's services. These models represent the input data for API requests and the output data returned by the server.

#### Key Models:
- **CreateProjectModel**: Defines the structure for creating a new project.
- **CreateUserModel**: Contains the necessary fields to create a new user (email, name, password).
- **IssueApiKeyRequest**: Defines the request data for issuing an API key for a project.
- **IssueApiKeyResponse**: Contains the API key returned when a new API key is issued.
- **EmailContent**: Represents the content of an email, including its MIME type and body.
- **EmailRecipient**: Specifies the email and name of the recipient.
- **EmailSender**: Specifies the email and name of the sender.
- **ProjectResponse**: Represents the response received when querying project details.

### API Endpoints

The SDK includes API methods for interacting with Juno services. These methods abstract the complexities of making HTTP requests and ensure that data is structured according to Juno's requirements.

#### Core APIs:
- **AuthApi**: Handles authentication tasks, such as issuing API keys and generating JWT tokens.
- **EmailApi**: Manages email operations like sending emails and registering domains.
- **ProjectApi**: Manages project-related tasks, including creating projects and linking users.
- **UserApi**: Handles user operations, including creating users and managing user roles.

## Usage

The Juno SDK provides a set of APIs for managing various services. Each API is built to simplify interaction with specific Juno infrastructure components. Below is an overview of how to use the main APIs.

### Authentication
The **AuthApi** is used to handle authentication-related tasks, including issuing API keys and generating JWT tokens for secure access to Juno services.

- **Issue API Key**: Create a new API key for project access. This is necessary for authenticating requests to other services.
- **Generate JWT**: Once you have an API key, use it to generate a JWT, which is required to authenticate further API requests.

### Project Management
The **ProjectApi** is responsible for managing projects within Juno’s infrastructure:

- **Create Project**: Define and create a new project using the provided model.
- **Link User to Project**: Associate a user with a project, allowing them to access or contribute to the project.

### User Management
The **UserApi** is designed for creating and managing users:

- **Create User**: Create a new user by providing necessary details like email, name, and password.
- **Set User Role**: Update a user's role to control access levels (e.g., ADMIN, SUPERADMIN).

### Email Management
The **EmailApi** allows you to manage email-related operations, such as registering domains and sending emails. It includes the following functionality:

- **Register Domain**: Register a domain to use as the sender of emails.
- **Send Email**: Send an email through Juno’s email service by specifying the sender, recipient, and content.

### General Workflow
1. **Authentication**: Start by using the **AuthApi** to issue an API key and generate a JWT token.
2. **Project and User Management**: Set up projects and link users using **ProjectApi** and **UserApi**.
3. **Email Operations**: If your project involves email management, use **EmailApi** to register sender domains and send emails.
