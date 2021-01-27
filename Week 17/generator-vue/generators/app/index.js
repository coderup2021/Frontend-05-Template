var Generator = require("yeoman-generator");

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
		this.answer = Object.create(null);
	}

	async initPacket() {
		this.answer = await this.prompt([
			{
				type: "input",
				name: "name",
				message: "Your project name",
				default: this.appname, // Default to current folder name
			},
		]);

		const pkgJson = {
			name: this.answer.name,
			version: "1.0.0",
			description: "",
			main: "generators/app/index.js",
			license: "MIT",
			devDendencies: {},
			dependencies: {},
		};

		this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
		this.npmInstall(["vue"], { "save-dev": false });
		this.npmInstall(
			[
				"webpack",
				"webpack-cli",
				"vue-loader",
				"vue-template-compiler",
				"vue-style-loader",
				"css-loader",
				"copy-webpack-plugin",
			],
			{
				"save-dev": true,
			},
		);
	}

	copyFile() {
		this.fs.copyTpl(
			this.templatePath("HelloWorld.vue"),
			this.destinationPath("src/HelloWorld.vue"),
		);
		this.fs.copyTpl(
			this.templatePath("webpack.config.js"),
			this.destinationPath("webpack.config.js"),
		);
		this.fs.copyTpl(this.templatePath("main.js"), this.destinationPath("src/main.js"));
		this.fs.copyTpl(this.templatePath("index.html"), this.destinationPath("src/index.html"), {
			title: this.answer.name,
		});
	}
};
