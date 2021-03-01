#重学HTML
## HTML的定义：
	html继承了XML和SGML ==> html<XML<SGML
	由于html是SGML的一个子集，所以html有符合SGML定义的DTD
	xhtml是w3c对html做了xml化的尝试, 还有一个xhtml2,但是它过于严苛的规定，导致社区不接受，就没被使用。
	后来html5重新定义了XML和SGML的关系，所以才有了今天的html
### DTD
	* http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
### XML Namespace (还有另外两种namespace: MathML和SVG)
	* http://www.w3.org/1999/xhtml
### DTD中需要记住的一些特殊符号
	* <!ENTITY nbsp       "&#160;">  //不推荐使用，如果需要显示空格，推荐使用css的white-space控制
	* <!ENTITY lambda     "&#955;">
	* <!ENTITY quot       "&#34;">
	* <!ENTITY amp        "&#38;&38;">
	* <!ENTITY lt         "&#38;&60;">
	* <!ENTITY gt         "&#62;">
	* <!ENTITY apos       "&#39;">

## HTML标签语义
* aside 不是最重要的一些内容，比如目录之内的
* main  页面主体，一个html,只能有一个
* article 文章
* hgroup  标题组
* h1
* h2
* p.note 不知道用什么表示，可以用p标签加一个类，类名作为注解
* abbr  缩写
* em 语气上的一种表达句子中强调的词语（句子中的重音词语）
* strong 不改变语义的，这个词很重要
* figure 标签组
* img
* figcaption 标签内容说明
* ol 有序列表
* ul 无序列表
* pre 预先设置好的样式，如果里面需要原样输出html标签则需要转义
* code 表示里面的原样输出的代码

## HTML语法
### 合法元素
* Element: <tagname> ... </tagname>
* Text: text
* Comment: <!-- comments -->
* DocumentType: <Doctype html>
* ProcessingInsturction: <?a 1?> //预处理语法 （目前没啥用）
* CDATA: <![CDATA[]]> 里面是文本节点，不需要考虑转义 （来自xml）

### 字符引用
* &#161    ¡ //Latin字符
* &amp;    &
* &lt;     <
* &quot;   "


## DOM API
* 节点部分 API
* 事件部分 API
* Range API

### 节点部分API
#### 导航类的操作
* parentNode        <=====>     parentElement (其实parentElement和ParentNode是等价的)
* childNodes        <=====>     children
* firstChild        <=====>     firstElementChild
* lastChild         <=====>     lastElementChild
* nextSibling       <=====>     nextElementSibling
* previousSibling   <=====>     previousElementSibling

#### 修改操作
* appendChild
* insertBefore
* removeChild         必须在父元素上操作 删除子节点
* replaceChild        必须在父元素上操作 替换子节点

#### 高级操作
* compareDocumentPosition    用于比较两个节点中前后关系的的函数
* contains                   检查一个节点是否包含另一个节点的函数
* isEqualNode                检查两个节点是否完全相同
* isSameNode                 检查两个节点是否是同一个节点， 实际上在javascript中可以用“===”
* cloneNode                  复制一个节点， 如果传入参数true, 则会连同子元素做深拷贝

## 事件API
```
 target.addEventListener(type, listener [,options])
 target.addEventListener(type, listener [,useCapture])
 参数：
 type: 事件类型
 listener: 监听执行的函数
 useCapture: 是否使用捕获模式，默认否， 使用冒泡模式
 options:{
	capture: 是否使用捕获，
	once: 是否只执行一次，
	passive: ?????????
 }

```
useCapture的例子：
```html
<div id="outer" style="width:100%;height:300px;background:lightblue">
		<div id="inner" style="width:100%;height:200px;background:pink"></div>
</div>
<script>
var outer = document.getElementById("outer")
var inner = document.getElementById("inner")
</script>
//点击inner的打印结果
// inner
// outer

```
以上代码，因为inner在里层，因为默认模式是冒泡，里层先触发，所以先打印inner，后打印outer

```html
<div id="outer" style="width:100%;height:300px;background:lightblue">
		<div id="inner" style="width:100%;height:200px;background:pink"></div>
</div>
<script>
	var outer = document.getElementById("outer")
	var inner = document.getElementById("inner")
	outer.addEventListener("click", () => {
		console.log("outer");
	});
	inner.addEventListener("click", () => {
		console.log("inner");
	});
	outer.addEventListener("click", () => {
		console.log("outer1");
	}, true);
	inner.addEventListener("click", () => {
		console.log("inner1");
	}, true);
</script>
//点击inner的打印结果
// outer1
// inner
// inner1
// outer
```
以上代码先以冒泡模式绑定，再以捕获模式绑定事件，
可以看出先执行捕获模式的事件监听，再执行冒泡模式的事件监听。

