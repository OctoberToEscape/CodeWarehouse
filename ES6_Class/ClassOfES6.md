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

---

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

---

## 不存在变量提升

class 类不存在变量提升，**类必须先定义，再使用**

```js
//如果先使用，再定义会报错，如下图
new Foo();
class Foo {}
```

![img4.png](https://i.loli.net/2020/07/24/PLJg5ACoVSdrOcR.png)

ES6 不会把类的声明提升到代码的头部。规定是下面介绍到的继承有关，继承子类必须在父类后面

```js
class Father {}
class Son extends Father {}
//son是继承了father
```

---

## class 的表达式

与函数一样，class 也可以用表达式形式定义

```js
const myFoo = class Foo {
    getClassName() {
        return Foo.name;
    }
};

let func = new myFoo();
func.getClassName(); // Foo
Foo.name; // Foo is not defined
```

上面的代码是用表达式定义了一个类。这个时候需要注意的是，此时的**类名是 `myFoo` 而不是 `Foo`**,`Foo`只能在 Class 代码的内部使用，指代当前类。所以 new 的时候要`new myFoo()`,而直接用 Foo 的话会报错。因为使用到了 Foo 所以是上面写法，如果用不到，则可以是下面的写法。

```js
const myFoo = class {
    // ....
};
```

如下，也可以写一个立即执行的 class

```js
//person就是一个立即执行的类的实例
const person = new (class {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        return this.name;
    }
})("heqi");

console.log(person.sayName()); // "heqi"
```

---

## 私有属性|方法

私有方法是常见需求，但 ES6 不提供，只能通过变通方法模拟实现。

-   第一种，在命名上加以区分(约定俗成)

```js
class Foo {
    foo(baz) {
        return this._bar(baz);
    }

    //私有
    _bar(baz) {
        this.name = "is" + baz;
        return this.name;
    }
}

var o = new Foo();
console.log(o.foo("heqi")); // "isheqi"   调用了foo(),但是foo内部又调用了私有方法_bar()

console.log(o._bar("JavaScript")); // "isJavaScript" 外部仍然可以调用

//代码中,_bar(),在方法名前加了下划线,表示这是仅限内部使用的私有方法,但是这种方法不保险,在类的外部仍然可以调用此方法。
```

-   第二种 闭包，在 constructor 作用域内定义局部变量，内部载通过闭包的方式对外暴露该变量。

```js
class Foo {
    constructor(name, age, number) {
        this.name = name;
        this.age = age;
        let _number = number; //定义私有属性
        this.getNumber = () => {
            return _number;
        };
    }
    toString() {
        return _number;
    }
}
var o = new Foo("heqi", 24, 18888888888);
console.log(o); // Foo {name: "heqi", age: 24, getNumber: ƒ}
console.log(o._number); // undefined
console.log(o.getNumber()); // 18888888888

console.log(o.toString()); // _number is not defined
//这种方式，虽然实现了私有属性外部不可访问，但在类内部，该属性同样没法在不同的方法内共享，仍然不是严格意义上的“私有属性”。
```

-   第三种 利用`WeakMap` Father 实例化之后 this 指向实例。此时以 this 为键可实现一个实例储存一份变量

```js
const privateData = new WeakMap();

//父类
class Father {
    constructor(name) {
        this.name = name;
        privateData.set(this, { age: 24 }); // 设置私有属性
    }

    getInfo() {
        const info = {
            name: this.name,
            age: privateData.get(this).age, //获取私有属性 并非 this.age
        };
        return info;
    }
}

var father = new Father("heqi");
console.log(father.name); // "heqi"
console.log(father.age); // undefined
console.log(father.getInfo()); // {name: "heqi", age: 24}

// 子类继承
class Son extends Father {
    constructor(name) {
        super(name);
    }
}
var son = new Son("javascript");
console.log(son.name); // "javascript"
console.log(son.getInfo()); // {name: "javascript", age: 24}
```

上面代码中 父类 Father 利用`WeakMap()`设置了 age 为私有属性，所以后面直接 this.age 是获取不到值的，必须通过 getInfo()的方法利用**privateData.get(this).age**的方法才能拿到。但是如果出现了一个继承 Father 的子类，其实通过调用父类的方法也能拿到 age。**_所以 WeakMap() 实现的私有属性并没有实现不可继承的特点_**

-   第四种利用 `Symbol` 值的唯一性，将私有方法的名字命名为一个 `Symbol` 值，Symbol 变量可以作为对象 key 的特点，我们可以模拟实现更真实的私有属性。

```js
const _age = Symbol("age");
const _name = Symbol("name");
const _gender = Symbol("gender");
//设置了私有属性的类
class Foo {
    constructor(age, name, gender) {
        this[_age] = age;
        this[_name] = name;
        this[_gender] = gender;
    }
}
var foo = new Foo(24, "heqi", "men");
console.log(foo); //Foo {Symbol(age): 24, Symbol(name): "heqi", Symbol(gender): "men"}
console.log(Object.keys(foo)); //[]
console.log(Object.getOwnPropertyNames(foo)); //[]
console.log(Object.getOwnPropertySymbols(foo)); //想查看Symbol设置的私有属性通过Object.getOwnPropertySymbols()方法查看   [Symbol(age), Symbol(name), Symbol(gender)]

//常规不设置
class Foo {
    constructor(age, name, gender) {
        this.age = age;
        this.name = name;
        this.gender = gender;
    }
}
var foo = new Foo(24, "heqi", "men");
console.log(foo); //Foo {age: 24, name: "heqi", gender: "men"}
console.log(Object.keys(foo)); //["age", "name", "gender"]
console.log(Object.getOwnPropertyNames(foo)); //["age", "name", "gender"]
```

上面代码，由于 `Symbol` 可作为属性名并且不能被 `for..in..`、`Object.key()`、`Object.getOwnPropertyNames` 遍历。所以 `Symbol` 可以实现私有属性。

-   第五种利用 # 号来实现(官方文档给出的办法)

```js
class Person {
    //私有属性
    #name;
    #age;
    #gender;
    constructor(name, age, gender) {
        this.#name = name;
        this.#age = age;
        this.#gender = gender;
    }

    //私有方法
    #userInfo() {
        return (
            "大家好，我叫" +
            this.#name +
            ",我今年" +
            this.#age +
            "，我是一个" +
            this.#gender
        );
    }

    //实例方法
    getUserInfo() {
        return this.#userInfo();
    }
}

var person = new Person("heqi", 24, "男人");
console.log(person); // Person {#userInfo: ƒ, #name: "heqi", #age: 24, #gender: "男人"}
console.log(person.#name); // 见下图1
console.log(person.#userInfo()); // 见下图2
console.log(person.getUserInfo()); // 大家好，我叫heqi,我今年24，我是一个男人
console.log(Object.keys(person)); // []
console.log(Object.getOwnPropertyNames(person)); // []
```

-   图 1
    ![img6.jpg](https://i.loli.net/2020/07/27/TU7XrpPBfnuvi3h.jpg)
-   图 2
    ![img5.jpg](https://i.loli.net/2020/07/27/mbpuMzhngUCit3A.jpg)

---

## class 的 this 指向问题

类的内部如果含有 **this**,他默认指向的是这个实例。不过有些情况会导致 this 报错问题

```js
//例子
class Foo {
    getName(name) {
        this.setName(`你好${name}`);
    }

    setName(name) {
        console.log(name);
    }
}

var foo = new Foo();
foo.getName("heqi"); // 你好heqi

/* 解构单独拿出方法使用时 */
var { getName } = foo;
getName(); // 会报错，见下图
```

`getName`方法中的 this，默认指向得是 Foo 这个实例，如果解构单独拿出来使用，this 就会指向当前的环境，因而找不到 `setName` 方法而报错。

![img7.jpg](https://i.loli.net/2020/07/28/yg1DBwrm2NoCIia.jpg)

-   解决方案 1,在构造方法中就绑定 this

```js
class Foo {
    constructor() {
        this.getName = this.getName.bind(this);
    }
    getName(name) {
        this.setName(`你好${name}`);
    }
    setName(name) {
        console.log(name);
    }
}
var foo = new Foo();
var { getName } = foo;
getName("heqi"); // 你好heqi
```

-   解决方案 2,使用 ES6 的箭头函数

```js
class Foo {
    constructor() {
        this.getName = (name) => {
            this.setName(`你好${name}`);
        };
    }
    setName(name) {
        console.log(name);
    }
}
var foo = new Foo();
var { getName } = foo;
getName("javaScript"); // 你好javaScript
```

-   解决方案 3,使用`Proxy`,获取方法的时候自动绑定。

```js
//设置proxy方法
const classProxy = (target) => {
    const m = new WeakMap();
    // 读取拦截配置, 只需要配置 get
    const handler = {
        get(target, key) {
            const val = Reflect.get(target, key);
            // 要获取的是函数执行, 如果不是函数就直接返回 val
            if (typeof val !== "function") return val;
            if (!m.has(val)) m.set(val, val.bind(target));
            return m.get(val);
        },
    };
    const proxy = new Proxy(target, handler);
    return proxy;
};

class Foo {
    getName(name) {
        this.setName(`你好${name}`);
    }

    setName(name) {
        console.log(name);
    }
}

const foo = new Foo();
const { getName } = classProxy(foo);
getName("heqi"); // 你好heqi
```

---

## Class 的继承

class 的继承通过`extends`关键字实现继承

```js
class Father {}
//Son 继承了 Father
class Son extends Father {}
```

上面代码定义了一个 `Son` 类，该类通过 `extends` 关键字，继承了 `Father` 类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个 `Father` 类。下面，我们在 `Son` 内部加上代码。

```js
class Father {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    toString() {
        return "你调用了父亲的方法";
    }
}
//Son 继承了 Father
class Son extends Father {
    constructor(name, age, gender) {
        super(name, age); // 调用父类的constructor(name,age)
        this.gender = gender;
    }

    toString() {
        return this.name + "," + this.age + "," + super.toString(); //调用父类toString()
    }
}

var father = new Father("heqi", 24); //Father {name: "heqi", age: 24}
var son = new Son("范冰冰", 40, "女"); //Son {name: "范冰冰", age: 50, gender: "女"}
son.toString(); //范冰冰,50,你调用了父亲的方法
```

**子类必须在 `constructor` 方法中调用 `super` 方法，否则新建实例时会报错。这是因为子类没有自己的 this 对象，而是继承父类的 this 对象。**

```js
class Father {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class Son extends Father {
    constructor() {}
}

var son = new Son(); // 报错见下图
```

![img8.png](https://i.loli.net/2020/08/10/O8HgdpbtAh7YJQR.png)

**另一个需要注意的地方是，在子类的构造函数中，只有调用 super 之后，才可以使用 this 关键字，否则会报错**

```js
class Father {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class Son extends Father {
    constructor(name, age, gender) {
        this.gender = gender; // error
        super(name, age, gender);
        this.gender = gender; // 正确
    }
}
```

如果子类没有定义 `constructor` 方法，这个方法会被**默认添加**，代码如下。也就是说，不管有没有显式定义，任何一个子类都有 `constructor` 方法。

```js
//父类
class Father {
    constructor() {
        //doing...
    }
}

//子类继承

class Son extends Father {}
//等同于
class Son extends Father {
    constructor() {
        super();
    }
}
```

下面是生成子类实例的代码。

```js
class Father {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class Son extends Father {
    constructor(name, age) {
        super(name, age);
    }
}

var cp = new Son("heqi", 24);

cp instanceof Son; //true
cp instanceof Father; //true
```

**_上面代码实例对象 cp 同时是 Father 和 Son 两个类的实例。_**

---

## 类的 `prototype` 属性和`__proto__`属性

大多数浏览器的 ES5 实现之中，每一个对象都有`__proto__`属性，指向对应的构造函数的`prototype` 属性。Class 作为构造函数的语法糖，同时有 `prototype` 属性和`__proto__`属性，因此同时存在两条继承链。

```js
class Father {}
class Son extends Father {}

/* 子类的__proto__属性，表示构造函数的继承，总是指向父类。 */
Son.__proto__ === Father; // true

/* 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。 */
Son.prototype.__proto__ === Father.prototype; //true
```

---

## Extends 的继承目标

`extends`关键字后面可以跟多种类型的值。

> 1.常规

```js
class Father {}
class Son extends Father {}
```

上面代码的 Father，只要是一个有 `prototype` 属性的函数，就能被 Son 继承。由于函数都有 `prototype` 属性（除了 `Function.prototype` 函数），因此 Son 可以是任意函数。

> 2.特殊

-   a).子类继承 Object 类。

    ```js
    /* 这种情况下，Son其实就是构造函数Object的复制，Son的实例就是Object的实例。 */
    class Son extends Object {}
    Son.__proto__ === Object; //true
    Son.prototype.__proto__ === Object.prototype; //true
    ```

-   b).不存在任何继承。

    ```js
    /* 这种情况下，Son作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Funciton.prototype。但是，Son调用后返回一个空对象（即Object实例），所以Son.prototype.__proto__指向构造函数Object的prototype属性。 */
    class Son {}
    Son.__proto__ === Function.prototype; //true
    Son.prototype.__proto__ === Object.prototype; //true
    ```

-   c).子类继承 null。

    ```js
    /* 这种情况与第二种情况非常像。Son也是一个普通函数，所以直接继承Funciton.prototype。但是，Son调用后返回的对象不继承任何方法。 */
    class Son extends null {}
    Son.__proto__ === Function.prototype; //true
    Son.prototype.__proto__ === undefined; //true
    ```

---

## Object.getPrototypeOf()

`Object.getPrototypeOf` 方法可以用来从子类上获取父类。

```js
class Father {}
class Son extends Father {}
Object.getPrototypeOf(Son); // class Father {}
Object.getPrototypeOf(Son) === Father; // true
```

因此，可以使用这个方法判断，一个类是否继承了另一个类。

---

## super 关键字

super 这个关键字，既可以当作函数使用，也可以当作对象使用。

-   super 作为函数调用时

    ```js
    class Father {}

    class Son extends Father {
        constructor() {
            super();
        }
    }
    ```

    上面代码中，子类 Son 的构造函数之中的 super()，代表调用父类的构造函数。这是必须的，否则 JavaScript 引擎会报错。

    虽然 super 代表的是 Father 构造函数，但是返回的是 Son 的实例

    ```js
    class Father {
        constructor() {
            console.log(this);
        }
    }

    class Son extends Father {
        constructor() {
            super();
        }
    }

    var son = new Son(); // this =>  Son {}
    var father = new Father(); // this =>  Father{}
    ```
