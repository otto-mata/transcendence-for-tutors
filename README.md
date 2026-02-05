*This project has been created as part of the 42 curriculum by tblochet, ijaber, bzaidi, ncrombez, flturbou*

# ft_transcendence

## Description
This project goal is to create a twitter-like social network that allows users to share short posts, follow other users, and interact with users in real time.

## Instructions

This project uses Docker and Docker Compose to simplify setup and ensure a consistent development environment.

## Team Information
- Product Owner: tblochet
- Tech Lead: bzaidi
- Developers: ijaber, ncrombez, flturbou

The product owner is responsible of making sure the product is following the specifications ofthe subject.
His role is to guide the developers on the business ogic and to ensure compliance. To do this, the product owner creates issues and follow the life-cycle of the application during its development stage.  
The technical lead has authority over the developers. It is his role to staff the developers on tasks and issues, making sure the assignments are in accordance with the capabilities and backlog of each member of the development team.  
The developers then implements the different features, following the specification described by the product owner. They are the most important members of the project, along with the tech lead, since they are the ones that bring to life the business idea into a concrete application. 

### Prerequisites

Make sure you have the following installed on your machine:

- Docker
- Docker Compose

### Installation

1. Clone the repository:

```bash
git clone git@github.com:otto-mata/transcendence-for-tutors.git
cd transcendence-for-tutors
```
2. Start the application:
```bash
docker compose up
```
Once the containers are running, the application will be available at https://localhost:8443

## Ressources

 - [NestJS Doc](https://docs.nestjs.com/)
 - [NextJS Doc](https://nextjs.org/docs)
 - [WebSocket Server](https://github.com/websockets/ws)
 - [Prisma](https://www.prisma.io/docs)

## Project Management

The team organized the development process using a ticket-based workflow managed through Linear.

Each feature or bug fix is created as a ticket, which is then associated with a dedicated Git branch. Developers implement their changes on their own branch and submit a pull request once the work is complete.

All contributions are reviewed by another team member before being merged into the `main` branch, ensuring code quality and consistency.

Communication within the team is handled through a dedicated Discord group for questions, and quick feedback. In addition, regular meetings are held to discuss progress, plan upcoming tasks, and address any blocking issues.

 - [Linear](https://linear.app/tft-42/team/TRA/active)
 - [Notion](https://www.notion.so/2c4b03b51c8d80f2aa59c788bc89d950?v=2c4b03b51c8d80f08dcf000c1c795464)

## Tech Stack

### Front-end

The front-end is built using NextJS 16.

Next.js was chosen for its modern React-based architecture, built-in routing, and support for server-side rendering and static generation. These features improve performance and overall user experience while keeping the codebase scalable and maintainable.

### Back-end

The back-end is built using NestJS for the API, PostgreSQL for the Database.

NestJS provides a structured and modular architecture inspired by Angular, making it well-suited for building scalable and maintainable server-side applications. Its strong support for TypeScript, dependency injection, and clear separation of concerns helps keep the API clean and easy to evolve.

PostgreSQL was selected for its reliability, strong relational model, and advanced querying capabilities, which are well adapted to the needs of a social networking application.

### Database Design

Prisma is used as the ORM to design and manage the database schema. It provides a type-safe interface, clear schema definitions, and simplified migrations, improving developer productivity and reducing runtime errors.

### Infrastructure

Nginx is used as a reverse proxy to route incoming requests between the front-end and back-end services. This setup improves security, performance, and flexibility, and allows the application to scale more easily in a containerized environment.

## Database schema

The database uses PostgreSQL with Prisma ORM.

Users can create posts and comments, follow other users, like and bookmark content, upload media, and exchange private messages.  
Posts and comments support nested replies through self-referencing relations.

Key entities include: User, Post, Comment, Follow, Like, Bookmark, Media, Chat, and Message.

## Features List

- **Authentication**

  Email/password and OAuth 2.0 login with secure user management.  
- **Posts with media**

  Text posts with image uploads linked to user content.  
- **Monitoring**

  System metrics monitored via Prometheus and Grafana dashboards.  
- **Live chat & presence**

  Real-time messaging and user presence using WebSockets.

## Modules

- **Use a framework for both the frontend and backend (+2 Major)** (tblochet, ijaber, bzaidi, ncrombez, flutrbou)

  The frontend is built with Next.js and the backend with NestJS, providing structured, scalable, and maintainable frameworks on both sides of the application.

- **Implement real-time features using WebSockets (+2 Major)**  (tblochet, bzaidi, ncrombez)

  Real-time features such as live notifications and private messaging are implemented using WebSockets, allowing instant updates without page refresh.

- **Allow users to interact with other users (+2 Major)**  (tblochet, ijaber, bzaidi, ncrombez, bzaidi)

  Users can follow each other, like and comment on posts, send private messages.

- **Use an ORM for the database (+1 Minor)** (tblochet, ijaber, bzaidi, ncrombez)

  Prisma ORM is used to model the database schema, manage migrations, and provide type-safe database access.

- **File upload and management system (+1 Minor)**  (ijaber)

  The application supports media uploads (images and other files), which are stored and linked to users or posts through the Media entity.

- **Support for additional browsers (+1 Minor)**  (tblochet, ijaber)

  The frontend is built using modern web standards and is compatible with major browsers such as Chrome, Firefox, Edge, and Brave.

- **Standard user management and authentication (+2 Major)**  (tblochet, ijaber, bzaidi, ncrombez)

  The system includes user registration, login, logout, password hashing, password reset, and email verification.

- **Remote authentication with OAuth 2.0 (+1 Minor)**  (ijaber)

  OAuth 2.0 authentication is supported through external providers (e.g. Google, 42), allowing users to sign in using third-party accounts.

- **Two-Factor Authentication (2FA) (+1 Minor)**  (ijaber)

  A complete 2FA system is implemented to enhance account security by requiring a second authentication factor during registration.

- **Monitoring system with Prometheus and Grafana (+2 Major)** (flturbou)

  Application metrics are collected using Prometheus and visualized through Grafana dashboards to monitor performance and system health.

- **Backend as microservices (+2 Major)**  (tblochet, bzaidi, ncrombez)

  The backend is designed using a microservices architecture, with independent services communicating through well-defined APIs, improving scalability and maintainability.


Final count: 17 points

## Individual Contributions

- **tblochet**

  tblochet was primarily responsible for defining the overall project structure, selecting the main technologies, and setting up the initial architecture.

  He also provided support and guidance across multiple features, contributing to design decisions and assisting other team members throughout the development process.

- **ijaber**

  ijaber implemented the complete backend authentication system, including email/password login, OAuth 2.0 integration, and account verification.  

  He also assisted with the frontend integration of authentication features, ensuring smooth communication between the client and server.

- **bzaidi**

  bzaidi was responsible for the entire backend WebSocket implementation, managing real-time communication and presence features.

  He ensured messages are sent and received instantly, while NestJS handles saving messages to the database.

- **ncrombez**

  ncrombez was responsible for user management and post functionalities, including creating and displaying posts.  

  She also implemented the frontend of the chat system, ensuring seamless integration with the backend WebSocket server and providing a smooth real-time messaging experience for users.

- **flturbou**

  flturbou implemented the monitoring system using Prometheus and Grafana, setting up metrics collection to track application performance and health.
