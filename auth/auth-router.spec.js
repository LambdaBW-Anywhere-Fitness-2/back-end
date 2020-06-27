const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/db-config");

describe("Client auth /", () => {
  it("AFTER POST should return 200 ok", async () => {
    const res = await request(server).post("/api/signup/client").send({
      name: "Mike",
      email: "Mike@jourrapide.com",
      password: "123",
      phone_number: "540-974-2579",
    });
    expect(res.status).toBe(201);
  });
  it("should return name after signup", async () => {
    const res = await request(server).post("/api/signup/client").send({
      name: "Sam",
      email: "Sam@jourrapide.com",
      password: "123",
      phone_number: "540-974-2579",
    });
    expect(res.body.name).toBe("Sam");
  });
  it("should return email user after signin", async () => {
    const res = await request(server)
      .post("/api/signin")
      .send({ email: "Mike@jourrapide.com", password: "123" });
    expect(res.type).toBe("application/json");
  }, 30000);
});

describe("Instructor auth/", () => {
  it("AFTER POST should return 200 ok", async () => {
    const res = await request(server).post("/api/signup/instructor").send({
      name: "Mike99",
      email: "Mike99@jourrapide.com",
      password: "123",
      role_id: 123,
    });
    expect(res.status).toBe(201);
  });
  it("should return name after signup", async () => {
    const res = await request(server).post("/api/signup/instructor").send({
      name: "Sam2399",
      email: "Sam2w200@jourrapide.com",
      password: "123",
      role_id: 123,
    });
    expect(res.body.name).toBe("Sam2399");
  });
  it("should return email user after signin", async () => {
    const res = await request(server)
      .post("/api/signin")
      .send({ email: "Mike@jourrapide.com", password: "123" });
    expect(res.type).toBe("application/json");
  }, 30000);
});
