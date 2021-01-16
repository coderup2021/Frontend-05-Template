/**
 *
 * 按照 "监听 => 识别 => 派发" 解耦，封装成三部分
 * listen=>recognize=>dispatch
 *
 * new Listener(element, new Recognizer(new Dispatcher(element)))
 *
 */

let element = document.documentElement;

export class Dispatcher {
	constructor(element) {
		this.element = element;
	}
	dispatch(type, properties) {
		console.log("dispatch event:", type);
		let event = new Event(type);
		//let event = new CustomEvent(type,{});  // CustomeEvent 这个也可以用
		for (const name in properties) {
			event[name] = properties[name];
		}

		this.element.dispatchEvent(event);
	}
}

export class Listener {
	constructor(element, recognize) {
		let isListeningMouse = false;

		element.addEventListener("mousedown", (event) => {
			let context = Object.create(null);
			contexts.set(`mouse${1 << event.button}`, context);

			recognize.start(event, context);
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
						recognize.move(event, context);
					}
					button = button << 1;
				}
			};
			const mouseup = (event) => {
				context = contexts.get(`mouse${1 << event.button}`);
				recognize.end(event, context);
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
				recognize.start(touch, context);
			}
		});
		element.addEventListener("touchmove", (event) => {
			for (const touch of event.changedTouches) {
				const context = contexts.get(touch.identifier);
				recognize.move(touch, context);
			}
		});
		element.addEventListener("touchend", (event) => {
			for (const touch of event.changedTouches) {
				const context = contexts.get(touch.identifier);
				recognize.end(touch, context);
				contexts.delete(touch.identifier);
			}
		});

		element.addEventListener("touchcancel", (event) => {
			for (const touch of event.changedTouches) {
				const context = contexts.get(touch.identifier);
				recognize.cancel(touch, context);
				contexts.delete(touch.identifier);
			}
		});
	}
}

export class Recognizer {
	constructor(dispatcher) {
		this.dispatcher = dispatcher;
	}

	start(point, context) {
		context.startX = point.clientX;
		context.startY = point.clientY;

		context.points = [
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
			this.dispatcher.dispatch("press", {});
		}, 500);
	}

	move(point, context) {
		context.dx = point.clientX - context.startX;
		context.dy = point.clientY - context.startY;
		if (!context.isPan && context.dx ** 2 + context.dy ** 2 > 100) {
			context.isPan = true;
			context.isPress = false;
			context.isTap = false;
			clearTimeout(context.handler);
			context.handler = null;
			context.isVertical = Math.abs(context.dx) < Math.abs(context.dy);

			this.dispatcher.dispatch("panstart", {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY,
				isVertical: context.isVertical,
			});
		}

		if (context.isPan) {
			this.dispatcher.dispatch("pan", {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY,
				isVertical: context.isVertical,
			});
		}

		context.points.filter((p) => Date.now() - p.t < 500);
		context.points.push({
			t: Date.now(),
			x: point.clientX,
			y: point.clientY,
		});
	}

	end(point, context) {
		if (context.isTap) {
			clearTimeout(context.handler);
			this.dispatcher.dispatch("tap", {
				clientX: point.clientX,
				clientY: point.clientY,
			});
		}
		if (context.isPress) {
			this.dispatcher.dispatch("pressend", {});
		}

		context.points = context.points.filter((p) => Date.now() - p.t < 500);
		let d, v;
		if (context.points.length === 0) {
			v = 0;
		} else {
			d = Math.sqrt(
				(point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2,
			);
			v = d / (Date.now() - context.points[0].t);
		}
		if (v > 1.5) {
			context.isFlick = true;
			this.dispatcher.dispatch("flick", {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY,
				isVertical: context.isVertical,
				isFlick: context.isFlick,
				velocity: v,
			});
		} else {
			context.isFlick = false;
		}
		if (context.isPan) {
			this.dispatcher.dispatch("panend", {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY,
				isVertical: context.isVertical,
				isFlick: context.isFlick,
			});
		}
	}

	cancel(point, context) {
		clearTimeout(context.handler);
		this.dispatcher.dispatch("cancel", {});
	}
}

export function enableGesture(element) {
	new Listener(element, new Recognizer(new Dispatcher(element)));
}
