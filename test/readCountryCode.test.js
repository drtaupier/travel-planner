import {readCountryCode} from '../src/client/js/countries';

test("readCountryCode 'input: Found' ", () => {
    expect(readCountryCode("United States")).toBe("US");
});