如果我们将inner和inner1的代码顺序交换一下，将inner1放在前面，inner放在后面，看看会发生什么
```html
<div id="outer" style="width: 100%; height: 300px; background: lightblue">
	<div id="inner" style="width: 100%; height: 200px; background: pink"></div>
</div>
<script>
	var outer = document.getElementById("outer");
	var inner = document.getElementById("inner");
	outer.addEventListener("click", () => {
		console.log("outer");
	});
	outer.addEventListener(
		"click",
		() => {
			console.log("outer1");
		},
		true,
	);
	inner.addEventListener(
		"click",
		() => {
			console.log("inner1");
		},
		true,
	);
	inner.addEventListener("click", () => {
		console.log("inner");
	});
	//点击inner的打印结果
	// outer1
	// inner1
	// inner
	// outer
</script>
```
可以看出inner1比inner先执行了， 这说明对于最里层的那个元素来说，绑定在它身上的事件执行先后顺序是按照绑定顺序决定了，而不是按照先捕获后冒泡的顺序。

## Range API

### 面试题
* 把一个元素所有的子元素逆序
	* 1   5
	* 2   4
	* 3   3
	* 4   2
	* 5   1
	
* 考点1： Dom的collection 是一个living Collection, 在dom上操作你取出来的childNodes, 取出来的集合会跟着变化。
* 考点2： 元素的子元素在insert的时候，是不需要先从原来的位置挪掉，浏览器会自动先把它remove下来，再重新append挂到树上
* 考点3： 使用Range Api更高效的操作
代码1：
```html
<div id="a">
	<span></span>
	<p></p>
	<a></a>
	<div></div>
</div>
<script>
let element = document.getElementById("a")
function reverseChildren(element){
	const children = Array.prototype.slice.call(element.childNodes)
	//element.childNodes是live collection, 但是slice转为Array后， children就不是live collection了
	for(let child of children){
	 element.removeChild(child)
	}
	children.reverse()
	for(let child of children){
		element.appendChild(child)
	}
}
reverseChildren(element)
</script>
```
代码2：
```html
<div id="a">
	<span></span>
	<p></p>
	<a></a>
	<div></div>
</div>
<script>
let element = document.getElementById("a")
function reverseChildren(element){
	let children = element.childNodes
	let len = children.length

	while(len-- >0){
		element.append(children[len])
	}
}
reverseChildren(element)
</script>
```

### 了解RangeAPI
* var range = new Range()
* range.setStart(element, 9)
* range.setEnd(element, 4)
* var range= document.getSelection().getRangeAt(0)
* range.setStartBefore()
* range.setEndBefore()
* range.setStartAfter()
* range.setEndAfter()
* range.selectNode()
* range.selectNodeContents()

* var fragment = range.extractContents()
* range.insertNode(document.createTextNode("aaa"))
range例子
```html
<div id="a">123<span style="background-color: pink">456789</span>0123456789</div>
<script>
 let range = new Range()
 range.setStart(document.getElementById("a").childNodes[0], 3)
 range.setEnd(document.getElementById("a").childNodes[2], 3)
 range.extractContents()
</script>
```
上面例子中，如果只想留下span标签，span里面的456789全部移除掉，则可以如下操作
```html
<div id="a">123<span style="background-color: pink">456789</span>0123456789</div>
<script>
 let range = new Range()
 range.setStart(document.getElementById("a").childNodes[1], 0)
 range.setEnd(document.getElementById("a").childNodes[2], 3)
 range.extractContents()
</script>
```
上面例子中，如果只想留下span标签和span里面的456，则可以如下操作
```html
<div id="a">123<span style="background-color: pink">456789</span>0123456789</div>
<script>
 let range = new Range()
 range.setStart(document.getElementById("a").childNodes[1].childNoedes[0], 3)
 range.setEnd(document.getElementById("a").childNodes[2], 3)
 range.extractContents()
</script>
```
用range实现上面的面试题：
代码3：
```html
<div id="a">
	<span></span>
	<p></p>
	<a></a>
	<div></div>
</div>
<script>
let element = document.getElementById("a")
function reverseChildren(element){
	let range = new Range()
	fragment = range.selectNodeContents(element)

	let len = fragment.childNodes.length
	while(len-- >0){
		fragment.appendChild(fragment.childNodes[len])
	}
	element.appendChild(fragment)

}
reverseChildren(element)
</script>
```
**总结： 在需要对dom进行高性能操作的时候，可以使用range和fragment这一对api, range负责选中dom，fragment负责微操手术.** 

