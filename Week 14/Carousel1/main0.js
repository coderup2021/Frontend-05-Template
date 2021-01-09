import { createElement, Component } from "./framework";
class Carousel extends Component {
	constructor() {
		super();
		this.attributes = Object.create(null);
	}
	setAttribute(name, value) {
		this.attributes[name] = value;
	}
	render() {
		console.log(this.attributes);
		this.root = document.createElement("div");
		this.root.classList.add("carousel");
		for (const src of this.attributes.src) {
			let child = document.createElement("div");
			child.style.backgroundImage = `url('${src}')`;
			this.root.appendChild(child);
		}
		for (const child of this.root.children) {
			let current = 0;
			setInterval(() => {
				++current;
				child.style.transform = `translateX(-${100 * current}%)`;
			}, 2000);
		}
		return this.root;
	}
	mountTo(parent) {
		parent.appendChild(this.render()); //此处调render,而不是在constructor里面调render,可以确保在render之前拿到attributes
	}
}

let links = [
	"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1820723382,458456502&fm=26&gp=0.jpg",
	"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1343752650,3163174056&fm=26&gp=0.jpg",
	"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2711497450,1961596892&fm=26&gp=0.jpg",
];

let a = <Carousel src={links} />;

a.mountTo(document.body);
