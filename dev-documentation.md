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
│   │── /tests              # All test files
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
   npm install node-cron
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

2. **Running individual tests**

   ```sh
   npm run test:filename.test.js
   ```

3. **Test dependencies**
   - Ensure that `Jest` testing framework is installed.
   - Some tests may require environment variables (`.env` file setup).

---

## Test-Automation Infrastructure

We use Jest (JavaScript testing framework) for automation. We chose Jest because:

1. It integrates smoothly with Node.js and npm.
2. It has a large community and plenty of online resources.
3. It provides built-in assertions, mocking, and coverage reports with minimal configuration.
4. In addition, we use Supertest to test our Express routes by simulating HTTP requests.

---

## Justifications for Jest

1. Node Ecosystem: Jest is designed for JavaScript/TypeScript, fitting naturally with our Express server.
2. Simplicity: Minimal setup—tests can be placed in tests folder and named _.test.js or _.spec.js.
3. Community Support: Jest has extensive documentation and a large community for troubleshooting.

---

## How to Add a New Test

1. **Test file naming convention**

   - All test files should be placed under the `/tests` directory.
   - Test files should follow the naming pattern: `componentName.test.js`

2. **Using the test harness**

   - The project WILL use **Jest** for unit testing.
   - Import any modules you want to test, plus any test utilities (like supertest for route testing).
   - Write one or more Jest describe and it blocks. For example:
     ```js
     //tests/example.test.js
     describe("Example Test Suite", () => {
       it("should pass this simple test", () => {
         expect(1 + 1).toBe(2);
       });
     });
     ```

3. **Running new tests**
   - Run npm test to verify your new test is discovered and passes.
   ```sh
   npm test
   ```

---

## Continuous Integration (CI)

We employ **GitHub Actions** as our CI service to automatically run tests and checks whenever code is pushed or a pull request is opened. The repository is linked to GitHub Actions via a workflow file located at: .github/workflows/ci.yml

### Why GitHub Actions?

1. **Native Integration with GitHub**: It’s built directly into GitHub, making setup and maintenance straightforward.
2. **Free for Public Repositories**: Ideal for open-source projects that don’t require extensive paid plans.
3. **Extensive Marketplace**: Many pre-built actions (e.g., for Node setup, coverage reports) help streamline workflows.

### CI Service Pros/Cons Matrix

| CI Service         | Pros                                                                                           | Cons                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **GitHub Actions** | - Native GitHub integration <br> - Free for open source <br> - Large community and marketplace | - Advanced workflows can become complex <br> - Limited free minutes for private repos |
| **Travis CI**      | - Long history, widely used <br> - Straightforward YAML config                                 | - Limited free plan for private projects <br> - Can have slower queue times           |
| **CircleCI**       | - Powerful Docker integration <br> - Good caching features                                     | - Steeper learning curve <br> - Configuration syntax can be more verbose              |

After evaluating various options, we chose **GitHub Actions** for its ease of setup and strong integration with our repository.

### Which Tests Run in the CI Build?

All test files in the `/tests` folder (matching `*.test.js` or `*.spec.js`) are executed.

- **Unit Tests**: Checking individual functions (e.g., `requireLogin` middleware).
- **Integration Tests**: Verifying multiple components work together (e.g., register + login flow).
- **Validation & System Tests**: Making sure routes and high-level user flows meet requirements, possibly in a separate environment.

### Development Actions That Trigger a CI Build

1. **Push** to the `main` or `dev` branches.
2. **Pull Request** opened or updated, targeting `main` or `dev`.

Whenever one of these events occurs, GitHub Actions automatically checks out the code, installs dependencies, and runs our test suite.

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
