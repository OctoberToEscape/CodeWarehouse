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

### `1.join()`

该方法可以将数组里的元素,通过指定的分隔符,以字符串的形式连接起来。返回值:返回一个新的字符串。**_原数组不受影响_**

```
var array = [1,2,3,4,5,6]
var string = array.join("-") // 1-2-3-4-5-6
```

### `2.split()`

该方法是用过指定的分隔符,将字符串分割成数组。返回值:返回一个新的数组。**_原数组不受影响_**

```
var string = "1-2-3-4-5-6"
var array = string.split("-") // [1,2,3,4,5,6]
```

### `3.push()`

该方法可以在数组的最后面,添加一个或者多个元素。**_改变原数组_**

```
var array = [1,2,3]
var newArray = array.push(4) // [1,2,3,4]
```

### `4.pop()`

该方法可以在数组的最后面,删除一个元素。返回刚才删除的元素。**_改变原数组_**

```
var array = [1,2,3]
var newArray = array.pop() // 3
conse.log(array) //[1,2]
```

### `5.unshift()`

该方法可以在数组的最前面,添加一个或者几个元素。返回值: 返回的是添加元素后数组的长度。**_改变原数组_**

```
var array = [1,2]

var newArray = array.unshift(4) // 3
console.log(array) // [3,1,2]

var array = [1,2]
var newArray = array.unshift(4,5,6) // 5
console.log(array) // [4,5,6,1,2]
```

### `6.shift()`

该方法可以在数组的最前面,添加一个元素。返回值: 返回的是刚才删除的元素.**_改变原数组_**

```
var array = [1,2,3,4]
var newArray = array.shift() // 1
console.log(array) // [2,3,4]
```

### `7.reverse()`

翻转数组 **_改变原数组_**

```
var array = [1,2,3,4,5]
var newArray = array.reverse() // [5,4,3,2,1]
array === newArray // true
```

### `8.sort()`

该方法可以对数组进行排序。**_改变原数组_**
