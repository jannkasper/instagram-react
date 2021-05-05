import utilsRewire, { decodeParamObject } from "../src/utils/formatter.js"

describe("replaceSpecialCharacters()", () => {
    const replaceSpecialCharacters = utilsRewire.__get__('replaceSpecialCharacters');
    test("',' translates to '%2C'", async () => {
        expect(replaceSpecialCharacters(',')).toBe('%2C');
    })
    test("'{' translates to '%7B'", async () => {
        expect(replaceSpecialCharacters('{')).toBe('%7B');
    })
    test("'}' translates to '%7D'", async () => {
        expect(replaceSpecialCharacters('}')).toBe('%7D');
    })
    test("':' translates to '%3A'", async () => {
        expect(replaceSpecialCharacters(':')).toBe('%3A');
    })
    test("'\"' translates to '%22'", async () => {
        expect(replaceSpecialCharacters('"')).toBe('%22');
    })
    test("'=' translates to '%3D'", async () => {
        expect(replaceSpecialCharacters('=')).toBe('%3D');
    })
    test("'\\' translates to '%2C'", async () => {
        expect(replaceSpecialCharacters('\\')).toBe('%5C');
    })
    test("'' translates to ''", async () => {
        expect(replaceSpecialCharacters('')).toBe('');
    })
    test("' ' translates to ' '", async () => {
        expect(replaceSpecialCharacters(' ')).toBe(' ');
    })
    test("NULL translates to NULL", async () => {
        expect(replaceSpecialCharacters(null)).toBeNull();
    })
});

describe("stringifyParamObject()", () => {
    const stringifyParamObject = utilsRewire.__get__('stringifyParamObject');
    test("{} translates to '{}'", async () => {
        expect(stringifyParamObject({})).toBe('{}');
    })
    test("'{key: 'value'}' translates to '{\"key\":\"value\"}'", async () => {
        expect(stringifyParamObject({key: 'value'})).toBe("{\"key\":\"value\"}");
    })
    test("'{key: 'value'}' translates to '{\"key1\":\"value1\",\"key2\":\"value2\"}'", async () => {
        expect(stringifyParamObject({key1: 'value1', key2: 'value2'})).toBe("{\"key1\":\"value1\",\"key2\":\"value2\"}");
    })
    test("NULL translates to NULL", async () => {
        expect(stringifyParamObject(null)).toBeNull();
    })
    test("'' translates to ''", async () => {
        expect(stringifyParamObject('')).toBe('');
    })
});

describe("decodeParamObject()", () => {
    test("'{}' translates to '%7B%7D", async () => {
        expect(decodeParamObject({})).toBe('%7B%7D');
    })
    test("'{key: 'value'}' translated to '%7B%22key%22%3A%22value%22%7D'", async () => {
        expect(decodeParamObject({key: 'value'})).toBe('%7B%22key%22%3A%22value%22%7D');
    })
    test("'{key: 'value'}' translated to '%7B%22key1%22%3A%22value1%22%2C%22key2%22%3A%22value2%22%7D'", async () => {
        expect(decodeParamObject({key1: 'value1', key2: 'value2'})).toBe('%7B%22key1%22%3A%22value1%22%2C%22key2%22%3A%22value2%22%7D');
    })
    test("NULL translates to NULL", async () => {
        expect(decodeParamObject(null)).toBeNull();
    })
    test("'' translates to ''", async () => {
        expect(decodeParamObject('')).toBe('');
    })
});
