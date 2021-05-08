import * as axios from "axios";
import { publicFetch } from "../../util/fetcher";

jest.mock("axios");


test("initialization", () => {
    expect(publicFetch).not.toBeNull()
    expect(axios.create).toHaveBeenCalled()
})
