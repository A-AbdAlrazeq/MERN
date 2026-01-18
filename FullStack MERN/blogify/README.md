# Blogify
-----
Welcome to Blogify, your go-to platform for creating and managing a dynamic and engaging blogging experience. Blogify is designed to simplify the process of creating, sharing, and discovering content, making it easy for both bloggers and readers to connect in a vibrant online community.

## Functionalities and Features.
-----
- User Authentication: Implementing secure user registration and login processes.
- File Upload: Enabling users to upload files securely and efficiently.
- User Relationships: Implementing social features like following/unfollowing users.
- User Blocking: Creating a user blocking/unblocking system.
- Post Scheduling: Enabling post scheduling for automated future publishing.
- User Profile: Creating a comprehensive user profile system.
- Password Reset: Securely implementing password reset functionality.
- Account Verification: Implementing a user verification system.
- Profile Update: Allowing users to update their profile information.
- Post Visibility Rules: Modifying application visibility rules to hide posts from blocked users and scheduled posts until their publishing time.
- Pagination: Implementing pagination in a web application.
- Filtering & Searching: Integrating data filtering and robust search functionality.
- React Components: Building modular, reusable components using React.
- Routing: Implementing dynamic routing in a single-page-application context with React Router.
- State Management: Managing application state effectively using Redux.
- Form Handling: Creating and validating forms with controlled components.
- Styling: Creating aesthetically pleasing, responsive designs.
- Error Handling: Building robust error handling mechanisms to improve the user experience.
- Integrating with Backend Services: Making API calls from React and managing API responses.
- Deployment: Deploying a MERN application to the cloud.
## Demo
-----
### Home Page
-----
![home page](https://github.com/A-AbdAlrazeq/MERN/assets/107461563/5ea80124-1573-4216-b36c-e665255b7453)

### User Login and Registration with validation for all input:
-----
![login register](https://github.com/A-AbdAlrazeq/MERN/assets/107461563/044445e6-c8f0-4835-9570-ff7c6165d441)

### User Profile:
-----
#### User can upload profile & cover picture, and verify email to give him access to all features.
![user profile](https://github.com/A-AbdAlrazeq/MERN/assets/107461563/1c237427-924c-4be8-a51b-ddb7d7edbf53)
#### User can update his username&email.
![update profile](https://github.com/A-AbdAlrazeq/MERN/assets/107461563/062ae040-c2ea-480f-9a57-470e95e8fd08)
#### User can reset his password.
![reset full](https://github.com/A-AbdAlrazeq/MERN/assets/107461563/63ff556e-a03f-4c91-9b38-cd11467d2a28)
#### User can follow or block other users.
![user follow](https://github.com/A-AbdAlrazeq/MERN/assets/107461563/f56090ec-8a80-4f1a-9ff4-ce53906cdc94)
### POSTS:
----
### user can create post with validation:
![post](https://github.com/A-AbdAlrazeq/MERN/assets/107461563/760e4c35-889b-493b-981e-87a74d532a1c)
### user can view his post and schedule it with validation:
![schedule](https://github.com/A-AbdAlrazeq/MERN/assets/107461563/7f930029-cd5b-4d55-bab0-ac142dc52797)

### user can search for posts by title, select category name & have pagination:
![Merged_document](https://github.com/A-AbdAlrazeq/MERN/assets/107461563/1c733ffb-5772-4d97-a6c9-cf97017f9403)

### user can read users post,add(like,dislike,claps,comment)
![full read post](https://github.com/A-AbdAlrazeq/MERN/assets/107461563/1fac377b-10ce-4034-a315-d478619d4f25)



## Tech Stack
-----
This project was built using MERN, and uses the following technologies:
- Client: React,tailwind css,Redux
- Server: node js,Express
- Database:MongoDB
## Tools
-----
Different tools were used to plan and manage the project, such as:
- postman: For test API endpoints.
- redux devtools: see the Redux state in real time, which can be very helpful while debugging application.
- mongoDB for VS : connect to database and access all data.

## Getting Started
-----

### Prerequisites
-----
- Node.js (recommended: 18+)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)
- Email SMTP credentials (for verification + password reset emails)

### Environment Variables
-----

Create a `server/.env` file and set the following variables:

- `PORT` (optional, default `8000`)
- `MONGO_URL` (required)
  - Local example: `mongodb://127.0.0.1:27017/blogify`
  - Atlas example: `mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority`
- `JWT_SECRET` (required)
- `CLOUDINARY_CLOUD_NAME` (required)
- `CLOUDINARY_APIKEY` (required)
- `CLOUDINARY_API_SECRET` (required)
- Email configuration (required for verification/reset)
  - `EMAIL_HOST`
  - `EMAIL_PORT`
  - `EMAIL_USER`
  - `EMAIL_PASSWORD`

If you see an error like `querySrv ENOTFOUND _mongodb._tcp...`, your `MONGO_URL` is invalid or the hostname cannot be resolved.

### Install & Run
-----

#### Server
-----
From the `server` folder:

- Install: `npm install`
- Run (prod): `npm run start`
- Run (dev): `npm run server`

Server runs on `http://localhost:8000` (or `PORT`).

#### Client
-----
From the `client` folder:

- Install: `npm install`
- Run: `npm start`

### Important Notes
-----

#### Auth Header
-----
Protected endpoints require:

`Authorization: Bearer <token>`

#### Default Categories
-----
You can seed default categories (Sports, Social Media, Technology, etc.) using:

`POST /api/v1/categories/seed-defaults` (requires login)

The Add Post page can also auto-seed categories when none exist.

#### Email Verification & Uploads
-----
Uploading profile/cover images requires a verified account:

- Unverified users will see a warning and uploads are blocked.




