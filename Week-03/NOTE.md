## 学习笔记
1. #### 计算机解析执行代码前的准备工作
    1. 根据代码进行分词
    2. 根据分词构建层层相嵌套的语法树的树形结构
    3. 解析代码执行
2. #### 抽象语法树的概念: 
    构建抽象语法树的过程又叫做语法分析, 最著名的语法分析算法有两种
    1. LL算法
    2. LR算法
    L是left缩写, R是right缩写
    LL是从左到右扫描, 从左到右规约的缩写

3. #### 案例: 四则运算
    ##### 词法定义
    1. TokenNumber: 1 2 3 4 5 6 7 8 9 0的组合  (有意义的token)
    2. Operator: + _ * / 之一  (有意义的token)
    3. Whitespace: <SP>  (无意义, 需要被忽略)
    4. LineTerminator: <LF> <CR>  (无意义, 需要被忽略)
    
    ##### 语法定义
    <Express>::=
        <AdditiveExpression><EOF>
    
    <AdditiveExpression>::=
        <MultiplicativeExpress>
        |<AdditiveExpression><+><MultiplicativeExpress>
        |<AdditiveExpression><-><MultiplicativeExpress>
        
    <MultiplicativeExpress>::=
    <Number>
    |<MultiplicativeExpress><*><Number>
    |<MultiplicativeExpress></><Number>
        

4. ### 代码总结:
for循环 判断条件 少写一个 = 号, 导致 bug
```js
var regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g
    var dictionary = ["Number", "Whitespace", "LineTerminator", "*", "/", "+", "-"]

    function* tokenize(source) {
        var result = null
        var lastIndex = 0
        while (true) {
            lastIndex = regexp.lastIndex
            result = regexp.exec(source)
            if (!result) break;
            if (regexp.lastIndex - lastIndex > result[0].length)  //表示 匹配出来的 有不认识的字符
                break;
            let token = {
                type: null,
                value: null,
            }
            /* 
                在写代码时, 此行<= 写成了<, 导致最好一个'-' 号的type 为null , 调试了好一会 才发现
                下次写for循环时, 需要注意这个问题, 到底是< 还是<=, 需要理清逻辑在下手写代码
            */
            for (var i = 1; i <= dictionary.length; i++) {  
                if (result[i]) {
                    token.type = dictionary[i - 1]
                }
            }
            token.value = result[0]
            yield token;  //(回调转同步)
        }
        yield {
            type: 'EOF'
        }
    }

```