import { numCommaFormatter, numFormatter, urlFormatter, bioFormatter, hashtagFormatter } from "../../util/formatter";
import Button from "../../components/button";

describe("formatter", () => {
    test("numCommaFormatter()", () => {
        expect(numCommaFormatter("")).toBe("");
        expect(numCommaFormatter(-999)).toBe("-999");
        expect(numCommaFormatter(999)).toBe("999");
        expect(numCommaFormatter(1_000)).toBe("1,000");
        expect(numCommaFormatter(10_000)).toBe("10,000");
        expect(numCommaFormatter(100_000)).toBe("100,000");
        expect(numCommaFormatter(1_000_000)).toBe("1,000,000");
    });

    test("numFormatter()", () => {
        expect(numFormatter("")).toBe("");
        expect(numFormatter(-999)).toBe(-999);
        expect(numFormatter(999)).toBe(999);
        expect(numFormatter(1_000)).toBe("1.0k");
        expect(numFormatter(10_000)).toBe("10.0k");
        expect(numFormatter(100_000)).toBe("100.0k");
        expect(numFormatter(1_000_000)).toBe("1.0M");
    });

    test("urlFormatter()", () => {
        expect(urlFormatter(undefined)).toBe("");
        expect(urlFormatter("TEST")).toBe("");
        expect(urlFormatter("www.instagram.com")).toBe("");
        expect(urlFormatter("https://www.instagram.com/")).toBe("www.instagram.com");
    });

    test("bioFormatter()", () => {
        expect(bioFormatter("")).toEqual([""]);
        expect(bioFormatter("TEST")).toEqual(["TEST"]);
        expect(bioFormatter("ONE\nTWO")).toEqual([<span key={0}>ONE<br/></span>,<span key={1}>TWO<br/></span>]);
    });

    test("hashtagFormatter()", () => {
        expect(hashtagFormatter(undefined)).toEqual([undefined]);
        expect(hashtagFormatter("TEST")).toEqual(["TEST"]);
        expect(hashtagFormatter("#test")).toEqual(["", <Button key={1} href="/explore/tags/test" style={{color: "#00376b", display: "inline"}}>#test</Button>]);
        expect(hashtagFormatter("@test")).toEqual(["", <Button key={1} href="/test" style={{color: "#00376b", display: "inline"}}>@test</Button>]);
    });
})

