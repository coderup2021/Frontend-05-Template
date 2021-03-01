const assert = require("assert");
import { parseHTML } from "../src/parser";

describe("parse function test", function () {
	let htmlStr = "<a></a>";
	it(htmlStr, function () {
		const tree = parseHTML(htmlStr).children[0];
		assert.equal(tree.tagName, "a");
		assert.equal(tree.children.length, 0);
	});

	let htmlStr1 = "<a id='#b'></a>";
	it(htmlStr1, function () {
		const tree = parseHTML(htmlStr1).children[0];
		assert.equal(tree.children.length, 0);
	});

	let htmlStr1_ = '<a href="\\baidu.com"></a>';
	it(htmlStr1_, function () {
		const tree = parseHTML(htmlStr1_).children[0];
		assert.equal(tree.children.length, 0);
	});


	let htmlStr4 = `<a class=abc></a>`
	it(htmlStr4, function () {
		const tree = parseHTML(htmlStr4).children[0];
		assert.equal(tree.children.length, 0);
	});

	let htmlStr4_ = `<a 	
	class=abc></a>`
	it(htmlStr4_, function () {
		const tree = parseHTML(htmlStr4_).children[0];
		assert.equal(tree.children.length, 0);
	});

	let htmlStr5 = `<br />`
	it(htmlStr5, function () {
		const tree = parseHTML(htmlStr5).children[0];
		assert.equal(tree.children.length, 0);
	});

	let htmlStr5_ = `<A /> upper case`
	it(htmlStr5_, function () {
		const tree = parseHTML(htmlStr5_).children[0];
		assert.equal(tree.children.length, 0);
	});

	let htmlStr6 = `<a id="#a"b></a>`
	it(htmlStr6, function () {
		const tree = parseHTML(htmlStr6).children[0];
		assert.equal(tree.children.length, 0);
	});

	let htmlStr7 = `<br class=abc />`
	it(htmlStr7, function () {
		const tree = parseHTML(htmlStr7).children[0];
		assert.equal(tree.children.length, 0);
	});


	it(`<br class=abc/>`, function () {
		const tree = parseHTML(`<br class=abc/>`).children[0];
		assert.equal(tree.children.length, 0);
	});

	let htmlStr8 = `<p ch></p>`
	it(htmlStr8, function () {
		const tree = parseHTML(htmlStr8).children[0];
		assert.equal(tree.children.length, 0);
	});


	it(`<p ch </p>`, function () {
		const tree = parseHTML(`<p ch </p>`).children[0];
		assert.equal(tree.children.length, 0);
	});

	it(`<pa></pa></pa>`, function () {
		const tree = parseHTML(`<pa></pa></pa>`).children[0];
		assert.equal(tree.children.length, 0);
	});
});
