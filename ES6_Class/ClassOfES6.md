# ES6 class 的理解

传统的写法是通过构造函数的方法，定义并生成一个对象。下面举例

```js
//定以一个函数,首字母约定俗成是大写
function Person(name, age) {
    this.name = name;
    this.age = age;
}
//构造函数基本都是定义在构造函数的原型上
Person.prototype.toString = function () {
    return "(" + this.name + "," + this.age + ")";
};
// 然后new一个对象
var person = new Person("heqi", 24); // Person {name: "heqi", age: 24}
```

然而 javaScript 的面向对象的写法跟传统面向对象语言(java,C++)区别很大，于是 ES6 推出了 class 的面向对象的写法，由于要兼容过去老得构造函数的方法，所以 ES6class 的写法其实是一终语法糖，只是让对象原型的写法更加清晰，更像面向对象的语言而已。下面的例子就是对上面构造函数的改写

```js
//先定义一个类
class Person {
    constructor(mame, age) {
        this.name = name;
        this.age = age;
    }

    //定义的实例方法,下面的this指向的是这个实例
    toString() {
        return "(" + this.name + "," + this.age + ")";
    }
}

// 然后new一个对象
var person = new Person("heqi", 24); // Person {name: "heqi", age: 24}
```

**_需要注意的是方法前不需要加 function,方法之间也不需要用“，”隔开，否则会报错_**

```js
class Person {}
typeof Person; // function
Person === Person.prototype.constructor; // true
```

**上面的代码表明，类的数据类型就是函数，类本身指向的就是构造函数，class 就是 function 的另一种写法，本质还是 function，使用也是同样 new 出来，跟构造函数用法一样**

```js
class Foo {
    toString() {
        return "heqi";
    }
}
var foo = new Foo();
foo.toString(); // heqi
```
