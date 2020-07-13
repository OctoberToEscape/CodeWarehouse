// ES7的方法

/**
 * @function Array.prototype.includes()
 * @return Boolean
 * 判断一个数组是否包含一个指定的值，根据情况
 * ES6 indexOf 方法对比此方法,对比此方法有此处缺点因为 indexOf 内部通过严格的 === 进行判断,对导致对NAN的误判 [NaN].indexOf(NaN)// -1
 */

const arr = [1, 3, 5, 2, "8", NaN, -0];
arr.includes(1); // true
arr.includes(1, 2); // false 该方法的第二个参数表示搜索的起始位置，默认为0
arr.includes("1"); // false
arr.includes(NaN); // true
arr.includes(+0); // true

/**
 * 指数运算符
 * @function **
 * 具有跟Math.pow() 等效的计算结果
 */
console.log(2 ** 10); // 输出1024
console.log(Math.pow(2, 10)); // 输出1024
2 ** 10 === Math.pow(2, 10); // 2的10次方

//ES8新特性
/**
 * @function Async/Await
 * 我们都知道使用Promise能很好地解决回调地狱的问题，但如果处理流程比较复杂的话，那么整段代码将充斥着then，语义化不明显
 * 优化了 promise的then 链式写法的在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力，并且使得代码逻辑更加清晰
 * 注意！！！ await 不可以脱离 async 单独使用，await 后面一定是Promise 对象，如果不是会自动包装成Promise对象。
 */

//运用链式的写法 等同于下面的async / await 的写法
fetch("xxxxxx1")
	.then((response) => {
		console.log(response);
		return fetch("xxxxxxx2");
	})
	.then((response) => {
		console.log(response);
	})
	.catch((error) => {
		console.log(error);
	});

//async / await 的写法
const foo = async () => {
	try {
		const res1 = await fetch("xxxxxx1");
		console.log(res1);
		const res2 = await fetch("xxxxxx2");
		console.log(res2);
	} catch (err) {
		console.log(err);
	}
};
foo();

/**
 * @function Object.values()
 * @return Array
 * Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值。
 */

const obj1 = { foo: "bar", baz: 42 };
Object.values(obj1); // ["bar", 42]
// 注意的是，如果属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是b、c、a。
const obj2 = { 100: "a", 2: "b", 7: "c" };
Object.values(obj2); // ["b", "c", "a"]

/**
 * @function Object.entries()
 * @return Array
 * Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
 */
const obj3 = { foo: "bar", baz: 42 };
Object.entries(obj3); // [ ["foo", "bar"], ["baz", 42] ]
// 注意的是，如果属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是[['1', 'yyy'], ['3', 'zzz'], ['10': 'xxx']]
const obj4 = { 10: "xxx", 1: "yyy", 3: "zzz" };
Object.entries(obj4); // [['1', 'yyy'], ['3', 'zzz'], ['10': 'xxx']]

/**
 * @function String.padStart(targetLength,[padString]) 从开头添加
 * @function String.padEnd(targetLength,[padString]) 从结尾添加
 * @return String
 * 允许将空字符串或其他字符串添加到原始字符串的开头或结尾
 * targetLength(必填):当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
 * padString(可选):填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断，此参数的缺省值为 " "。
 */

"x".padStart(4, "ab"); // 'abax'
"x".padEnd(5, "ab"); // 'xabab'
