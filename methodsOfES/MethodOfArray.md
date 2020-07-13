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

## 常用的数组的方法

### 1.`join()`

该方法可以将数组里的元素,通过指定的分隔符,以字符串的形式连接起来。返回值:返回一个新的字符串。**_原数组不受影响_**

```
var array = [1,2,3,4,5,6]
var string = array.join("-") // 1-2-3-4-5-6
```

### 2.`split()`

该方法是用过指定的分隔符,将字符串分割成数组。返回值:返回一个新的数组。**_原数组不受影响_**

```
var string = "1-2-3-4-5-6"
var array = string.split("-") // [1,2,3,4,5,6]
```

### 3.`push()`

该方法可以在数组的最后面,添加一个或者多个元素。**_改变原数组_**

```
var array = [1,2,3]
var newArray = array.push(4) // [1,2,3,4]
```

### 4.`pop()`

该方法可以在数组的最后面,删除一个元素。返回刚才删除的元素。**_改变原数组_**

```
var array = [1,2,3]
var newArray = array.pop() // 3
conse.log(array) //[1,2]
```

### 5.`unshift()`

该方法可以在数组的最前面,添加一个或者几个元素。返回值: 返回的是添加元素后数组的长度。**_改变原数组_**

```
var array = [1,2]

var newArray = array.unshift(4) // 3
console.log(array) // [3,1,2]

var array = [1,2]
var newArray = array.unshift(4,5,6) // 5
console.log(array) // [4,5,6,1,2]
```

### 6.`shift()`

该方法可以在数组的最前面,添加一个元素。返回值: 返回的是刚才删除的元素.**_改变原数组_**

```
var array = [1,2,3,4]
var newArray = array.shift() // 1
console.log(array) // [2,3,4]
```

### 7.`reverse()`

翻转数组 **_改变原数组_**

```
var array = [1,2,3,4,5]
var newArray = array.reverse() // [5,4,3,2,1]
array === newArray // true
```

### 8.`sort()`

该方法可以对数组进行排序。**_改变原数组_** 。`没有参数的时候没有参数:时按照首字符的先后排序`

```
var array = [1,3,5,2,4,23,122,34];
arr.sort() // [1,122,2,23,3,34,4,5]

//从小到大排序
array.sort((a, b) => {
	return a - b; // [1, 2, 3, 4, 5, 23, 34, 122]
});

//从大到小排序
arr.sort((a,b) => {
    return b - a; //[122, 34, 23, 5, 4, 3, 2, 1]
});
```

### 9.`concat()`

该方法可以把两个数组里的元素拼接成一个新的数组，返回拼接后的新数组。**_不改变原数组_**

```
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

```
var array = [1,2,3,4,5,6,7,8,9]
var newArray = array.slice(0,3) // [1,2,3] 从下标0开始，到下标3结束，不包括下标3
```

#### b).`arr.slice(start)`

从 start 下标开始截取,一直到最后

```
var array = [1,2,3,4,5,6,7]
var newArray = array.slice(2) // [3,4,5,6,7] 从下标为2的开始截取到数组最后
```

#### c).`arr.slice()`

全部截取,几乎没有任何意义

```
var array = [1,2,3,4,5,6,7]
var newArray = array.slice() // [1,2,3,4,5,6,7]
```

### 11.`splice()`

删除或增加元素。**任意位置开始，会改变原数组，没有返回值**

#### a).`arr.splice(start,deletedCount)`

**纯删除**，start=>从下标为 start 开始，删除 deletedCount 个,如果 deletedCount 大于所剩长度截止到最后一个,如果 deletedCount 为 0 则不删除

```
var array = [1,2,3,4,5,6]

var newArray = array.splice(2,3) //[3,4,5]  从下标为2开始删除，删除3个

var newArray = array.splice() // []

var newArray = array.splice(2,0) // []

var newArray = array.splice(0,0) // []
```

#### b).`arr.splice(start,deletedCount,item)`

**替换** 从 start 下标开始,删除 deletedCount 个,并在该位置添加 item

```
var array = [0,1,2,3,4,5,6,7]
array.splice(1,4,"a","b","c","d") // [0,"a","b","c","d",5,6,7] 从下标1开始删除4个，替换成a,b,c,d
```

#### c).`arr.splice(start,0,item)`

**纯添加** 从 start 下标开始(start 前面),添加 item

```
var array = [1,2,3,4,5,6]
array.splice(3,0,11,12,23) // [1,2,3,11,12,23,4,5,6]
```

### 12.`indexOf(ele,fromIndex)`

从 fromIndex **(非必填项)** 开始查找 ele 第一次出现的下标, 如果存在返回第一次出现下标,不存在返回-1

```
var arr = [1,2,3,4,5]
console.log(arr.indexOf(3,2)) // 2
console.log(arr.indexOf(3,3)) // -1
console.log(arr.indexOf(5)) // 4
```

### 13.`lastIndexOf(ele,fromIndex)`

到 下标为 fromIndex **(非必填项)** 开始查找 ele 最后一次出现的下标, 如果存在返回最后次出现下标,不存在返回-1

```
var array = [1,2,3,4,5,6,1,9,12,11,12]
console.log(array.lastIndexOf(1,6)) // 6
console.log(array.lastIndexOf(1,5)) // 0
console.log(array.lastIndexOf(1)) // 6
console.log(array.lastIndexOf(222)) // -1
```

## ES5 新增的数组遍历的方法：

### 1.`forEach(item,index,arr)`

该方法等同于 for 循环，没有返回值 **item=>数组循环出来的每一项，index=>索引，arr=>调用该方法的数组(可不写)**

```
var arr = [1,2,3,4]
arr.forEach((item,index)=>{
    doing...
})
```

### 2.`map(item,index,arr)`

映射,该方法于 forEach()大致相同，但是该方法**有返回值，返回值是一个于原数组相同长度的新数组。item=>数组循环出来的每一项，index=>索引，arr=>调用该方法的数组(可不写)**

```
var arr = [1,2,3,4,5,6]

var res1 = arr.map((item,index)=>{
    return item*2
})

var res2 = arr.forEach((item,index)=>{
    return item*2
})

console.log(res1) // [2,4,6,8,10,12]
console.log(res2) // undefined
```

### 3.`filter(item,index)`

过滤出符合条件的元素,**返回一个数组**、

```
常规过滤

var arr = [1,2,3,4,5,6]
var res = arr.filter((item,index)=>{
    return item % 2 === 0
})
console.log(res) // [2,4,6]

过滤出布尔类型
var arr = ["1","",0,false,"11"]
var res = arr.filter((item,index)=>{
    return item
})
console.log(res) // ["1", "11"]
```
