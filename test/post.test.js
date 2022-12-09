const request = require('supertest');
const app = require('../app');
const postDataMapper = require('../dataMappers/postDataMapper')
const categoryDataMapper = require('../dataMappers/categoryDataMapper')

describe('Test Post router', () => {

    describe('GET /posts', () => {

        test("should respond with a json object", async () => {
            const response = await request(app).get("/posts")
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/posts")
            expect(response.status).toBe(200)
        })
    })


    describe('POST /posts', () => {
        test("should respond with data defined in json object", async () => {
            const response = await request(app).post("/posts").send({
                content: "s",
                title: "aaa",
                slug: "a",
                category_id: 1
            })
            // response should have a json object in its body
            // and we use the data (key) from the json object and expected to be defined
            expect(response.body.data).toBeDefined()
            // expect(postDataMapper.insertPost.mock.calls.length).toBe(1)
        })

        test("should respond with a json object", async () => {
            const response = await request(app).post("/posts").send({
                content: "s",
                title: "aaa",
                slug: "a",
                category_id: 1
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })

        test("should respond with a 201 status code", async () => {
            const response = await request(app).post("/posts").send({
                content: "s",
                title: "aaa",
                slug: "a",
                category_id: 1
            })
            expect(response.status).toBe(201)
        })
    })

})

describe('Test Category router', () => {

    describe('GET /categories', () => {

        test("should respond with a json object", async () => {
            const response = await request(app).get("/categories")
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })

        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/categories")
            expect(response.status).toBe(200)
        })
    })

    describe('GET /categories{id}', () => {

        test("should respond with a json object", async () => {
            const response = await request(app).get("/categories/1222")
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
            expect(response.status).toBe(404)
        })

        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/categories/1")
            expect(response.status).toBe(200)
            // expect(findCategoryById.mock.calls.length).toBe(1)
        })

    })
})

