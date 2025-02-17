# Developer Documentation

## Introduction

This document serves as a guide for developers who wish to contribute to **NourishQuest**. It provides instructions on how to obtain the source code, understand the directory structure, build and test the software, add new tests, and create a release build.

---

## Obtaining the Source Code

The source code for NourishQuest is hosted on GitHub. Follow these steps to obtain it:

1. **Clone the repository**
   ```sh
   git clone git@github.com:Software-Engineering-II-Project-Group-6/Group-6-Project.git
   cd NourishQuest
   ```

2. **Ensure you have Node.js and npm installed**
   - Download and install Node.js from [Node.js official website](https://nodejs.org/)
   - Verify installation:
     ```sh
     node -v
     npm -v
     ```

---

## Directory Structure

The repository is structured as follows:

```sh
/Project
│── /NourishQuest            # Contains all source code
│   │── /models             # Database models for Mongoose
│   │── /protected          # Protected files and pages
│   │── /public             # Public files and pages
│   │── /routes             # Backend API routes
│   │── /.env               # Environment variables file
│   │── /.gitignore         # Git ignore file
│   │── /package-lock.json  # Lock file for npm dependencies
│   │── /package.json       # Project dependencies and scripts
│   │── /server.js          # Main server file
│── /reports               # Weekly reports
│── /README.md             # Project overview and user manual
│── /project-proposal.md   # Project proposal document
│── /team-resources.md     # Team collaboration and resources
│── /user-manual.md        # User manual
│── /dev-documentation.md  # Developer documentation
```

---

## Building the Software

To build and run the project locally, follow these steps:

1. **Install required dependencies**
   ```sh
   npm install dotenv  
   npm install body-parser  
   npm install express  
   npm install bcrypt express-session  
   npm install mongodb  
   npm install mongoose 
   ```

2. **Start the development server**
   ```sh
   node server.js
   ```
   The application will be available at `http://localhost:3000/` by default.

---

## Testing the Software

To ensure the software runs correctly, execute the test suite:

1. **Run all tests**
   ```sh
   npm test
   ```

2. **Running individual tests** (optional)
   ```sh
   npm run test:filename.test.js
   ```

3. **Test dependencies**
   - Ensure that `Jest` or any other testing framework is installed.
   - Some tests may require environment variables (`.env` file setup).

---

## Adding New Tests

1. **Test file naming convention**
   - All test files should be placed under the `/tests` directory.
   - Test files should follow the naming pattern: `componentName.test.js`

2. **Using the test harness**
   - The project WILL use **Jest** for unit testing.
   - A basic test structure looks like this:
     ```js
     const request = require("supertest");
     const app = require("../src/server");
     
     describe("GET /api/foods", () => {
         it("should return a list of foods", async () => {
             const res = await request(app).get("/api/foods");
             expect(res.statusCode).toBe(200);
             expect(res.body).toHaveProperty("foods");
         });
     });
     ```

3. **Running new tests**
   ```sh
   npm test
   ```

---

## Building a Release

Before releasing a new version of the software, follow these steps:

1. **Update version numbers**
   - Modify the `version` field in `package.json` according to [Semantic Versioning](https://semver.org/).
   - Update the documentation with any relevant changes.

2. **Run tests and verify stability**
   ```sh
   npm test
   ```

3. **Create a production build**
   ```sh
   npm run build
   ```

4. **Sanity Checks**
   - Ensure no critical errors exist.
   - Verify that dependencies are up-to-date.
   - Ensure that the application starts without issues.

5. **Tag the release and push changes**
   ```sh
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   git push origin vX.Y.Z
   ```

6. **Deploy to the live server (if applicable)**
   ```sh
   npm run deploy
   ```

---

## Contribution Guidelines

Developers are encouraged to contribute to **NourishQuest** by following these steps:

1. **Fork the repository** and create a new branch.
2. **Make changes** and ensure that all tests pass.
3. **Submit a pull request** with a clear description of the changes.
4. **Wait for review** and address any requested modifications.
