//VALIDATION TEST - Verify that a protected route /profile actually requires login

//tests/routes-validation.test.js
const request = require("supertest");
const { app, server, dbConnection } = require("../server");

describe("Protected Routes Validation", () => {
  afterAll(async () => {
    //Close the DB connection
    await dbConnection.close();

    //Close the server if it exists
    //(In test mode, 'server' may be undefined)
    if (server) {
      server.close();
    }
  });

  it("should redirect to /login if user tries to access /profile without session", async () => {
    const res = await request(app).get("/profile");
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe("/login");
  });
});
