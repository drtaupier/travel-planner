const readCountryName = require('../src/server/countries');

test("readCountryCode 'input: Not Found' ", () => {
    expect(readCountryName("David")).toBe("Country not found");
});