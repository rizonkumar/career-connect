# Job Board API Documentation

This documentation provides details about the Job Board API endpoints, request/response structures, and authentication methods.

## Base URL

```
http://localhost:5001/api
```

## Authentication

### Company Authentication

Companies use JWT token-based authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

### User Authentication

Users are authenticated via Clerk. The Clerk session token should be included in requests.

## Company Endpoints

### 1. Register Company

```
POST /company/register
```

**Request Body (multipart/form-data):**

```json
{
  "name": "Company Name",
  "email": "company@example.com",
  "password": "password123",
  "image": <image_file>
}
```

**Response:**

```json
{
  "success": true,
  "company": {
    "_id": "company_id",
    "name": "Company Name",
    "email": "company@example.com",
    "image": "image_url"
  },
  "token": "jwt_token"
}
```

### 2. Login Company

```
POST /company/login
```

**Request Body:**

```json
{
  "email": "company@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "company": {
    "_id": "company_id",
    "name": "Company Name",
    "email": "company@example.com",
    "image": "image_url"
  },
  "token": "jwt_token"
}
```

### 3. Get Company Profile

```
GET /company/company-profile
```

**Response:**

```json
{
  "success": true,
  "company": {
    "_id": "company_id",
    "name": "Company Name",
    "email": "company@example.com",
    "image": "image_url"
  }
}
```

## Job Endpoints

### 1. Post New Job

```
POST /company/post-new-job
```

**Request Body:**

```json
{
  "title": "Software Engineer",
  "description": "Job description here",
  "location": "New York, NY",
  "category": "Technology",
  "level": "Senior",
  "salary": 120000
}
```

**Response:**

```json
{
  "message": "Job created successfully",
  "success": true,
  "job": {
    "_id": "job_id",
    "title": "Software Engineer",
    "description": "Job description here",
    "location": "New York, NY",
    "category": "Technology",
    "level": "Senior",
    "salary": 120000,
    "date": 1705881600000,
    "visible": true,
    "companyId": "company_id"
  }
}
```

### 2. Get Single Job

```
GET /jobs/:id
```

**Response:**

```json
{
  "message": "Job retrieved successfully",
  "success": true,
  "job": {
    "_id": "job_id",
    "title": "Software Engineer",
    "description": "Job description here",
    "location": "New York, NY",
    "category": "Technology",
    "level": "Senior",
    "salary": 120000,
    "date": 1705881600000,
    "visible": true,
    "companyId": {
      "_id": "company_id",
      "name": "Company Name",
      "email": "company@example.com",
      "image": "image_url"
    }
  }
}
```

### 3. Get All Jobs

```
GET /jobs
```

**Response:**

```json
{
  "message": "All jobs retrieved successfully",
  "success": true,
  "jobs": [
    {
      "_id": "job_id",
      "title": "Software Engineer",
      "description": "Job description here",
      "location": "New York, NY",
      "category": "Technology",
      "level": "Senior",
      "salary": 120000,
      "date": 1705881600000,
      "visible": true,
      "companyId": {
        "_id": "company_id",
        "name": "Company Name",
        "email": "company@example.com",
        "image": "image_url"
      }
    }
    // ... more jobs
  ]
}
```

## User Endpoints

### 1. Get User Profile

```
GET /users/profile
```

**Response:**

```json
{
  "message": "User data retrieved successfully",
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "image": "image_url",
    "resume": "resume_url"
  }
}
```

### 2. Apply for Job

```
POST /users/apply
```

**Request Body:**

```json
{
  "jobId": "job_id"
}
```

**Response:**

```json
{
  "message": "Job application submitted successfully",
  "success": true
}
```

### 3. Get User Applications

```
GET /users/applications
```

**Response:**

```json
{
  "message": "User applied applications retrieved successfully",
  "success": true,
  "applications": [
    {
      "_id": "application_id",
      "userId": "user_id",
      "jobId": {
        "_id": "job_id",
        "title": "Software Engineer",
        "description": "Job description",
        "location": "New York, NY",
        "category": "Technology",
        "level": "Senior",
        "salary": 120000
      },
      "companyId": {
        "_id": "company_id",
        "name": "Company Name",
        "email": "company@example.com",
        "image": "image_url"
      },
      "status": "Pending",
      "date": 1705881600000
    }
    // ... more applications
  ]
}
```

### 4. Update User Resume

```
POST /users/update-resume
```

**Request Body (multipart/form-data):**

```json
{
  "resume": <file>
}
```

**Response:**

```json
{
  "message": "User Resume updated successfully",
  "success": true
}
```

## Error Handling

All endpoints follow a consistent error response format:

### Development Environment Error Response

```json
{
  "success": false,
  "status": "error" | "fail",
  "message": "Error message",
  "stack": "Error stack trace",
  "error": {
    // Detailed error object
  }
}
```

### Production Environment Error Response

```json
{
  "success": false,
  "status": "error" | "fail",
  "message": "Error message"
}
```

## Additional Company Endpoints

### 1. Get Job Applicants

```
POST /company/applications
```

**Request Body:**

```json
{
  "jobId": "job_id"
}
```

**Response:**

```json
{
  "success": true,
  "applications": [
    {
      "_id": "application_id",
      "userId": {
        "_id": "user_id",
        "name": "User Name",
        "email": "user@example.com",
        "image": "image_url",
        "resume": "resume_url"
      },
      "status": "Pending",
      "date": 1705881600000
    }
    // ... more applications
  ]
}
```

### 2. Get Company Posted Jobs

```
GET /company/posted-jobs
```

**Response:**

```json
{
  "success": true,
  "jobs": [
    {
      "_id": "job_id",
      "title": "Software Engineer",
      "description": "Job description",
      "location": "New York, NY",
      "category": "Technology",
      "level": "Senior",
      "salary": 120000,
      "date": 1705881600000,
      "visible": true
    }
    // ... more jobs
  ]
}
```

### 3. Change Application Status

```
POST /company/change-status
```

**Request Body:**

```json
{
  "applicationId": "application_id",
  "status": "Accepted" | "Rejected" | "Pending"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Application status updated successfully"
}
```
