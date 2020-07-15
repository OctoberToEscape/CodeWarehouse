# 数组的方法

## 区别：

| 修改原数组    | 不修改原数组              |
| ------------- | ------------------------- |
| push,pop      | concat                    |
| unshift,shift | join                      |
| sort          | slice                     |
| reverse       | indexOf(),lastIndexOf()   |
| splice        | forEach                   |
| copyWithin    | map                       |
| fill          | filter                    |
|               | some                      |
|               | every                     |
|               | reduce,reduceRight        |
|               | includes                  |
|               | finde,findIndex           |
|               | entries(),keys(),valuse() |
|               | flat(),flatMap()          |

## 常用的数组的方法

### 1.`join()`

该方法可以将数组里的元素,通过指定的分隔符,以字符串的形式连接起来。返回值:返回一个新的字符串。**_原数组不受影响_**

```js
var array = [1, 2, 3, 4, 5, 6];
var string = array.join("-"); // 1-2-3-4-5-6
```

### 2.`split()`

该方法是用过指定的分隔符,将字符串分割成数组。返回值:返回一个新的数组。**_原数组不受影响_**

```js
var string = "1-2-3-4-5-6";
var array = string.split("-"); // [1,2,3,4,5,6]
```

### 3.`push()`

该方法可以在数组的最后面,添加一个或者多个元素。**_改变原数组_**

```js
var array = [1, 2, 3];
var newArray = array.push(4); // [1,2,3,4]
```

### 4.`pop()`

该方法可以在数组的最后面,删除一个元素。返回刚才删除的元素。**_改变原数组_**

```js
var array = [1, 2, 3];
var newArray = array.pop(); // 3
console.log(array); //[1,2]
```

### 5.`unshift()`

该方法可以在数组的最前面,添加一个或者几个元素。返回值: 返回的是添加元素后数组的长度。**_改变原数组_**

```js
var array = [1, 2];

var newArray = array.unshift(4); //  3
console.log(array); // [4,1,2]

var array = [1, 2];
var newArray = array.unshift(4, 5, 6); // 5
console.log(array); // [4,5,6,1,2]
```

### 6.`shift()`

该方法可以在数组的最前面,删除一个元素。返回值: 返回的是刚才删除的元素.**_改变原数组_**

```js
var array = [1, 2, 3, 4];
var newArray = array.shift(); // 1
console.log(array); // [2,3,4]
```

### 7.`reverse()`

翻转数组 **_改变原数组_**

```js
var array = [1, 2, 3, 4, 5];
var newArray = array.reverse(); // [5,4,3,2,1]
array === newArray; // true
```

### 8.`sort()`

该方法可以对数组进行排序。**_改变原数组_**。`没有参数的时候没有参数:时按照首字符的先后排序`

```js
var array = [1, 3, 5, 2, 4, 23, 122, 34];
arr.sort(); // [1,122,2,23,3,34,4,5]

//从小到大排序
array.sort((a, b) => {
    return a - b; // [1, 2, 3, 4, 5, 23, 34, 122]
});

//从大到小排序
arr.sort((a, b) => {
    return b - a; //[122, 34, 23, 5, 4, 3, 2, 1]
});
```

### 9.`concat()`

该方法可以把两个数组里的元素拼接成一个新的数组，返回拼接后的新数组。**_不改变原数组_**

```js
var array1 = [1,2,3]
var array2 = [4,5,6]
var arr = array1.concat(array2) // arr = [1,2,3,4,5,6]

var array1.push(array2) // [1,2,3,[4,5,6]]

//该方法和push的区别: push是直接把后一个元素原封不动的添加到第一个数组的后面;
```

### 10.`slice()`

该方法可以从数组中截取指定的字段,返回出来。返回截取出来的字段,放到新的数组中。**_不改变原数组_**

#### a).`arr.slice(start,end)`

从 start 下标开始截取,一直到 end 结束,不包括 end

```js
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var newArray = array.slice(0, 3); // [1,2,3] 从下标0开始，到下标3结束，不包括下标3
```

#### b).`arr.slice(start)`

从 start 下标开始截取,一直到最后

```js
var array = [1, 2, 3, 4, 5, 6, 7];
var newArray = array.slice(2); // [3,4,5,6,7] 从下标为2的开始截取到数组最后
```

#### c).`arr.slice()`