## CSSOM
### document.styleSheets
#### 案例
我们在html里面写css，有两种写法：
* 1.使用style标签， 直接在style标签里面去写css
* 2.使用link标签, 在href标签里面去写data uri
```html
<style title="hello">
a::before{
	color: red;
	content: "hello"
}
</style>
<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blueP%7D">
<a> world</a>
```
#### Rules api
* document.styleSheets[0].cssRules
* document.styleSheets[0].insertRule("p {color:pink;}",0)
* document.styleSheets[0].removeRule(0)

#### Rules 种类
* CSSStyleRule
	* selectorText String
	* style K-V结构
* CSSCharsetRule
* CSSImportRule
* CSSMediaRule
* CSSFontFaceRule
* CSSPageRule
* CSSNameSpaceRule
* CSSKeyFramesRule
* CSSKeyFrameRule
* CSSKeySupportsRule

通过CSSOM来修改dom样式比起直接修改style有很多好处：
1. 我们可以去批量的修改
2. dom api不能直接访问伪元素， 但是可以通过CSSOM修改样式

上面的例子中可以通过CSSOM修改伪元素的颜色
```html
<style title="hello">
a::before{
	color: red;
	content: "hello"
}
</style>
<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blueP%7D">
<a> world</a>

<script>
document.styleSheets[0].cssRules[0].style.color="lightgreen"
//1. 可以通过cssRules下标访问对应style
//2. 也可以通过循环cssRules判断rule里面的selectorText来判断是否是需要修改的对象
</script>
```

### getComputedStyle  (获取css计算后的css属性)
* window.getComputedStyle(element, pseudoElement)
	* element 想要获取的元素
	* pseudoElement  可选， 伪元素

```html
<style title="hello">
a::before{
	color: red;
	content: "hello"
}
</style>
<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blueP%7D">
<a> world</a>

<script>
getComputedStyle(document.querySelector("a"))
getComputedStyle(document.querySelector("a", "::before"))
</script>
```
**getComputedStyle是一个非常有用的api,它可以取到我们的dom最终真实渲染的时候的css属性值，同时它可以访问到伪元素，这是个非常强大的能力。这里有一个非常好的实践：通过getComputedStyle去获取一些元素真实的比如transform,比如要去做拖拽的这样一些行为的某一个时机的css属性值，都最好用getComputedStyle. 还有一些css动画的中间状态，我们可能想要暂停动画，这个时候没有办法通过dom API的style属性和CSSRule判断当前播到哪了，这个时候也可以使用getCompotedStyle去处理这些问题。

### CSSOM的view部分
#### window
* window.innerHeight, window.innerWidth
* window.outerHeight, window.outerWidth
* window.devicePixelRatio //屏幕上的物理像素和代码里面的逻辑像素的比值, 正常设备下是1:1， Retina屏1:2， 有些安卓机上还可以看到1:3的DPR
* window.screen
	* window.screen.width
	* window.screen.height
	* window.screen.availWidth
	* window.screen.availHeight

#### window API
* window.open("about:blank", "_blank", "width=100;height:100,left=100,right=100")
* moveTo(x,y)
* moveBy(x,y)
* resizeTo(x,y)
* resizeBy(x,y)
```html
<button id="open" onclick="window.w=window.open('about:blank','_blank', 'width=100,height=100,left=100,right=100')">open window</button>
<button onclick="w.resizeBy(30,30)">resize</button>
<button onclick="w.moveBy(30,30)">move</button>
```

#### Scroll
* scrollTop
* scrollLeft
* scrollWidth
* scrollHeight
* scroll(x,y)
* scrollBy(x,y)
* scrollIntoView()

* window
	* scrollX()
	* scrollY()
	* scroll(x,y)
	* scrollBy(x,y)

#### layout
* getClientRects()
* getBoundingClientRect()
以上两个api常用于拖拽效果
```html
<style>
	.x::before {
		content: "额外 额外 额外 额外 额外";
		background-color: pink;
	}
</style>
<div style="width: 100px; height: 400px; overflow: scroll">
	文字 <span class="x" style="background-color: blue"> 文字 文字 文字 文字 文字 文字 文字 </span>
</div>
<script>
	var x = document.getElementsByClassName("x")[0];

	console.log(x.getClientRects()); //获取x元素生成的盒的数量（伪元素也会参与盒的生成）可能有多个
	console.log(x.getBoundingClientRect()); //获取x元素的边界盒的信息(只有一个)
</script>
```

## 所有API
浏览器API来自以下组织：
* khronos
	* WebGL
* ECMA
	* ECMAScript
* WHATWG
	* HTML
* W3C
	* webaudio
	* CG(Community Group)/WG(Working Group)

