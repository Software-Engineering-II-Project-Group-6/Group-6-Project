//INTEGRATION TEST - Test registration and login flows, involving routes, database, and session usage
//Basically I made it so it will create a test user and tets various flows. Everytime this test is ran, it will delete that user and recretae it so
//the OG database is not affected

//tests/user-flow.integration.test.js
const request = require("supertest");
const { app, dbConnection } = require("../server");
const User = require("../models/User");

describe("User Registration and Login (Integration)", () => {
  afterAll(async () => {
    await dbConnection.close();
  });

  it("should register a new user then login successfully", async () => {
    //Remove test user
    await User.deleteOne({ email: "testuser@example.com" });

    const registerRes = await request(app).post("/register").send({
      email: "testuser@example.com",
      username: "testuser",
      password: "password123",
      age: 25,
      height: 170,
      weight: 70,
      gender: "male",
    });
    expect(registerRes.status).toBe(302);
    expect(registerRes.headers.location).toBe("/login");

    const loginRes = await request(app).post("/login").send({
      email: "testuser@example.com",
      password: "password123",
    });
    expect(loginRes.status).toBe(302);
    expect(loginRes.headers.location).toBe("/dashboard");
  });
});
