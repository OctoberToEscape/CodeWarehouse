# 对象的常用方法总结

## ES5：

### 1.`Object.keys()`

在实际开发中，我们有时候需要知道对象的所有属性，于是 ES5 引入了`Object.keys()`的方法，成员是参数对象的自身(**不含继承的**)所有可遍历属性的键名 **后面 ES8 有类似的方法`Object.values()`,`Object.entries()`**。

#### a.传入对象，返回键名

```js
var object = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
};

console.log(Object.keys(object)); //["a","b","c","d"]

Object.keys(object).map((key, item) => {
    console.log(key, object[key]);
    //key=>属性名  object[key]=>属性值
});
```

#### b.传入字符串，返回索引

```js
var string = "abcdefg";
console.log(Object.keys(string)); // [0,1,2,3,4,5,6]
```

#### c.传入数组，返回索引

```js
var array = ["a", "b", "c"];
console.log(Object.keys(array)); // ["0","1","2"]
```

#### d.传入构造函数，返回空数组或者属性名

```js
const Person = (name, age, gender) => {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.toString = function () {
        return this.name + "," + this.age + "," + this.gender;
    };
};

console.log(Object.keys(Person)); // []

var people = new Person("heqi", 24, "men");

console.log(Object.keys(people)); // ["name","age","gender","toString"]
```

### 2.`Object.getOwnPropertyDescriptor(obj,prop)`

`Object.getOwnPropertyDescriptor(obj,prop)`返回一个指定对象上的自有属性对应的属性描述 （自由属性指，直接赋值的属性，不需要从原型上查找的属性)。**obj=>需要查找的目标对象 prop=>目标对象内的属性名称** **_`注意事项：ES5 第一个参数不是对象，就会产生 TypeError, ES2015(ES6) 第一个参数不是对象的话，就会被强制转换成对象`_**

```js
var object = {
    a: 1,
    b: 2,
    get bar() {
        return "heqi";
    },
};
console.log(Object.getOwnPropertyDescriptor(object, "bar"));

//打印结果如下图所示;
```

