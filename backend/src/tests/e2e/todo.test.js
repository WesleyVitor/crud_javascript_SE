import { test, describe, expect, jest } from "@jest/globals";
import request from "supertest";
import app from "../../server.js";
import { todoRepository } from "../../repository/todoRepository.js";
describe("TODO API", () => {
  describe("POST /todo/ --> When todo is created", () => {
    test("should return status 201", () => {
      return request(app)
        .post("/todo")
        .send({ title: "Fazer algo", description: "É para ser feito assim" })
        .expect("Content-Type", /json/)
        .expect(201);
    });
    test("should return a todo created", async () => {
      return request(app)
        .post("/todo")
        .send({ title: "Fazer algo", description: "É para ser feito assim" })
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              title: "Fazer algo",
              description: "É para ser feito assim",
            })
          );
        });
    });
  });
  describe("POST /todo --> When todo is not created", () => {
    test("should return status 500", () => {
      return request(app)
        .post("/todo")
        .send({ title: "Fazer algo" })
        .expect(500)
        .then((response) => {
          expect(response.body.msg).toBe("db Error");
        });
    });
  });
  describe("GET /todo/ --> When todos exist", () => {
    test("should return status 200", () => {
      return request(app)
        .get("/todo")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    test("should return a array of todo", async () => {
      return request(app)
        .get("/todo")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                title: expect.any(String),
                description: expect.any(String),
              }),
            ])
          );
        });
    });
  });

  describe("GET /todo --> When todos not exists", () => {
    test("should return status 404", () => {
      const todoRepositorySpy = jest.spyOn(todoRepository, "getAll");
      todoRepositorySpy.mockImplementationOnce(() => Promise.resolve([]));
      return request(app).get("/todo").expect(404);
    });
  });

  describe("GET /todo/:id --> When todo specific exist", () => {
    test("should return status 200", () => {
      return request(app)
        .get("/todo/3")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    test("should return the todo", async () => {
      return request(app)
        .get("/todo/3")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              title: expect.any(String),
              description: expect.any(String),
            })
          );
        });
    });
  });
  describe("GET /todo/:id --> When todo specific not exist", () => {
    test("should return status 404", () => {
      const todoRepositorySpy = jest.spyOn(todoRepository, "getOne");
      todoRepositorySpy.mockImplementationOnce(() => Promise.resolve());

      return request(app).get("/todo/1").expect(404);
    });
  });
  describe("DELETE /todo/:id --> Delete todo specific", () => {
    test.todo("should return status 200");
  });
  describe("DELETE /todo/:id --> When todo specific to delete not exist", () => {
    test.todo("should return status 404");
  });
  describe("UPDATE /todo/:id --> When todo specific exist", () => {
    test.todo("should return status 200");
    test.todo("should return the todo specific updated");
  });
  describe("UPDATE /todo/:id --> When todo specific not exist", () => {
    test.todo("should return status 404");
  });
});
