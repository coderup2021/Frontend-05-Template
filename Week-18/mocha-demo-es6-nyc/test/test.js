const assert = require("assert");
import { add, mul } from "../index";

describe("add function test", function () {
	it("1+2 should be 3", function () {
		assert.equal(add(1, 2), 3);
	});
	it("-5+2 should be -3", function () {
		assert.equal(add(-5, 2), -3);
	});
});

describe("mul function test", function () {
	it("1*2 should be 2", function () {
		assert.equal(mul(1, 2), 2);
	});
	it("-5*2 should be -10", function () {
		assert.equal(mul(-5, 2), -10);
	});
});
