// 创建元素
// 三种标签类型： <span> </span> <br/>

const EOF = Symbol('EOF') //EOF: End Of File
let currentToken = {}

function emitToken(token){
    console.log(token)
}

function data(c){
    if(c === '<'){
        return tagOpen
    }else if(c === EOF){
        emitToken({
            type: "EOF"
        })
        return 
    }else {
        emitToken({
            type: 'text',
            content: c
        })
        return data
    }
}

function tagOpen(c){
    if(c === '/'){
        return endTagOpen
    }else if( c.match(/^[a-zA-z]$/)){
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c)
    }else{
        return ;
    }
}

function endTagOpen(c){
    if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c)
    }else if(c === '>'){
        //error
    }else if(c === EOF) {
        //error
    }else{

    }
}

function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName
    }else if(c === '/'){
        return selfClosingStartTag
    }else if(c === '>' ){
        emitToken(currentToken)
        return data
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken.tagName += c
        return tagName
    }else {
        return tagName
    }
}

function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName
    }else if(c == '>'){
        return data;
    }else if(c == '='){
        return beforeAttributeName
    }else{
        return beforeAttributeName
    }
}


function selfClosingStartTag(c){
    if(c == '>'){
        currentToken.isSelfClosing = true
        return data
    }else if(c == EOF){

    }else{

    }
}


module.exports.parseHTML = function parseHTML(html){
    console.log(html)
    let state = data
    for(let c of html ){
        state = state(c);
    }

    state = state(EOF)
} 