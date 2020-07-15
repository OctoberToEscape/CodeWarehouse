# 字符串的方法

## 常用的字符串的方法

### 1.`toLowerCase()`

把字符串转换成小写,**返回新的字符串**

```js
var str = "Hello World";
var newStr = str.toLowerCase(); // hello world
```

### 2.`toUpperCase()`

把字符串转换成大写,**返回新的字符串**

```js
var str = "hello world";
var newStr = str.toUpperCase(); // HELLO WORLD
```

### 3.`charAt(index)`

寻找指定字符串的**下标为 index**的字符,如果 index 不在 0 至 str.length(不包含 str.length)之间，返回空字符串。

```js
var str = "hello world";
var newStr1 = str.charAt(2); // l
var newStr2 = str.charAt(5); // `空格`  空格也算一个字符
var newStr3 = str,charAt(100); // 空
```

### 4.`charCodeAt(index)`

寻找指定字符串的**下标为 index 的 unicode 编码**,这个返回值是 0 - 65535 之间的整数。**_如果 index 不在 0-str.length(不包含 str.length)之间，返回 NaN。_**

```js
var str = "hello world";
var unicode1 = str.charCodeAt(1); // 101
var unicode2 = str.charCodeAt(-3); // NaN
```

### 5.`indexOf(value,start)`

寻找指定字符串在存在字符串中的第一次出现的下标 **对大小写敏感需要区分,value=>需要查找的字符，start=>开始寻找的其实下标，默认是 0，返回值：找到返回第一次出现的下标，找不到返回-1**,

```js
var str = "hello world";
var index1 = str.indexOf("m"); // -1
var index2 = str.indexOf("l"); // 2
var index3 = str.indexOf("o", 5); // 7
```

### 6.`lastIndexOf(value,start)`

返回某个指定的子字符串在字符串中最后出现的位置。**对大小写敏感(需要区分大小写)，value=>需要查找的字符，start=>开始查找的下标，默认为 0,找到返回下标，找不到返回-1** **_查找顺序是从后往前_**

```js
var str = "hello wrold";
var index1 = str.lastIndexOf("m"); // -1
var index2 = str.lastIndexOf("l"); // 9
var index3 = str.lastIndexOf("e", 8); // 1
var index4 = str.lastIndexOf("l", 1); // -1
```

### 7.`slice(start,end)`

返回字符串中提取的子字符串。**start=>开始提取的下标，end=>提取结束的下标(不包含 end),不写就是到最后一个字符**, **_如果是负数，-1 为字符串的最后一个字符。 但不包含下标 end 的字符串。前一个数要小于后一个数，否则返回空字符串_**

```js
var str = "javaScript";
var newStr1 = str.slice(2); // vaScript
var newStr2 = str.slice(2, 5); // vaS
var newStr3 = str.slice(-5, -1); // crip
```

### 8.`substring(start,end)`

提取字符串中介于两个指定下标之间的字符。**start=>开始下标，end=>结束下标(不包含 end),不写就是到最后一位字符。** **_与`slice()`区别是不接受参数为负数的情况_**

```js
var str = "javaScript";
var newStr1 = str.substring(2); // vaScript
var newStr2 = str.substring(2, 2); // "" 如果参数相同，返回空字符串，长度为0
var newStr3 = str.substring(2, 6); // vaSc
```

### 9.`substr(start,number)`

返回从指定下标开始指定长度的的子字符串。**start=>开始的下标,number=>往后提取的数量,如果为负数或者 0，则返回空字符串，长度为 0**

```js
var str = "javaScript";
var newStr1 = str.substr(2); // vaScript
var newStr2 = str.substr(2, 6); // vaScri
var newStr3 = str.substr(2, 2); // va
var newStr4 = str.substr(-4, 3); // rip
var newStr5 = str.substr(-4, 0); // "",第二个参数为0，返回空字符串，长度为0
var newStr6 = str.substr(-4, -5); // "",第二个参数为负数，返回空字符串，长度为0
```

### 10.`split(value,number)`

把字符串以 value 分割成返回最大长度为 number 的数组 **value=>分割的标示，number=>返回数组的最大长度,不写则全部返回**

```js
var str1 = "1:2:3:4:5:6";
var newStr1 = str1.split(":"); // ["1","2","3","4","5","6"]
var newStr2 = str1.split(":", 3); // ["1","2","3"]

var str2 = "AA BB CC DD";
var newStr3 = str2.split(""); //["A", "A", " ", "B", "B", " ", "C", "C", " ", "D", "D"] 如果把空字符串 ("")用作分割符，那么字符串的每个字符之间都会被分割
var newStr4 = str2.split(" "); // ["AA" "BB" "CC" "DD"] 以空格为分隔符
```

### 11.`replace()`

常用于正则的判断替换

```js
var str = "javaScript";
var reg = /va/gi;
var newStr = str.replace(reg, "**");
console.log(newStr); // ja**Script
```

### 12.`match()`

常用于查找字符串中所有关键字内容 **返回数组**

```js
var str = "javaScript javascript";
var reg = /script/gi;
var arr = str.match(reg);
console.log(arr); //["Script","script"]
```

---

## ES6 新增的字符串的方法

### 1.`includes(value,start)`

查找字符串中是否含有某个字符,**有返回 true,没有返回 false。value=>需要查找的字符,start 起始位置,不写则从首位开始。**

```js
var str = "javaScript";
str.includes("w"); // false
str.includes("Script"); // true
str.includes("Script", 5); // false
```

### 2.`startsWith(value,start)`

查询字符串是以特定字符开头。**返回值，是的话返回 true，不是的话返回 false。value=>需要查找的字符，start=>查找起始位置`往后找`，不写则从首位开始`往后找`。**

```js
var str = "javaScript";
str.startsWith("java"); // true
str.startsWith("php"); // false
str.startsWith("S", 4); // true
```

### 3.`endsWith(value,start)`

查询字符串是以特定字符结尾。**返回值，是的话返回 true，不是的话返回 false。value=>需要查找的字符，start=>开始查找的位置`往前找`(不包含 start)，不写则从最后以为`往前找`。**

```js
var str = "javaScript";
str.endsWith("pt"); // true
str.endsWith("go"); // false
str.endsWith("va", 4); // true
```

### 4.`padStart(maxLength,value)`

用做字符串的头部补全，返回补全后的字符串。**maxLength=>补全后最大的字符串长度，value=>补全的字符。** **_如果 maxLength 小于原字符串长度，则会返回原字符串_，如果不写 value 则会用空格代替**

```js
var str = "javaScript";
```
