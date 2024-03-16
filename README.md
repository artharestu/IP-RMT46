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

- Create a new user

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

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
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

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
}
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

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
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

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid data input"
}
```

## 8. GET /subscription/:CourseId

Description:

- Add data to the subscribers table with the status "pending" (awaiting payment) for the specified CourseId.

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
  "CourseId": "integer (required)"
}
```

Response:

_Response (200 - OK)_

```json
{
  "id": "integer",
  "UserId": "integer",
  "CourseId": "integer",
  "orderId": "string",
  "tokenPayment": "string",
  "status": "pending",
  "createdAt": "date",
  "updatedAt": "date"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

## 9. PATCH /verify/:orderId

Description:

- Verify the payment for the specified orderId. If the payment is valid, update the status to "subscribed".

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
  "CourseId": "integer (required)"
}
```

Response:
_Response (200 - OK)_

```json
{
  "status": "string",
  "message": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
}
```

## 10. GET /subscriber/:CourseId

Description:

- Get the subscriber data based on the specified CourseId.

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
  "CourseId": "integer (required)"
}
```

Response:

_Response (200 - OK)_

```json
{
  "id": "integer",
  "UserId": "integer",
  "CourseId": "integer",
  "orderId": "string",
  "tokenPayment": "string",
  "status": "pending",
  "createdAt": "date",
  "updatedAt": "date"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

## 11. DELETE /subscriber/:CourseId

Description:

- Delete the subscriber data if the user wants to cancel the payment for the course purchase based on the specified CourseId. Only subscriber data with "pending" status can be deleted.

Request:

- headers:

```json
{
  "authorization": "Bearer <access_token>"
}
```

- params:

````json
{
  "CourseId": "integer (required)"
}

Response:

_Response (200 - OK)_

```json
{
  "message": "Subscriber has been deleted"
}
````

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

## 12. GET /profile

Description:

- Get the profile data of the logged-in user.

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
  "firstName": "string",
  "lastName": "string",
  "profilePicture": "string",
  "bio": "string",
  "dateOfBirth": "date",
  "phoneNumber": "string",
  "UserId": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

## 13. PUT /profile

Description:

- Update the profile data of the logged-in user.

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

- body

```json
{
  "firstName": "string",
  "lastName": "string",
  "profilePicture": "string",
  "bio": "string",
  "dateOfBirth": "date",
  "phoneNumber": "string",
  "UserId": "string"
}
```

_Response (200 - OK)_

```json
{ "message": "Profile success to update" }
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

## 14. PATCH /profile

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
  "profilePicture": "file.[jpg,jpeg,png]"
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

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

## 15. GET /mycourses

Description:

- Get the course data that has been subscribed by the logged-in user. This includes courses with both "pending" and "subscribed" status.

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

Response:

_Response (200 - OK)_

```json
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
        "id": "integer",
        "name": "string",
        "description": "string",
        "createdAt": "date",
        "updatedAt": "date"
      },
    "Subscriber":{
        "id": "integer",
        "UserId": "integer",
        "CourseId": "integer",
        "orderId": "string",
        "tokenPayment": "string",
        "status": "pending",
        "createdAt": "date",
        "updatedAt": "date"
    }
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

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