全部截取,几乎没有任何意义

```js
var array = [1, 2, 3, 4, 5, 6, 7];
var newArray = array.slice(); // [1,2,3,4,5,6,7]
```

### 11.`splice()`

删除或增加元素。**任意位置开始，会改变原数组，没有返回值**

#### a).`arr.splice(start,deletedCount)`

**纯删除**，start=>从下标为 start 开始，删除 deletedCount 个,如果 deletedCount 大于所剩长度截止到最后一个,如果 deletedCount 为 0 则不删除

```js
var array = [1, 2, 3, 4, 5, 6];

var newArray = array.splice(2, 3); //[3,4,5]  从下标为2开始删除，删除3个

var newArray = array.splice(); // []

var newArray = array.splice(2, 0); // []

var newArray = array.splice(0, 0); // []
```

#### b).`arr.splice(start,deletedCount,item)`

**替换** 从 start 下标开始,删除 deletedCount 个,并在该位置添加 item

```js
var array = [0, 1, 2, 3, 4, 5, 6, 7];
array.splice(1, 4, "a", "b", "c", "d"); // [0,"a","b","c","d",5,6,7] 从下标1开始删除4个，替换成a,b,c,d
```

#### c).`arr.splice(start,0,item)`

**纯添加** 从 start 下标开始(start 前面),添加 item

```js
var array = [1, 2, 3, 4, 5, 6];
array.splice(3, 0, 11, 12, 23); // [1,2,3,11,12,23,4,5,6]
```

### 12.`indexOf(ele,fromIndex)`

从 fromIndex **(非必填项)** 开始查找 ele 第一次出现的下标, 如果存在返回第一次出现下标,不存在返回-1

```js
var arr = [1, 2, 3, 4, 5];
console.log(arr.indexOf(3, 2)); // 2
console.log(arr.indexOf(3, 3)); // -1
console.log(arr.indexOf(5)); // 4
```

### 13.`lastIndexOf(ele,fromIndex)`

到 下标为 fromIndex **(非必填项)** 开始查找 ele 最后一次出现的下标, 如果存在返回最后次出现下标,不存在返回-1

```js
var array = [1, 2, 3, 4, 5, 6, 1, 9, 12, 11, 12];
console.log(array.lastIndexOf(1, 6)); // 6
console.log(array.lastIndexOf(1, 5)); // 0
console.log(array.lastIndexOf(1)); // 6
console.log(array.lastIndexOf(222)); // -1
```

### 14.`copyWithin(target,start,end)`

数组实例的 `copyWithin()`方法，在当前数组内部，将指定位置的成员复制到其他位置 **(会覆盖原有成员)**，然后**返回当前数组**。也就是说，使用这个方法，会 **_修改当前数组_** 。**target(必须)=>从该位置开始替换数据。start(可选)=>从该位置开始读取数据，`默认为 0。如果为负值，表示倒数`。end(可选)=>到该位置前停止读取数据，`默认等于数组长度。如果为负值，表示倒数`。**

```js
var arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3); // [4,5,3,4,5]  表示将从下标3位直到数组结束的成员（4 和 5），复制到从下标0开始的位置，结果覆盖了原来的 1 和 2。

arr.copyWithin(1, 3, 4); // [1,4,3,4,5] 表示从下标3开始到下标4之间的成员(不包含4)的值复制到下标为1的位置上

arr.copyWithin(0, -2, -1); // [4,2,3,4,5]  -2相当于下标3，-1相当于下标4 既将下标3到下标4之间的成员(不包含下标4)的值复制到下标0的位置上
```

### 15.`fill(value,start,end)`

函数用于使用给定的静态值填充数组。该值可用于填充整个数组，也可用于填充数组的一部分。**value=>定义了要替换数组元素的静态值。start（可选）=>它定义了使用静态值填充数组的起始索引。如果未定义此值，则将起始索引视为 0。如果 start 为负，则起始索引为 `length + start`。end（可选）=>此参数定义要使用静态值填充数组的最后一个索引。如果未定义此值，则默认情况下，将 `arr.length - 1` 的最后一个索引作为结束值。如果结束为负，则将终止索引定义为 `length + end`。**

