const server = require("../api/server.js");
const request = require("supertest");
const db = require("../database/db-config");
let token;

beforeAll((done) => {
  request(server)
    .post("/api/signin")
    .send({
      email: "Mike99@jourrapide.com",
      password: "123",
    })
    .end((err, response) => {
      token = response.body.token;

      done();
    });
});

describe("GET /", () => {
  test("It should require authorization", () => {
    return request(server)
      .get("/api/instructor")
      .then((res) => {
        expect(res.status).toBe(401);
      });
  }, 6000);

  test("It responds with JSON", () => {
    return request(server)
      .get("/api/instructor")
      .set("Authorization", `${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
      });
  });

  test("get by id It responds with JSON", () => {
    return request(server)
      .get("/api/instructor/1")
      .set("Authorization", `${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
      });
  });
});

describe("POST / PUT", () => {
  test("POST It should return JSON & require authorization", () => {
    return request(server)
      .post("/api/instructor/createclass")
      .set("Authorization", `${token}`)
      .send({
        class_name: "TESTING????",
        type: "Boxing",
        start_time: "Midday",
        start_date: "2-11-2020",
        duration: "15-30 min",
        intensity_level: "Intermediate",
        location: "100 street 220 SF,CA",
        registered_attendees: 5,
        class_size: 9,
        instructor_id: 2,
      })

      .expect("Content-Type", /json/)
      .expect(200);
  });
  test("PUT It should return JSON & require authorization", () => {
    return request(server)
      .put("/api/instructor/updateclass/1")
      .set("Authorization", `${token}`)
      .send({
        class_name: "TESTING??  UPDATE",
        type: "UPDATE",
        start_time: "Midday",
        start_date: "2-11-2020",
        duration: "15-30 min",
        intensity_level: "Intermediate",
        location: "100 street 220 SF,CA",
        registered_attendees: 5,
        class_size: 9,
        instructor_id: 2,
      })

      .expect("Content-Type", /json/)
      .expect(200);
  });
});
describe("Delete /", () => {
  test("Delete It should require authorization & delete the class", () => {
    return request(server)
      .del("/api/instructor/deleteclass/2")
      .set("Authorization", `${token}`)

      .expect("Content-Type", /json/)
      .expect(200);
  }, 30000);
});
