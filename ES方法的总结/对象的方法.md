# 对象的常用方法总结

## ES6：

### `1.Object.is()`

在 javascript 中，你想通过判断两个值知否相等的时候通常使用 == 或者 === 来进行判断。多数情况下因为==会隐式转换，所以严格情况下多数使用恒等===来进行判断。但是===也不是没有缺陷的，例如他会认为+0 和-0 是相等的，NaN === NaN 他会告诉 false，所以判断 NAN 必须使用 `isNaN()`来判断 NaN。

```
console.log(+0 == -0);              // true
console.log(+0 === -0);             // true
console.log(Object.is(+0, -0));     // false

console.log(NaN == NaN);            // false
console.log(NaN === NaN);           // false
console.log(Object.is(NaN, NaN));   // true

console.log(5 == 5);                // true
console.log(5 == "5");              // true
console.log(5 === 5);               // true
console.log(5 === "5");             // false
console.log(Object.is(5, 5));       // true
console.log(Object.is(5, "5"));     // false
```

### `2.Object.assign()`

使用`Object.assign()`主要是为了简化对象的混入(minin)。`Object.assign()`可以吧一个对象的属性和访问完整的拷贝到另一个对象中。 **后面 ES8 会有新方法完善此方法的不足，方法名是`Object.getOwnPropertyDescriptors()`**

```
var object = {
    name : "heqi",
    age : 24,
    friends : ['张三', '李四']
}

var newObject = {};

Object.assign(object, newObject); //则newObject中就有了与object相同的属性和方法.  newObject是接受者，object是提供者

//这种copy是浅copy，也就是说如果属性值是对象的话，只是copy的对象的地址值(引用）

console.log(newObject.friends == object.friends);  //true   newObject和object的friends同事指向了同一个数组。

object.friends.push("王五");

console.log(newObject.friends); //['张三', '李四', '王五']

```

### `3.Object.keys()`

在实际开发中，我们有时候需要知道对象的所有属性，于是 ES5 引入了`Object.keys()`的方法，成员是参数对象的自身(**不含继承的**)所有可遍历属性的键名 **后面 ES8 有类似的方法`Object.values(),Object.entries()`**。

#### a.传入对象，返回键名

```
var object = {a:1,b:2,c:3,d:4}

console.log(Object.keys(object)) //["a","b","c","d"]

Object.keys(object).map((key,item)=>{
    console.log(key,object[key])
    //key=>属性名  object[key]=>属性值
})
```

#### b.传入字符串，返回索引

```
var string = 'abcdefg'
console.log(Object.keys(string)) //[0,1,2,3,4,5,6]
```

#### c.传入数组，返回索引

```
var array = ["a","b","c"]
console.log(Object.keys(array)) //["0","1","2"]
```

#### d.传入构造函数，返回空数组或者属性名

```
const Person = (name,age,gender) => {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.toString = function(){
        return (this.name + "," + this.age + "," + this.gender)
    }
}

console.log(Object.keys(Person)) // []

var people = new Person("heqi",24,"men")

console.log(Object.keys(people)) // ["name","age","gender","toString"]
```
