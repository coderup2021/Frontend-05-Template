/**
 *
 * 为start, move, end, cancel添加具体处理逻辑
 * 抽象出tap, pan, press 3种事件
 *
 */

let element = document.documentElement;

element.addEventListener("mousedown", (event) => {
	start(event);
	const mousemove = (event) => {
		move(event);
	};
	const mouseup = (event) => {
		end(event);
		document.removeEventListener("mousemove", mousemove);
		document.removeEventListener("mouseup", mouseup);
	};
	document.addEventListener("mousemove", mousemove);
	document.addEventListener("mouseup", mouseup);
});

element.addEventListener("touchstart", (event) => {
	for (const touch of event.changedTouches) {
		start(touch);
	}
});
element.addEventListener("touchmove", (event) => {
	for (const touch of event.changedTouches) {
		move(touch);
	}
});
element.addEventListener("touchend", (event) => {
	for (const touch of event.changedTouches) {
		end(touch);
	}
});

//诸如window.alert系统事件会打断touch事件，将touch事件的状态改变为cancel
element.addEventListener("touchcancel", (event) => {
	for (const touch of event.changedTouches) {
		cancel(touch);
	}
});

let handler;
let startX, startY;
let isTap = true; //点击
let isPan = false; //移动
let isPress = false; //长按

const start = (point) => {
	//为什么这里， start会触发两次 ????????
	console.log("start", point.clientX, point.clientY);
	startX = point.clientX;
	startY = point.clientY;

	isTap = true;
	isPan = false;
	isPress = false;

	handler = setTimeout(() => {
		isPress = true;
		isPan = false;
		isTap = false;
		handler = null;
		console.log("press");
	}, 500);
};

const move = (point) => {
	let dx = point.clientX - startX,
		dy = point.clientY - startY;
	if (!isPan && dx ** 2 + dy ** 2 > 100) {
		isPan = true;
		isPress = false;
		ifTap = false;
		clearTimeout(handler);
		handler = null;
		console.log("pan start");
	}
	if (isPan) {
		console.log(dx, dy);
		console.log("pan start");
	}
	console.log("move", point.clientX, point.clientY);
};

const end = (point) => {
	if (isTap) {
		clearTimeout(handler);
		console.log("tap");
	}
	if (isPan) {
		console.log("panend");
	}
	if (isPress) {
		//clearTimeout(handler);
		console.log("pressend");
	}
	console.log("end", point.clientX, point.clientY);
};

const cancel = (point) => {
	console.log("cancel", point.clientX, point.clientY);
};
