const server = require("../api/server.js");
const request = require("supertest");
const db = require("../database/db-config");

beforeAll((done) => {
  request(server)
    .post("/api/signin")
    .send({
      email: "Mike@jourrapide.com",
      password: "123",
    })
    .end((err, response) => {
      token = response.body.token;
      // console.log("tokenTEst ", token);
      done();
    });
});

describe("GET /", () => {
  test("It should require authorization", () => {
    return request(server)
      .get("/api/clients")
      .then((res) => {
        expect(res.status).toBe(401);
      });
  });

  test("/clients It responds with JSON", () => {
    return request(server)
      .get("/api/clients")
      .set("Authorization", `${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
      });
  });

  test("/clients class responds with JSON and 200", () => {
    return request(server)
      .get("/api/clients/1")
      .set("Authorization", `${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
      });
  });

  test("/clients/class It responds with JSON", () => {
    return request(server)
      .get("/api/clients/class")
      .set("Authorization", `${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
      });
  });
});

describe("POST /", () => {
  test("POST It should return JSON & require authorization", () => {
    return request(server)
      .post("/api/clients/1/enrollclass/3")
      .set("Authorization", `${token}`)
      .send()

      .expect("Content-Type", /json/)
      .expect(200);
  });
});
describe("Delete /", () => {
  test("Delete It should require authorization & delete the class", () => {
    return request(server)
      .del("/api/clients/1/deleteclass/3")
      .set("Authorization", `${token}`)

      .expect("Content-Type", /json/)
      .expect(200);
  });
});