![img4.png](https://i.loli.net/2020/07/14/lDq4GXAYj7Fu3RV.png)

### 3.`Object.defineProperty( obj, prop, decriptor)`

`Object.defineProperty( obj, prop, decriptor)`方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。如果不指定 configurable, writable, enumerable ，则这些属性默认值为 false，如果不指定 value, get, set，则这些属性默认值为 undefined。**obj=>要在其上定义属性的对象,prop=>要定义或修改的属性名称,decriptor=>将被定义或修改的属性描述符**

```js
var obj = {};
Object.defineProperty(obj, "name", {
    configurable: true,
    writable: true,
    enumerable: true,
    value: "heqi",
});
console.log(obj.name); // heqi
```

### 4.`Object.defineProperties(obj,prop)`

`Object.defineProperties(obj,prop)`方法直接在一个对象上定义一个或多个新的属性或修改现有属性，并返回该对象。**obj=>将要被添加属性或修改属性的对象,prop=>该对象的一个或多个键值对定义了将要为对象添加或修改的属性的具体配置**

```js
var object = {
    name: {
        configurable: true,
        writable: true,
        enumerable: true,
        value: "heqi",
    },
    age: {
        value: 24,
        configurable: true,
    },
};

console.log(object.name, object.age); // heqi , 24
```

---

## ES6：

### 1.`Object.create(prototype,[propertiesObject])`

使用已存在的指定原型对象及其属性去创建一个新的对象

```js
//属性:
Object.prototype.value; //设置属性的值
Object.prototype.writable; //是否可修改属性的值；默认为false
Object.prototype.enumerable; //是否可枚举属性；默认为false
Object.prototype.configurable; //是否可修改属性的特性；默认为false

var parent = {
    a: 1,
    b: 2,
};

var son = Object.create(parent, {
    c: {
        // c会成为创建对象的属性
        writable: true,
        configurable: true,
        value: 3,
    },
});

console.log(son); // {c : 3}
console.log(parent.__proto__); // {a : 1 , b : 2}
```

### 2.`Object.is()`

在 javascript 中，你想通过判断两个值知否相等的时候通常使用 == 或者 === 来进行判断。多数情况下因为==会隐式转换，所以严格情况下多数使用恒等===来进行判断。但是===也不是没有缺陷的，例如他会认为+0 和-0 是相等的，NaN === NaN 他会告诉 false，所以判断 NaN 必须使用 `isNaN()`来判断 NaN。

```js
console.log(+0 == -0); // true
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

console.log(5 == 5); // true
console.log(5 == "5"); // true
console.log(5 === 5); // true
console.log(5 === "5"); // false
console.log(Object.is(5, 5)); // true
console.log(Object.is(5, "5")); // false
```

### 3.`Object.assign()`

使用`Object.assign()`主要是为了简化对象的混入(minin)。`Object.assign()`可以吧一个对象的属性和访问完整的拷贝到另一个对象中。 **后面 ES8 会有新方法完善此方法的不足，方法名是`Object.getOwnPropertyDescriptors()`**

```js
var object = {
    name: "heqi",
    age: 24,
    friends: ["张三", "李四"],
};

var newObject = {};

Object.assign(object, newObject); //则newObject中就有了与object相同的属性和方法.  newObject是接受者，object是提供者

//这种copy是浅copy，也就是说如果属性值是对象的话，只是copy的对象的地址值(引用）

console.log(newObject.friends == object.friends); //true   newObject和object的friends同事指向了同一个数组。

object.friends.push("王五");

console.log(newObject.friends); //['张三', '李四', '王五']
```

### 4.`Object.setPrototypeOf()`

通常`Object.setPrototypeOf(obj,newObj)`用来设置一个对象的原型对象，返回参数对象的本身,obj=>参数对象,newObj=>新的原型对象，**如果第一个参数不是对象,会自动转为对象,undefined 和 null 报错**。

```js
var object = { a: 10 };
Object.setPrototypeOf(object, { b: 20 });
console.log(object.b); // 20
console.log(object); // {a : 10}
```

---

## ES8:

### 1.`Object.values()`

ES5 引入了 `Object.keys()` 方法,返回一个数组,成员是参数对象自身的（**不含继承**）所有可遍历属性的键名。ES8 引入了跟 `Object.keys()` 配套的 `Object.values()`,`Object.entries()` 作为遍历一个对象的补充手段，供 `for...of` 循环使用。需要注意的是**如果键名是数值属性的话，是按照数值的大小，从小到大遍历的，因此例 2 返回数组为["b","c","a"]**

```js
var object = {
    a: 1,
    b: 2,
};
Object.values(object); //[1,2]

var object = {
    90: "a",
    20: "b",
    50: "c",
};
Object.values(object); //["b","c","a"]
```

### 2.`Object.entries()`

`Object.entries()`方法返回一个数组，成员是参数对象自身的（**不含继承的**）所有可遍历属性的键值对数组。这个特性我们后面介绍 ES10 的 `Object.fromEntries()`还会再提到。需要注意的是**如果键名是数值属性的话，是按照数值的大小，从小到大遍历的，因此例 2 返回数组为[["20","b"],["50","c"],["90","a"]]**

```js
var object = {
    a: 1,
    b: 2,
};
Object.entries(object); // [["a",1],["b",2]]

var object = {
    90: "a",
    20: "b",
    50: "c",
};
Object.entries(object); // [["20","b"],["50","c"],["90","a"]]
```

### 3.`Object.getOwnPropertyDescriptors()`

ES5 的 `Object.getOwnPropertyDescriptor()`方法会返回某个对象属性的描述对象。ES8 引入了 `Object.getOwnPropertyDescriptors()`方法，返回指定对象所有自身属性（**非继承属**性）的描述对象。

```js
var object = {
    name: "heqi",
    get age() {
        return 24;
    },
};
console.log(Object.getOwnPropertyDescriptors(object));

//得到的结果如下图;
```

![img1.png](https://i.loli.net/2020/07/14/d4ac5l9rhzULZ1V.png)

**该方法的引入主要是为了解决 `Object.assign()`无法正确拷贝 get 属性和 set 属性的问题,我们来举个例子**

```js
var target = {};
var object = {
    set foo(val) {
        console.log(val);
    },
    get bar() {
        return "heqi";
    },
};
Object.assign(target, object);
console.log(Object.getOwnPropertyDescriptor(target, "foo"));

//得到的结果如下图;
```

![img2.png](https://i.loli.net/2020/07/14/21PUFehdpZOcoRQ.png)

**上面代码中，object 对象的 foo 属性的值是一个赋值函数，`Object.assign` 方法将这个属性拷贝给 target 对象，结果该属性的值变成了 undefined。这是因为 `Object.assign` 方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。** **_这个时候`Object.getOwnPropertyDescriptors()`方法配合`Object.defineProperties()`方法，就可以实现正确拷贝_**。

```js
var target = {};
var object = {
    set foo(val) {
        console.log(val);
    },
    get bar() {
        return "heqi";
    },
};
Object.defineProperties(target, Object.getOwnPropertyDescriptors(object));
console.log(Object.getOwnPropertyDescriptor(target, "foo"));

//得到结果如下图;
```

![img3.png](https://i.loli.net/2020/07/14/IQboMN1WTnRv5tg.png)

---

## ES10:

### 1.`Object.fromEntries()`

`Object.fromEntries` 这个新的 API 实现了与 `Object.entries` 相反的操作。这使得根据对象的 entries 很容易得到 object。

```js
var object = {
    a: 1,
    b: 2,
};

const arr = Object.entries(object); // [["a","1"],["b","2"]]

const obj = Object.fromEntries(arr); // {a:1,b:2}
```
