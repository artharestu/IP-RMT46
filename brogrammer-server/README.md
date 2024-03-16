[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14029415&assignment_repo_type=AssignmentRepo)

# Brogrammer E-Learning API Doc (Server Side)

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-login`
- `GET /courses`
- `GET /course/:id`
- `GET /categories`
- `POST /chat`
- `GET /subscription/:CourseId`
- `PATCH /verify/:orderId`
- `GET /subscriber/:CourseId`
- `DELETE /subscriber/:CourseId`
- `GET /video/:videoId`
- `GET /profile`
- `PUT /profile`
- `PATCH /profile`
- `GET /mycourses`
  &nbsp;

## 1. POST /register

Description:

- Create a user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

_Response (201 - Created)_

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
}
```

_Response (400 - Bad Request)_

```json
{
  "email": "Email is required"
}
OR
{
  "password": "Password is required"
}
```

&nbsp;

## 2. POST /login

Description:

- User login

Request:

- body:

```json
{
  "username": "string",
  "email": "string"
}
```

Response:

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - InvalidEmailPassword)_

```json
{
  "message": "Invalid email or password"
}
```

## 3. POST /google-login

Description:

- User login with a Google Account

Request:

- body:

```json
{
  "googleToken": "string"
}
```

Response:

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

## 4. GET /courses

Description:

- Get all courses from database

Request:

- headers:

```json
{
  "authorization": "Bearer <access_token>"
}
```

Request:

_Query params (optional):_

```
authorId="integer",
sort=ASC||DESC,
page="integer",
search="string",
categoryId="integer"
```

Example:

```
/courses?search=javascript8&categoryId=2&sort=DESC&page=2&authorId=1
```

Response:

_Response (200 - OK)_

```json
[
  {
    "page": "integer",
    "data":
      [
        {
          "id":"integer",
          "title": "string",
          "description": "string",
          "videoThumbnail": "string",
          "price": "integer",
          "isActive": "boolean",
          "AuthorId": "integer",
          "CategoryId": "integer",
          "Category": {
                "name": "string"
            }
        },
        ...,
      ],
    "totalData": "integer",
    "totalPage": "integer",
    "dataPerPage": "integer",
  }
]
```

## 5. GET /course/:id

Description:

- Get detail course by id

Request:

- headers:

```json
{
  "authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "videoThumbnail": "string",
  "price": "integer",
  "isActive": "boolean",
  "AuthorId": "integer",
  "CategoryId": "integer",
  "Category": {
    "name": "string"
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

## 6. GET /categories

Description:

- Get all categories from database

Request:

- headers:

```json
{
  "authorization": "Bearer <access_token>"
}
```

Response:

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "name": "string",
    "description": "string",
  },
  ...,
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
}
```

## 7. POST /chat

Request:

- headers:

```json
{
  "authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "message": "string"
}
```

Response:

_Response (201 - Created)_

```json
{
  "message": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid data input"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden access"
}
```

## 8. GET /subscription/:CourseId

Request:

- headers:

```json
{
  "authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "name": "string",
  "companyLogo": "string",
  "location": "string",
  "email": "string",
  "description": "string"
}
```

Response:

_Response (200 - OK)_

```json
{
  "name": "string",
  "companyLogo": "string",
  "location": "string",
  "email": "string",
  "description": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "name": "Name is required"
}
OR
{
  "companyLogo": "Company logo is required"
}
OR
{
  "location": "Location is required"
}
OR
{
  "description": "Description is required"
}
```

## 9. PATCH /verify/:orderId

Description:

- Get all job from database (public)

Request:

_Query params (optional):_

```
search="string"
filter="integer"
sort=ASC||DESC
page="integer"
```

Example:

```
/pub/jobs?search=hacktiv8&filter=2&sort=DESC&page=2
```

Response:

_Response (200 - OK)_

```json
[
  {
    "page": "integer",
    "data":
      [
        {
          "title": "string",
          "description": "string",
          "imgUrl": "string",
          "jobType": "string",
          "companyId": "integer",
          "authorId": "integer"
        },
        ...,
      ],
    "totalData": "integer",
    "totalPage": "integer",
    "dataPerPage": "integer",
  }
]
```

## 10. GET /subscriber/:CourseId

Description:

- Get job by id (public)

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

Response:

_Response (200 - OK)_

```json
{
  "title": "string",
  "description": "string",
  "imgUrl": "string",
  "jobType": "string",
  "companyId": "integer",
  "authorId": "integer"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

## 11. DELETE /subscriber/:CourseId

Description:

- User register

Request:

- headers:

```json
{
  "authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

Response:

_Response (201 - Created)_

```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
}
```

_Response (400 - Bad Request)_

```json
{
  "username": "Username is required"
}
OR
{
  "email": "Email is required"
}
OR
{
  "email": "Email is not valid"
}
OR
{
  "password": "Password is required"
}
OR
{
  "password": "Password must be between 5 and 20 characters"
}
```

## 12. GET /video/:videoId

Description:

- User login

Request:

- body:

```json
{
  "username": "string",
  "email": "string"
}
```

Response:

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - InvalidEmailPassword)_

```json
{
  "message": "error invalid username or email or password"
}
```

## 13. GET /profile

Description:

- Update file image

Request:

- headers:

```json
{
  "authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "imgUrl": "file.[jpg,jpeg,png]"
}
```

_Response (200 - OK)_

```json
{
  "message": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "validation errors"
}
```

## 14. PUT /profile

## 15. PATCH /profile

## 16. GET /mycourses

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
