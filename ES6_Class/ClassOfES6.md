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

构造函数的`prototype`属性，在 ES6 的类上面继续存在。实际上类的所有方法都定义在构造函数的`prototype`上面。

```js
class Foo {
    constructor() {
        //...
    }
    toString() {
        //...
    }
    toValue() {
        //...
    }
}

console.log(Foo.prototype); //见下图

//等同于
Foo.prototype = {
    toString() {},
    toValue() {},
};
```

![img1.png](https://i.loli.net/2020/07/17/8fhkOvU1QAdCGyM.jpg)

在类的实例上调用方法，其实就是在调用原型上面的方法

```js
class A {}
var b = new A();
b.constructor === A.prototype.constructor; // true
```

上面的代码中 b 是 A 类的实例，b 的 constructor 方法就是 A 类原型的 constructor 方法。

由于类的方法都是定义到 prototype 对象的上面，所以新的方法可以添加到 prototype 上。一般`Object.assign()`可以很方便的添加多个方法。

```js
class Point {
    constructor() {
        // ...
    }
}
//未添加见下图a

//想要给Point类添加方法一般
Object.assign(Point.prototype, {
    //方法名
    toString() {},
    toValue() {},
});
//添加后见下图b
```

-   图 a (原始的 Point)
    ![img2.png](https://i.loli.net/2020/07/19/sHTa9JNc5q8rEZP.jpg)
-   图 b (经过添加方法过后的 Point)
    ![img3.png](https://i.loli.net/2020/07/19/UxD8ZOm3APS6EnV.jpg)

所有，在类的**内部所有定义的方法，都不可以枚举**，这于 ES5 的构造函数不一样

```js
// ES6 Class
class Point {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    toString() {
        // ...
    }
}
Object.keys(Point.prototype); // 枚举为 []
Object.getOwnPropertyNames(Point.prototype); // ["constructor","toString"]

// ES5 构造函数
var Point = function (name, age) {
    this.name = name;
    this.age = age;
};
Point.prototype.toString = function () {
    //...
};
Object.keys(Point.prototype); // 枚举为 ["toString"]
Object.getOwnPropertyNames(Point.prototype); // ["constructor","toString"]
```

类的实例方法名可以用表达式表明

```js
const methodName = "toString";
class Point {
    constructor() {
        //...
    }

    [methodName]() {
        //....
    }
}

//等同于

class Point {
    constructor() {
        //...
    }

    toString() {
        //....
    }
}
```
