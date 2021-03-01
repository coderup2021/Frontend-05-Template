/**
 *
 * 处理鼠标多个按键同时按下，move事件会触发多次的问题
 *
 */

let element = document.documentElement;

let isListeningMouse = false; //核心

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
			//只有当鼠标按键全部抬起时，才移除move和up事件
			//核心
			document.removeEventListener("mousemove", mousemove);
			document.removeEventListener("mouseup", mouseup);
			isListeningMouse = false;
		}
	};

	if (!isListeningMouse) {
		//只需要监听一次mousemove和mouseup
		//核心
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
	console.log("move", point.clientX, point.clientY);
};

const end = (point, context) => {
	if (context.isTap) {
		clearTimeout(context.handler);
		console.log("tap");
	}
	if (context.isPan) {
		console.log("panend");
	}
	if (context.isPress) {
		console.log("pressend");
	}
	console.log("end", point.clientX, point.clientY);
};

const cancel = (point, context) => {
	console.log("cancel", point.clientX, point.clientY);
};
