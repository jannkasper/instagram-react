import request from "supertest";
import app from "../src/app.js";

describe("Test the root path", () => {
    test("GET /api/ -> 404", done => {
        request(app)
            .get("/api/")
            .then(response => {
                expect(response.statusCode).toBe(404);
                done();
            });
    });
    test("GET /api/posts/ -> 200", done => {
        request(app)
            .get("/api/posts/")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});
