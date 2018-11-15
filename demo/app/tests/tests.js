var Bottombar = require("nativescript-bottombar").Bottombar;
var bottombar = new Bottombar();

describe("greet function", function() {
    it("exists", function() {
        expect(bottombar.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(bottombar.greet()).toEqual("Hello, NS");
    });
});