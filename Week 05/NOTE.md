## 学习笔记

### Proxy
    Proxy 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）

    与getter和setter的区别： 
    1. proxy对没有的属性也会触发自定义的代理行为
    2. proxy可以重新定义所有的属性操作的代理行为(会导致对象操作的可预测性降低)

### Range

### CSSOM

### 页面元素拖拽的骨架代码
    ```
    var dragable = document.getElementById('container')
    dragable.addEventListener('mousedown', (event)=>{

        const up = ()=>{
            document.removeEventListener('mouseup', up);
            document.removeEventListener('mousemove', move);
        }
        const move = (event)=>{
            console.log(event)
            dragable.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
        }
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', up)
    })
    ```

### 小细节
    ```
    <div id="container">文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 </div>
    <script>
        var container = document.getElementById('container')
        console.log(container.childNodes[0]) // "文字 文字 文字 文字 文字 文字 文字 文字 文字 文字"
        console.log(container.childNodes[0].textContent)  // 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
    </script>
    ```
### 小技巧： 
    1. 在document上监听mousemove事件， 可以让鼠标产生捕捉的效果， 即鼠标移出viewport之外，仍然触发该事件。
        普通元素上监听mousemove事件，则不会有该效果
