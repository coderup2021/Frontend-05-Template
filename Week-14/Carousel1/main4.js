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
		this.root = document.createElement("div");
		this.root.classList.add("carousel");
		for (const src of this.attributes.src) {
			let child = document.createElement("div");
			child.style.backgroundImage = `url('${src}')`;
			this.root.appendChild(child);
		}
		/*
		const children = this.root.children;
		let currentIndex = 0;
		setInterval(() => {
			let nextIndex = (currentIndex + 1) % children.length;
			let current = children[currentIndex];
			let next = children[nextIndex];

			next.style.transition = "none";
		//	
		//	 
		//	  将下一张需要的图片放在准备的区域,由于是准备工作，不需要动画，需要在上一步把css动画取消
		//	 
		//	 
			next.style.transform = `translateX(${100 - 100 * nextIndex}%)`;

			setTimeout(() => {
				//需要下一个宏任务中执行当前动画，否则看不出任何效果
				next.style.transition = "";
			//	 
			//	  开始css动画，需要在上一步将取消CSS动画的style设置为空，这样做，才能使css样式中的transition动画重新生效
			//	 
				current.style.transform = `translateX(-${100 * (currentIndex + 1)}%)`; //当前图片左移一个图片的位置
				next.style.transform = `translateX(-${100 * nextIndex}%)`; //下一张图片移动到当前图片
				currentIndex = nextIndex; //将移动到当前位置的下一张图片设为当前图片
			}, 16);
		}, 2000);
*/

		const children = this.root.children;
		const onMouseDown = (event) => {
			const startX = event.clientX;
			const onMouseUp = () => {
				document.removeEventListener("mousemove", onMouseMove);
				document.removeEventListener("mouseup", onMouseUp);
			};
			const onMouseMove = (event) => {
				const x = event.clientX - startX;
				for (const child of children) {
					child.style.transition = "none";
					//将偏移量添加到图片的transform中, css动画会影响拖拽效果，需要在上一步提前关闭
					child.style.transform = `translateX(${x}px)`;
				}
			};
			document.addEventListener("mousemove", onMouseMove);
			document.addEventListener("mouseup", onMouseUp);
		};
		this.root.addEventListener("mousedown", onMouseDown);

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
