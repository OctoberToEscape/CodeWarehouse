# 字符串的方法

## 常用的字符串的方法

### 1.`toLowerCase()`

把字符串转换成小写,**返回新的字符串**

```
var str = "Hello World";
var newStr = str.toLowerCase(); // hello world
```

### 2.`toUpperCase()`

把字符串转换成大写,**返回新的字符串**

```
var str = "hello world";
var newStr = str.toUpperCase(); // HELLO WORLD
```

### 3.`charAt(index)`

寻找指定字符串的**下标为 index**的字符,如果 index 不在 0 至 str.length(不包含 str.length)之间，返回空字符串。

```
var str = "hello world"
var newStr1 = str.charAt(2) // l
var newStr2 = str.charAt(5) // `空格`  空格也算一个字符
var newStr3 = str,charAt(100) // 空
```

### 4.`charCodeAt(index)`

寻找指定字符串的**下标为 index 的 unicode 编码**,这个返回值是 0 - 65535 之间的整数。**_如果 index 不在 0-str.length(不包含 str.length)之间，返回 NaN。_**

```
var str = "hello world"
var unicode1 = str.charCodeAt(1)  // 101
var unicode2 = str.charCodeAt(-3) // NaN
```

### 5.`indexOf(value,start)`

寻找指定字符串在存在字符串重的
