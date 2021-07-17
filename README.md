# test-node-mongoose-jest

A sample project for testing node.js + mongoose app using jest, supertest and mongodb-memory-server.

**Read more in this [article](https://dev.to/ryuuto829/setup-in-memory-database-for-testing-node-js-and-mongoose-1kop) on [dev.to](https://dev.to/).**

⚠️ **For the project using old version of mongodb-memory-server (@6.9.3) go to [this branch](https://github.com/ryuuto829/test-node-mongoose-jest/tree/mongodb-memory-server%406.9.3).**

# Links

- [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server)
- [supertest](https://www.npmjs.com/package/supertest)
- [jest](https://jestjs.io/)

# Requirements

- mongodb-memory-server: 7+
- NodeJS: 12.22+

# Usage

1. Install dependencies:

```sh
npm install

```

2. Create `.env` file with mongodb connection string (optional).

3. Run tests:

```sh
npm test

```

# Description

Project structure:

```
├── models
│   ├── User.js
│   └── Post.js
├── middlewares
│   └── auth.js // Check if user has a token
├── services
│   ├── user.js
│   └── post.js
├── tests
│   ├── db.js
│   ├── auth.test.js
│   └── post.test.js
├── app.js
├── server.js
├── package.json
├── README.md
└── ...
```

API endpoints:

| REQUEST | URL               | Description                  |
| ------- | ----------------- | ---------------------------- |
| POST    | /api/user/signup  | register a new user          |
| POST    | /api/user/login   | user log in                  |
| GET     | /                 | example of a protected route |
| POST    | /api/posts/create | create a new post            |
| GET     | /api/posts/:id    | get post by id               |
