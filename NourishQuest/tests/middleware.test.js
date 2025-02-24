//UNIT TEST - SINGLE FUNCTION IN ISOLATION

//tests/middleware.test.js
const { describe, it, expect } = require("@jest/globals");

function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
}

describe("requireLogin Middleware", () => {
  it("should redirect to /login if userId is not in session", () => {
    const req = { session: {} }; //No userId
    const res = { redirect: jest.fn() }; //Mock function
    const next = jest.fn();

    requireLogin(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("/login");
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if userId is present in session", () => {
    const req = { session: { userId: "123" } };
    const res = { redirect: jest.fn() };
    const next = jest.fn();

    requireLogin(req, res, next);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
