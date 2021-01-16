/**
 *
 * 实现flick事件
 * 在context中新增一个points属性，用于存n个移动的点，通过这些点来计算是否需要flick
 *
 */

let element = document.documentElement;

let isListeningMouse = false;

element.addEventListener("mousedown", (event) => {
	let context = Object.create(null);
	contexts.set(`mouse${1 << event.button}`, context);

	start(event, context);
	const mousemove = (event) => {
		/* event.buttons 采用掩码设计
		 * 0b11111  表示5个全按下
		 * 0b00001  表示左键按下
		 * 0b00010  表示中键按下
		 * 0b00011  表示中键和左键按下
		 */
		isListeningMouse = true;
		let button = 1;
		while (button <= event.buttons) {
			if (button & event.buttons) {
				let key;
				if (button === 2) key = 4;
				else if (button === 4) key = 2;
				else key = button;

				let context = contexts.get(`mouse${key}`);
				move(event, context);
			}
			button = button << 1;
		}
	};
	const mouseup = (event) => {
		context = contexts.get(`mouse${1 << event.button}`);
		end(event, context);
		contexts.delete(`mouse${1 << event.button}`);

		if (event.buttons === 0) {
			document.removeEventListener("mousemove", mousemove);
			document.removeEventListener("mouseup", mouseup);
			isListeningMouse = false;
		}
	};

	if (!isListeningMouse) {
		document.addEventListener("mousemove", mousemove);
		document.addEventListener("mouseup", mouseup);
		isListeningMouse = true;
	}
});

let contexts = new Map();
element.addEventListener("touchstart", (event) => {
	for (const touch of event.changedTouches) {
		const context = Object.create(null);
		contexts.set(touch.identifier, context);
		start(touch, context);
	}
});
element.addEventListener("touchmove", (event) => {
	for (const touch of event.changedTouches) {
		const context = contexts.get(touch.identifier);
		move(touch, context);
	}
});
element.addEventListener("touchend", (event) => {
	for (const touch of event.changedTouches) {
		const context = contexts.get(touch.identifier);
		end(touch, context);
		contexts.delete(touch.identifier);
	}
});

element.addEventListener("touchcancel", (event) => {
	for (const touch of event.changedTouches) {
		const context = contexts.get(touch.identifier);
		cancel(touch, context);
		contexts.delete(touch.identifier);
	}
});

const start = (point, context) => {
	console.log("start", point.clientX, point.clientY);
	context.startX = point.clientX;
	context.startY = point.clientY;

	context.points = [
		//核心  用于计算最后的速度
		{
			t: Date.now(),
			x: point.clientX,
			y: point.clientY,
		},
	];

	context.isTap = true;
	context.isPan = false;
	context.sPress = false;

	context.handler = setTimeout(() => {
		context.isPress = true;
		context.isPan = false;
		context.isTap = false;
		context.handler = null;
		console.log("press");
	}, 500);
};

const move = (point, context) => {
	context.dx = point.clientX - context.startX;
	context.dy = point.clientY - context.startY;
	if (!context.isPan && context.dx ** 2 + context.dy ** 2 > 100) {
		context.isPan = true;
		context.isPress = false;
		context.isTap = false;
		clearTimeout(context.handler);
		context.handler = null;
		console.log("pan start");
	}
	if (context.isPan) {
		console.log(context.dx, context.dy);
	}

	context.points.filter((p) => Date.now() - p.t < 500); //过滤掉500ms之前的，留下500ms之内的
	context.points.push({
		t: Date.now(),
		x: point.clientX,
		y: point.clientY,
	});

	console.log("move", point.clientX, point.clientY);
};

const end = (point, context) => {
	if (context.isTap) {
		clearTimeout(context.handler);
		dispatch("tap", {});
		console.log("tap");
	}
	if (context.isPan) {
		console.log("panend");
	}
	if (context.isPress) {
		console.log("pressend");
	}

	context.points = context.points.filter((p) => Date.now() - p.t < 500); //过滤掉500ms之前的，留下500ms之内的
	let d, v;
	if (context.points.length === 0) {
		//如果500ms内没有点，说明up之前，mouse或手势停了下来，v=0
		v = 0;
	} else {
		d = Math.sqrt(
			(point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2,
		); //移动距离 (用points里面第0个点和当前点计算， 第0个点是最早的那个点)
		v = d / (Date.now() - context.points[0].t); //移动速度
	}
	console.log("v", v);
	if (v > 1.5) {
		//1.5是个经验值， 大于1.5认为是flick
		console.log("flick");
		context.isFlick = true;
	} else {
		context.isFlick = false;
	}
	console.log("end", point.clientX, point.clientY);
};

const cancel = (point, context) => {
	console.log("cancel", point.clientX, point.clientY);
};

function dispatch(type, properties) {
	let event = new Event(type);
	//let event = new CustomEvent(type,{});  // CustomeEvent 这个也可以用
	for (const name in properties) {
		event[name] = properties[name];
	}

	element.dispatchEvent(event);
}
