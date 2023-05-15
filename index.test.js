const request = require("supertest");
const { describe, it, test, expect } = require("@jest/globals");
const { app, show, user } = require("./src/app");
const seed = require("./seed");

//
beforeAll(async () => {
  await seed();
});

describe("User Tests", () => {
  it("/users request has succeeded on get", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
  });
  it("/users returns users", async () => {
    const response = await request(app).get("/users");
    expect(response.body[0]).toHaveProperty("username");
  });
});

// Users
// GET all users
// GET one user
// GET all shows watched by a user (user id in req.params)
// PUT update and add a show if a user has watched it

// Shows
// GET all shows
// GET one show
// GET shows of a particular genre (genre in req.params)
// PUT update rating of a show that has been watched
// PUT update the status of a show
// DELETE a show
