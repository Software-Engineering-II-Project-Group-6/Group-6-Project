//SYSTEM TEST - Spawn the server in a new process, perform a basic check for the home page and kill it

//tests/system.test.js
const { spawn } = require("child_process");
const request = require("supertest");

describe("System Test - Production Environment", () => {
  let serverProcess;
  let serverURL = "http://localhost:4000";

  beforeAll((done) => {
    //Spawn a separate Node process with NODE_ENV=production on port 4000
    serverProcess = spawn("node", ["server.js"], {
      env: {
        ...process.env,
        NODE_ENV: "production",
        PORT: 4000,
      },
      cwd: process.cwd(),
    });

    //Waiting for server to spawn
    setTimeout(() => done(), 3000);
  });

  afterAll(() => {
    //Kill
    if (serverProcess) {
      serverProcess.kill();
    }
  });

  it("should respond with 200 or redirect when GET / in production mode", async () => {
    const res = await request(serverURL).get("/");
    expect([200, 302]).toContain(res.status);
  });
});
