/**
 * 修复时间线的开始时间和 动画开始时间的差异
 */

//使用Symbol防止外部访问变量
const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("start-time");

class Timeline {
	constructor() {
		this[ANIMATIONS] = new Set();
		this[START_TIME] = new Map();
	}

	start() {
		let startTime = Date.now();
		this[TICK] = () => {
			let now = Date.now();
			for (const animation of this[ANIMATIONS]) {
				let t;
				if (this[START_TIME].get(animation) < startTime) {
					t = now - startTime; // 修复时间线开始时间和动画和动画开始时间的差异
				} else {
					t = now - this[START_TIME].get(animation); // 修复时间线开始时间和动画和动画开始时间的差异
				}

				if (animation.duration < t) {
					this[ANIMATIONS].delete(animation);
					t = animation.duration;
				}
				animation.receive(t);
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

	add(animation, startTime) {
		if (arguments.length < 2) {
			startTime = Date.now();
		}
		this[ANIMATIONS].add(animation);
		this[START_TIME].set(animation, startTime); //设置动画开始时间
	}
}

class Animation {
	constructor(object, property, startValue, endValue, duration, delay, timingFunction) {
		this.object = object;
		this.property = property;
		this.startValue = startValue;
		this.endValue = endValue;
		this.duration = duration;
		this.timingFunction = timingFunction;
		this.delay = delay;
	}
	receive(time) {
		let range = this.endValue - this.startValue;
		let stepDiff = (range * time) / this.duration;
		this.object[this.property] = this.startValue + stepDiff;
	}
}

export { Timeline, Animation };
