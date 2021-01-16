/**
 * 时间线和动画的基础框架
 */

//使用Symbol防止外部访问变量
const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick_handler");
const ANIMATIONS = Symbol("animations");

class Timeline {
	constructor() {
		this[ANIMATIONS] = new Set();
	}

	start() {
		let startTime = Date.now();
		this[TICK] = () => {
			let t = Date.now() - startTime;
			for (const animation of this[ANIMATIONS]) {
				let t0 = t;
				if (animation.duration < t) {
					this[ANIMATIONS].delete(animation);
					t0 = animation.duration; //修复时间超出范围的问题
				}
				animation.receive(t0);
			}
			requestAnimationFrame(this[TICK]);
		};
		this[TICK]();
	}

	set rate(val) {
		this.rate = val;
	}

	get rate() {
		return this.rate;
	}

	pause() {}

	resume() {}

	reset() {}

	add(animation) {
		this[ANIMATIONS].add(animation);
	}
}

class Animation {
	constructor(object, property, startValue, endValue, duration, timingFunction) {
		this.object = object;
		this.property = property;
		this.startValue = startValue;
		this.endValue = endValue;
		this.duration = duration;
		this.timingFunction = timingFunction;
	}
	receive(time) {
		let range = this.endValue - this.startValue;
		let stepDiff = (range * time) / this.duration;
		this.object[this.property] = this.startValue + stepDiff;
	}
}

export { Timeline, Animation };
