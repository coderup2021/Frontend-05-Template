/**
 *  添加暂停和重新开始功能
 */

//使用Symbol防止外部访问变量
const TICK = Symbol("tick"); //每帧执行的动作
const TICK_HANDLER = Symbol("tick-handler"); //请求动画帧的句柄
const ANIMATIONS = Symbol("animations"); //动画
const START_TIME = Symbol("start-time"); //每个动画的开始时间
const PAUSE_START = Symbol("pause-start"); //暂停开始时间
const PAUSE_TIME = Symbol("pause-time"); //累计暂停的时间总和

class Timeline {
	constructor() {
		this[ANIMATIONS] = new Set();
		this[START_TIME] = new Map();
	}

	start() {
		let startTime = Date.now();
		this[PAUSE_TIME] = 0;
		this[TICK] = () => {
			let now = Date.now();
			for (const animation of this[ANIMATIONS]) {
				let t;
				if (this[START_TIME].get(animation) < startTime) {
					/*
					 * 1.时间线开始时间和添加aninmation的时间不一致，需要now-startTime统一这两个时间
					 * 2.暂停的时间会导致时间线的时间和动画的时间不一致，需要-this[PAUSE_TIME]统一这两个时间
					 * */
					t = now - startTime - this[PAUSE_TIME];
				} else {
					t = now - this[START_TIME].get(animation) - this[PAUSE_TIME];
				}
				if (animation.duration < t) {
					this[ANIMATIONS].delete(animation);
					t = animation.duration; //修复时间超出范围的问题
				}
				animation.receive(t);
			}
			this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
		};
		this[TICK]();
	}

	set rate(val) {
		this.rate = val;
	}

	get rate() {
		return this.rate;
	}

	pause() {
		this[PAUSE_START] = Date.now(); //记录暂停开始时间
		cancelAnimationFrame(this[TICK_HANDLER]);
	}

	resume() {
		this[PAUSE_TIME] += Date.now() - this[PAUSE_START]; //暂停重新开始时 累加暂停的时间
		console.log(this[PAUSE_TIME]);
		this[TICK]();
	}

	reset() {}

	add(animation, startTime) {
		if (arguments.length < 2) {
			startTime = Date.now();
		}
		this[ANIMATIONS].add(animation);
		this[START_TIME].set(animation, startTime);
	}
}

class Animation {
	constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
		this.object = object;
		this.property = property;
		this.startValue = startValue;
		this.endValue = endValue;
		this.duration = duration;
		this.timingFunction = timingFunction;
		this.delay = delay;
		this.template = template;
	}
	receive(time) {
		let range = this.endValue - this.startValue;
		let stepDiff = (range * time) / this.duration;
		this.object[this.property] = this.template(this.startValue + stepDiff);
	}
}

export { Timeline, Animation };