```js
var arr1 = [];
arr1.fill(6); // [] 原数组中没有定长度，没有数据可以替换，所以结果仍为空

var arr2 = ["a", "b", "c"];
arr2.fill(7); // [7,7,7] 将每一项都替换成7

var arr3 = [1, 2, 3, 4, 5];
arr3.fill(10, 2, 4); // [1,2,10,10,5] 从下标为2开始到下标为4结束(不包含下标4)的值都替换成10

var arr4 = [1, 2, 3, 4, 5, 6, 7, 8];
arr4.fill(10, -5, -2); //[1,2,3,10,10,10,7,8]  -5则表示从左往右5个既下标3开始  -2则表示从左往右2个既下标6(不包含下标6)结束 的数值 换成 10
```

### 16.`flat(value)`

数组的成员有时还是数组(多维数组)，`Array.prototype.flat()`用于将嵌套的数组“拉平”，变成一维的数组。**value=>扯平的层数,默认值是 1,如果葙不管多少层直接变成一维数组 value 设置成 Infinity 即可，该方法返回一个新数组，对原数据没有影响**。

```js
var arr = [1, [2, 3], [4, 5]];
var newArr = arr.flat(); // [1,2,3,4,5]

var arr = [1, 2, 3, [4, [5, 6]]];
var newArr1 = arr.flat(); // [1,2,3,4,[5,6]]
var newArr2 = arr.flat(2); // [1,2,3,4,5,6]

var arr = [1, [2, [3, [4, 5]]]];
var newArr = arr.flat(Infinity); // [1,2,3,4,5]

var arr = [1, 2, , 4, 5];
var newArr = arr.flat(); // [1,2,4,5] // 如果数组有空位，则会跳过空位
```

### 17.`flatMap()`

方法对原数组的每个成员执行一个函数（相当于执行 `Array.prototype.map()`），然后对返回值组成的数组执行 `flat()`方法。**该方法返回一个新数组，不改变原数组**。

```js
var arr = [1, 2, 3, 4, 5];
var newArr = arr.flatMap((x) => [x, x * 5]);
//相当于 [[1,5],[2,10],[3,15],[4,20],[5,20]].flat()
console.log(newArr); // [1,5,2,10,3,15,4,20,5,25]

//flatMap()只能展开一层数组
var arr = [[[2]], [[3]], [[4]], [[5]]];
var newArr1 = arr.flatMap((x) => [[x * 2]]); //[[4],[6],[8],[10]]
//想变成一维数组写法
var newArr2 = arr.flatMap((x) => [x * 2]); // [4,6,8,10]
```

## 常用的数组遍历的方法：

### 1.`forEach(item,index,arr)`

该方法等同于 for 循环，没有返回值 **item=>数组循环出来的每一项，index=>索引，arr=>调用该方法的数组(可不写)**

```js
var arr = [1, 2, 3, 4];
arr.forEach((item, index) => {
    // doing...
});
```

### 2.`map(item,index,arr)`

映射,该方法于 forEach()大致相同，但是该方法**有返回值，返回值是一个于原数组相同长度的新数组。item=>数组循环出来的每一项，index=>索引，arr=>调用该方法的数组(可不写)**

```js
var arr = [1, 2, 3, 4, 5, 6];

var res1 = arr.map((item, index) => {
    return item * 2;
});

var res2 = arr.forEach((item, index) => {
    return item * 2;
});

console.log(res1); // [2,4,6,8,10,12]
console.log(res2); // undefined
```

### 3.`filter(item,index)`

过滤出符合条件的元素,**返回一个数组,item=>数组循环出来的每一项，index=>索引**

```js
//常规过滤;
var arr = [1, 2, 3, 4, 5, 6];
var res = arr.filter((item, index) => {
    return item % 2 === 0;
});
console.log(res); // [2,4,6]

//过滤出布尔类型;
var arr = ["1", "", 0, false, "11"];
var res = arr.filter((item, index) => {
    return item;
});
console.log(res); // ["1", "11"]
```

### 4.`some()`

判断数组中有没有符合条件的项 **(只要有,就返回 true)**,如果一个都没有,**返回 false**

```js
var arr = [
    {
        name: "heqi",
        age: 24,
    },
    {
        name: "javascript",
        age: 50,
        done: true,
    },
    {
        name: "java",
        age: 70,
        done: false,
    },
];

var res1 = arr.some((item) => {
    return item.done;
});
console.log(res1); // true

var res2 = arr.some((item) => {
    return item.home;
});
console.log(res2); // false
```

