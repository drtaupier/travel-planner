import {readCountryCode} from '../src/client/js/countries';

test("readCountryCode 'input: Not Found' ", () => {
    expect(readCountryCode("David")).toBe("Country not found");
});