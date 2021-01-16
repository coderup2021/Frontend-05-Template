/**
 * 统一电脑端的鼠标事件和移动端的手势事件的触发调用为以下 4个函数
 * start
 * move
 * end
 * cancel(移动端才有，电脑端没有)
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

const start = (point) => {
	//为什么这里在浏览器的移动版的话， start会触发两次 ????????
	console.log("start", point.clientX, point.clientY);
};

const move = (point) => {
	console.log("move", point.clientX, point.clientY);
};

const end = (point) => {
	console.log("end", point.clientX, point.clientY);
};

const cancel = (point) => {
	console.log("cancel", point.clientX, point.clientY);
};
