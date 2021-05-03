import utilsRewire, { convertPathParams } from "../src/utils/fetcher.js"

describe("replaceInString() -> success translation", () => {
    const replaceInString = utilsRewire.__get__('replaceInString');
    test("',' translates to '%2C'", async () => {
        expect(replaceInString(',')).toBe('%2C');
    })
    test("'{' translates to '%7B'", async () => {
        expect(replaceInString('{')).toBe('%7B');
    })
    test("'}' translates to '%7D'", async () => {
        expect(replaceInString('}')).toBe('%7D');
    })
    test("':' translates to '%3A'", async () => {
        expect(replaceInString(':')).toBe('%3A');
    })
    test("'\"' translates to '%22'", async () => {
        expect(replaceInString('"')).toBe('%22');
    })
    test("'=' translates to '%3D'", async () => {
        expect(replaceInString('=')).toBe('%3D');
    })
    test("'\\' translates to '%2C'", async () => {
        expect(replaceInString('\\')).toBe('%5C');
    })
});

describe("replaceInString() -> edge cases", () => {
    const replaceInString = utilsRewire.__get__('replaceInString');
    test("'' translates to ''", async () => {
        expect(replaceInString('')).toBe('');
    })
    test("' ' translates to ' '", async () => {
        expect(replaceInString(' ')).toBe(' ');
    })
    test("NULL translates to NULL", async () => {
        expect(replaceInString(null)).toBeNull();
    })
});

describe("convertPathParams() -> success translation", () => {
    test("'{}' translated to '%7B%7D", async () => {
        expect(convertPathParams({})).toBe('%7B%7D');
    })
    test("'{key: 'value'}' translated to '%7B%22key%22%3A%22value%22%7D'", async () => {
        expect(convertPathParams({key: 'value'})).toBe('%7B%22key%22%3A%22value%22%7D');
    })
    test("'{key: 'value'}' translated to '%7B%22key1%22%3A%22value1%22%2C%22key2%22%3A%22value2%22%7D'", async () => {
        expect(convertPathParams({key1: 'value1', key2: 'value2'})).toBe('%7B%22key1%22%3A%22value1%22%2C%22key2%22%3A%22value2%22%7D');
    })
});

describe("convertPathParams() -> edge cases", () => {
    test("NULL translates to NULL", async () => {
        expect(convertPathParams(null)).toBeNull();
    })
    test("'' translates to ''", async () => {
        expect(convertPathParams('')).toBe('');
    })
});
