

# 基于React实现虚拟列表

`startIndex`, `listSize`, `debounceAfter`, `pointer-events: none`,`event capture`,`passive event`



# 实现class extends关键字

### 实现思路

JS的继承

```javascript
class A {
	constructor() {
    this.foo = 'foo';
  }
  bar = 'bar'
	static haha() {
    return 'haha'
  }
	get mua() {
    return 'mua'
  }
	set myTest(val) {
    this.foo = val
  }  
}
A.prototype.a = 'a';
class B extends A {
	constructor(props) {
    super(props);
    this.name = 'b';
  }
}
B.prototype.b = 'b';
var b = new B();
console.log(b);
```

\_\_proto\_\_指向构造函数的原型对象，构造函数基于原型生成对象
把B的构造函数的原型对象也就是b的原型 的原型 指向 A的原型

##### 实现function继承class

> new 是运算符 
>
> extends 是关键字
>
> new A，构造函数如果没有返回数据，则会返回实例对象，如果有则直接返回对象
>
> Reflect.construct() defineProperty能够复制
>
> 修改constructor

```javascript
class A {
	constructor() {
    // 实例属性
    this.foo = 'foo';
  }
  // 私有字段声明 只能在类内部读取
  #height = 0;
  // 成员变量
  bar = 'bar'
  // 静态方法
	static haha() {
    return 'haha'
  }
  // getter
	get mua() {
    return 'mua'
  }
  // setter
	set myTest(val) {
    this.foo = val
  }
	// 成员方法
	test() {
    return 'test';
  }
}
// 原型
A.prototype.a = 'a';


function B(...args) {
	const self = Reflect.construct(A, args, B);
  // 调用构造函数 将this指向实例
  self.name = 'b';
  return self;
}
B.prototype.b = 'b';
Reflect.setPrototypeOf(B.prototype, A.prototype);


var b = new B();
console.log('b', b);
```



改变原型链的方法：

1. obj.\_\_proto\_\_ = {}
2. Object.setPrototypeOf(obj, prototype)
3. Object.create
4. new





**`new` 运算符**创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。**`new`** 关键字会进行如下的操作：

1. 创建一个空的简单JavaScript对象（即`**{}**`）；
2. 链接该对象（即设置该对象的构造函数）到另一个对象 ；
3. 将步骤1新创建的对象作为`**this**`的上下文 ；
4. 如果该函数没有返回对象，则返回`**this**`。



**函数声明**和**类声明**之间的一个重要区别是函数声明会[提升](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)，类声明不会

**类不会发生自动包装**



公有字段声明



Symbol.species



#### proxy/reflect

meta programming：元编程，对编程语言进行编程



# 正则表达式练习

> 状态机、[regexper.com](https://regexper.com/)、**字符和元字符**、pattern、[正则表达式不要背](https://juejin.im/post/5cdcd42551882568651554e6)、[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

## 特殊字符

| 特殊字符   | 正则表达式 | 记忆方式                                     |
| ---------- | ---------- | -------------------------------------------- |
| 换行符     | \n         | **n**ew line                                 |
| 换页符     | \f         | **f**orm feed                                |
| 回车符     | \r         | **r**eturn                                   |
| 空白符     | \s         | **s**pace                                    |
| 制表符     | \t         | **t**ab                                      |
| 垂直制表符 | \v         | **v**ertical tab                             |
| 回退符     | [\b]       | **b**ackspace,之所以使用[]符号是避免和\b重复 |

## 多个字符

| 匹配区间                                      | 正则表达式 | 记忆方式            |
| --------------------------------------------- | ---------- | ------------------- |
| 除了换行符之外的任何字符                      | .          | 句号,除了句子结束符 |
| 单个数字, [0-9]                               | \d         | **d**igit           |
| 除了[0-9]                                     | \D         | **not** **d**igit   |
| 包括下划线在内的单个字符，[A-Za-z0-9_]        | \w         | **w**ord            |
| 非单字字符                                    | \W         | **not** **w**ord    |
| 匹配空白字符,包括空格、制表符、换页符和换行符 | \s         | **s**pace           |
| 匹配非空白字符                                | \S         | **not** **s**pace   |



## 循环

| 匹配规则    | 元字符          | 联想方式                                                     |
| ----------- | --------------- | ------------------------------------------------------------ |
| 0次或1次    | ?               | 且**问**,此事**有**还**无**                                  |
| 0次或无数次 | *               | 宇宙洪荒,**辰宿**列张：宇宙伊始，从无到有，最后星宿布满星空  |
| 1次或无数次 | +               | **一加**, +1                                                 |
| 特定次数    | {x}, {min, max} | 可以想象成一个数轴，从一个点，到一个射线再到线段。min和max分别表示了左闭右闭区间的左界和右界 |



## 边界

| 边界和标志 | 正则表达式 | 记忆方式                              |
| ---------- | ---------- | ------------------------------------- |
| 单词边界   | \b         | **b**oundary                          |
| 非单词边界 | \B         | **not** **b**oundary                  |
| 字符串开头 | ^          | 小**头尖尖**那么大个                  |
| 字符串结尾 | $          | **终结**者，美国科幻电影，美元符$     |
| 多行模式   | m标志      | **m**ultiple of lines                 |
| 忽略大小写 | i标志      | **i**gnore case, case-**i**nsensitive |
| 全局模式   | g标志      | **g**lobal                            |



## 分组、回溯引用和逻辑处理

> 前向查找和后向查找区别在于匹配的是前缀还是后缀，匹配的是前缀就是前向，匹配后缀就是后向。负就是把=替换成!，代表过滤
>
> **前向匹配在前条件在后，后向条件在前匹配在后**
>
> 后向查找es2018后才支持
>
> 捕获但不匹配

| 回溯查找   | 正则                    | 记忆方式                                                     |
| ---------- | ----------------------- | ------------------------------------------------------------ |
| 引用       | \0,\1,\2 和 \$0, \$1, $2 | 转义+数字                                                    |
| 非捕获组   | (?:)                    | 引用表达式(()), 本身不被消费(?),引用(:)                      |
| 前向查找   | (?=)                    | 引用子表达式(())，本身不被消费(?), 正向的查找(=)             |
| 前向负查找 | (?!)                    | 引用子表达式(())，本身不被消费(?), 负向的查找(!)             |
| 后向查找   | (?<=)                   | 引用子表达式(())，本身不被消费(?), 后向的(<，开口往后)，正的查找(=) |
| 后向负查找 | (?<!)                   | 引用子表达式(())，本身不被消费(?), 后向的(<，开口往后)，负的查找(!) |



## 逻辑处理

三种逻辑关系，与或非

| 逻辑关系 | 正则元字符  |
| -------- | ----------- |
| 与       | 无          |
| 非       | [^regex]和! |
| 或       | \|          |



# 缺省时贪婪模式

匹配尽可能多的字符

**量词**：表示匹配的字符或表达式的数量

如果`?`**紧跟在任何量词 \*、 +、? 或 {} 的后面**，将会使量词变为**非贪婪**（匹配尽量少的字符）

> 例如，对 "123abc" 使用 `/\d+/` 将会匹配 "123"，而使用 `/\d+?/` 则只会匹配到 "1"



# 练习

使用正则实现千分位替换`1234`替换为`1,234`（不要百度，尝试通过推理演绎得到答案）

















# 答案

```javascript
function parseNum(val) {
  const reverse = str => str.split('').reverse().join('')
	return reverse(reverse(val).replace(/(\d{3})(?=\d)/g, '$1,'));
}
parseNum('798787979')
parseNum('8798787979')

```

