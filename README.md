# ThinkAlpha - Server

## Description
This is the server-side of ThinkAlpha app, a task management application that allows users to manage their tasks efficiently and effectively.

## Models
- User model
  - username - String // required
  - email - String // required & unique
  - password - String // required
  - tasks - [ObjectID<Task>]
- Task model
  - owner - ObjectID<User> // required
  - name - String // required
  - description - String
- Group model
  - owner - ObjectID<User> // required
  - name - String // required
  - description - String
- Comment model
  - owner - ObjectID<User> // required
  - name - String // required
  - description - String

## API Endpoints/Backend Routes
- GET /auth/me
- POST /auth/register
  - body: username, email, password
- POST /auth/login
  - body: username, password
- POST /auth/logout
  - body: (empty)
- POST /user/me/task
  - body: taskId
- DELETE /user/me/task/:taskId
  - body: (empty)
- GET /task
- POST /task
  - body: name, description, 
- GET /task/:id

## Links
- Git: [(https://github.com/TheOne-1-dot/think_alpha_project_client.git)]

- Git: [(https://github.com/TheOne-1-dot/think_alpha_project_server.git)]

- Deploy Link: [(https://thinkalpha.netlify.app/login)]
