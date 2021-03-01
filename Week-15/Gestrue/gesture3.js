/**
 *
 * 将全局变量改为Context，以变支持多个按键同时按下的事件
 *
 */

let element = document.documentElement;

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
		let button = 1;
		while (button <= event.buttons) {
			if (button & event.buttons) {
				//event.buttons的顺序和button是不一致的，需要调整
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

		document.removeEventListener("mousemove", mousemove);
		document.removeEventListener("mouseup", mouseup);
	};
	document.addEventListener("mousemove", mousemove);
	document.addEventListener("mouseup", mouseup);
});

let contexts = new Map(); //移动端 创建map保存上下文
element.addEventListener("touchstart", (event) => {
	for (const touch of event.changedTouches) {
		//开始事件中创建上下文
		const context = Object.create(null);
		contexts.set(touch.identifier, context);
		start(touch, context);
	}
});
element.addEventListener("touchmove", (event) => {
	for (const touch of event.changedTouches) {
		//移动事件中使用上下文
		const context = contexts.get(touch.identifier);
		move(touch, context);
	}
});
element.addEventListener("touchend", (event) => {
	for (const touch of event.changedTouches) {
		//结束事件中使用并删除上下文
		const context = contexts.get(touch.identifier);
		end(touch, context);
		contexts.delete(touch.identifier);
	}
});

//诸如window.alert系统事件会打断touch事件，将touch事件的状态改变为cancel
element.addEventListener("touchcancel", (event) => {
	for (const touch of event.changedTouches) {
		//中断事件中使用并删除上下文
		const context = contexts.get(touch.identifier);
		cancel(touch, context);
		contexts.delete(touch.identifier);
	}
});

const start = (point, context) => {
	//为什么这里， start会触发两次 ????????
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
