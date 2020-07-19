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

## 类的 constructor 方法

constructor 是类的默认的方法，通过 new 生成实例对象的时候，自动调用该方法，**一个类是必须存在 constructor 方法的**，如果没有自己自己定义，则会自动生成一个空的 constructor 方法**_constructor(){}_**

```js
class Point {}
//等同于
class Point {
    constructor() {}
}
```

`constructor`默认返回实例对象(即 this),也完全可以返回一个指定的其他对象。

```js
class Point {
    constructor() {
        return this;
    }
}
var where = new Point();
console.log(where); // Point{} this指向这个实例
new Point() instanceof Point; // true

class Point {
    constructor() {
        return Object.create(
            {},
            {
                a: {
                    value: 1,
                    writable: true,
                    configurable: true,
                },
            }
        );
    }
}
var obj = new Point();
console.log(obj); // {a:1}
new Point() instanceof Point; // false
```

**通过`new Point() instanceof Point`返回说明了，如果`constructor`返回了一个全新的对象，那么返回的实例对象不是该类的实例**

与 ES5 一样，实例的属性 **_除非显式_** 定义在其本身(即定义在 this 上)，否则都定义在原型上(即定义在 class 上)

```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    //实例方法
    toString() {
        return "我的名字是" + this.name + ",我今年" + this.age + "岁了";
    }
}
var person = new Person("heqi", 24);
person.toString(); // 我的名字是heqi,我今年24岁了

person.hasOwnProperty("name"); // true
person.hasOwnProperty("age"); // true
person.hasOwnProperty("toString"); // false
person.__proto__.hasOwnProperty("toString"); // true
```

在上面的代码中`name`和`age`都是实例对象 person 自身的属性(定义在 this 上的属性)，所以`hasOwnProperty`方法返回 true，然而`toString`是原型对象的属性(定义在 Person 类上)，所以`hasOwnProperty`方法返回 false。

与 ES5 一致，类的所有实例共享一个原型对象

```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
var oA = new Person("heqi", 24);
var oB = new Person("java", 100);
oA.__proto__ === oB.__proto__; // true
```

上面代码中 oA，oB 都是 Person 的实例，他们的原型都是 Person.prototype，所以`__proto__`是相等的。这表明可以通过实例的`__proto__`添加方法。

```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
var oA = new Person("heqi", 24);
var oB = new Person("java", 77);
var oC = new Person("php", 88);

oA.__proto__.gender = function () {
    return "men";
};

oA.gender(); // "men"
oB.gender(); // "men"
oC.gender(); // "men"
```

上面代码在 oA 的原型上添加了一个 gender 方法，由于 oA 的原型就是 oB,oC 的原型，因此 oB,oC 也可以调用这个方法。这意味着，使用实例的`__proto__`属性改写原型，必须相当谨慎，不推荐使用，因为这会改变 Class 的原始定义，影响到所有实例。