### 5.`every()`

判断数组中 **_所有的项_** 是否满足要求,**如果全都满足,返回 true,否则返回 false**

```js
var arr = [
    {
        name: "heqi",
        age: 24,
    },
    {
        name: "javascript",
        age: 50,
        done: true,
    },
    {
        name: "java",
        age: 70,
        done: false,
    },
];

var res1 = arr.every((item) => {
    return item.age;
});
console.log(res1); // true

var res2 = arr.every((item) => {
    return item.done;
});
console.log(res2); // false
```

### 6.`find()`

找到符合条件的**项**,并且**返回第一项**

```js
var arr = [
    { id: 1, name: "heqi", done: false },
    { id: 2, name: "javascript", done: true },
    { id: 3, name: "java", done: true },
];

var res = arr.find((item) => {
    return item.done;
});
console.log(res); // {id: 2, name: "javascript", done: true}
```

### 7.`findIndex()`

找到符合条件的**项的下标**,并且**返回第一个符合条件的下标**

```js
var arr = [
    { id: 1, name: "heqi", done: false },
    { id: 2, name: "javascript", done: true },
    { id: 3, name: "java", done: true },
];

var res = arr.findIndex((item) => {
    return item.done;
});
console.log(res); // 1
```

### 8.`reduce()`

#### a).求和计算

```js
var arr = [1, 2, 3, 4, 5];
var sum = arr.reduce((pre, next, index) => {
    return pre + next;
});
console.log(sum); // 15

/*
    计算过程：
    第一步 ： 1 + 2 = 3    // [3,3,4,5]
    第二步 ： 3 + 3 = 6    // [6,4,5]
    第三步 ： 6 + 4 = 10   // [10,5]
    第四步 ： 10 + 5 = 15  // [15]
 */
```

#### b).扁平化数组(拼接数组)

```js
var arr = [
    [1, 2, 3],
    [4, 5],
    [6, 7],
];
var newArr = arr.reduce((pre, next, index) => {
    return pre.concat(next);
});
console.log(newArr); // [1,2,3,4,5,6,7]
```

#### c).对象数组叠加计算

```js
var arr = [
    { price: 10, count: 1 },
    { price: 15, count: 2 },
    { price: 20, count: 3 },
];

var sum = arr.reduce((pre, next, index) => {
    return pre + next.price * next.count;
}, 0); // 重点！:添加这个0，是为了不改变原数组，切不可操作第一项(下标为0的pre是没有，所以加0)

console.log(sum); // 100
```

#### d).应用计算数组中每个元素出现的次数(投票板)

```js
var names = ["heqi", "Tom", "Bob", "Alice", "heqi"];

var countedNames = names.reduce((object, name) => {
    //object 对应下面的{},即定义的空对象,name则是上面数组循环出来的每一项的内容
    console.log(object, "|", name); //见下图
    if (name in object) object[name]++;
    else object[name] = 1;
    return object;
}, {}); // {} 的含义是 存到一个对象里(还可以是[])
console.log(countedNames); // {heqi: 2, Tom: 1, Bob: 1, Alice: 1}
```

![img5.png](https://i.loli.net/2020/07/14/WN1Ze74nBI8iPhC.png)

### 9.`includes(value,start)`

判断一个数组是否包含一个指定的值，根据情况。ES6 `indexOf()` 方法对比此方法,对比此方法有此处缺点因为 `indexOf()` 内部通过严格的 === 进行判断,对导致对 NAN 的误判 [NaN].indexOf(NaN) // -1。返回布尔值。**value=>查询的值，start=>开始搜索的起始下标，默认为 0**

```js
var arr = [1, 3, 5, 2, "8", -0, NaN];
arr.includes(1); // true
arr.includes(1, 2); // false 该方法的第二个参数表示搜索的起始位置，默认为0
arr.includes("1"); // false
arr.includes(NaN); // true
arr.includes(+0); // true
```

### 10.`for...of`

遍历数组元素值

```js
var arr = ["Vue", "React", "Node", "Angular"];
for (var item of arr) {
    console.log(item); // Vue , React , Node , Angular
}
```

### 11.`for...in`

遍历数组的索引

```js
var arr = ["Vue", "React", "Node", "Angular"];
for (var item in arr) {
    console.log(arr[item]); // Vue , React , Node , Angular
}
```
