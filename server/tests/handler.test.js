import { errorHandler, graphqlHandler } from "../src/utils/handler";

describe("errorHandler()", () => {
    const response = { data: {}, status: 'status', statusText: 'statusText'};
    const request = { statusText: 'statusText' };
    const message = "message";

    test("error.response", () => {
        const expected = { error: true, errorStatus: response.status, errorMessage: response.statusText};
        expect(errorHandler({ response })).toEqual(expected);
        expect(errorHandler({ response, request })).toEqual(expected);
        expect(errorHandler({ response, request, message })).toEqual(expected);
    })

    test("error.request", () => {
        const expected = { error: true,  errorMessage: request.statusText };
        expect(errorHandler({ request })).toEqual(expected);
        expect(errorHandler({ request, message })).toEqual(expected);
    })

    test("error.message", () => {
        const expected = { error: true,  errorMessage: message };
        expect(errorHandler({ message })).toEqual(expected);
    })
});

describe("graphqlHandler()", () => {
    test("success response", () => {
        const response = { status: 200, data: { key: 'value' } };
        const expected = response.data;
        expect(graphqlHandler(response)).toEqual(expected);
    })

    test("fail response", () => {
        const response = { status: 300, statusText: 'statusText' };
        expect(() => {graphqlHandler({ status: 300, statusText: 'statusText' })}).toThrowError(new Error('statusText'));
    })

})
