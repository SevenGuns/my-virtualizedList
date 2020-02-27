

# 基于React实现虚拟列表





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



