import * as axios from "axios";
import {retrieveImage} from "../src/utils/image";

// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");

describe("retrieveImage()", () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: "value", headers : {"content-type": "png"} }));

    test("return stringify data result", async () => {
        expect(await retrieveImage("")).toMatch(/data:png;base64.*/)
    })
});
