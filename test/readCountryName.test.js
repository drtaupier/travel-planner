const readCountryName = require('../src/server/countries');

test("readCountryCode 'input: Found' ", () => {
    expect(readCountryName("US")).toBe("United States");
});