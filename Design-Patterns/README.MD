# 设计模式

## 什么是设计模式

设计模式就是前端常用的解决问题的一种思维，根据不同的业务场景从而产生不同的解决思维，久而久之这种思维就形成了一个词->"设计模式"。

## 设计模式的分类

设计模式总共分为 3 大类

-   创建型模式

    ```
    作用：简而言之，就是如何创建对象。

    常用的设计模式：单例模式，原型模式，建造者模式，工厂模式，抽象工厂模式
    ```

-   结构型模式

    ```
    作用：用来描述如何将类或对象按照某种布局组成更大的结构，有着继承关系，一般都有代理。

    常用的设计模式：适配器模式,桥接模式,组合模式,装饰器模式, 外观模式,享元模式,代理模式,过滤器模式
    ```

-   行为型模式

    ```
    作用：用来识别对象之间的常用交流模式以及如何分配职责，各自为政，减少外部的干扰。

    常用的设计模式：命令模式，解释器模式，迭代器模式，中介者模式，备忘录模式，观察者模式，状态模式，策略模式，模板方法模式，访问者模式，责任链模式。
    ```

接下来我就介绍一下常用的种设计模式

---

### 建造者模式

建造者模式（Builder Pattern）将一个复杂对象分解成多个相对简单的部分，然后根据不同需要分别创建它们，最后构建成该复杂对象。

> 优点：
>
> > 1.建造者独立，易扩展。
>
> > 2.便于控制细节风险。

> 缺点：
>
> > 1.产品必须有共同点，范围有限制。
>
> > 2.如内部变化复杂，会有很多的建造类。

举个例子来解释一下这个模式，现在 21 世纪家家户户都有电脑了吧，但是你知道电脑是有什么组成的么，简单点假如电脑由显示器，cpu，内存条，光驱，键盘，鼠标组成，这个时候我们就可以这么去建造自己想要的电脑

```js
//创建电脑
class Build {
    constructor() {
        this.monitor = "暂无配置";
        this.CPU = "暂无配置";
        this.RAM = "暂无配置";
        this.opticalDrive = "暂无配置";
        this.keyboard = "暂无配置";
        this.mouse = "暂无配置";
    }

    addMonitor(monitor) {
        this.monitor = monitor;
        return this;
    }
    //cpu
    addCpu(cpu) {
        this.CPU = cpu;
        return this;
    }
    //内存
    addRam(ram) {
        this.RAM = ram;
        return this;
    }
    //光驱
    addOpticalDrive(opticalDrive) {
        this.opticalDrive = opticalDrive;
        return this;
    }
    //键盘
    addKeyboard(keyboard) {
        this.keyboard = keyboard;
        return this;
    }
    //鼠标
    addMouse(mouse) {
        this.mouse = mouse;
        return this;
    }

    //建造
    build() {
        return {
            monitor: this.monitor,
            CPU: this.CPU,
            RAM: this.RAM,
            opticalDrive: this.opticalDrive,
            keyboard: this.keyboard,
            mouse: this.mouse,
        };
    }
}

//我们来自由搭配一下
const computer = new Build()
    .addMonitor("5k高清显示屏")
    .addCpu("3.00GHz")
    .addRam("16G")
    .addOpticalDrive("外置光驱")
    .addKeyboard("机械键盘")
    .addMouse("雷蛇鼠标")
    .build();

console.log(computer);
/* 
    {monitor: "5k高清显示屏", CPU: "3.00GHz", RAM: "16G", opticalDrive: "外置光驱", keyboard: "机械键盘", …}
    CPU: "3.00GHz"
    RAM: "16G"
    keyboard: "机械键盘"
    monitor: "5k高清显示屏"
    mouse: "暂无配置"
    opticalDrive: "外置光驱"
    __proto__: Object
*/
```

上面就通过我 BuildComputer 这个创建者类的写法和调用方法，但是仅仅是一个 6 个属性的对象，我们使用了如此多的代码去创建，这远比直接在 constructor 传递参数创建对象要复杂得多。这是由于在创建的过程中，我们有太多的 addxxxx 方法。我们其实可以自动创建这类 addxxxx 方法以简化代码。

```js
//优化版本
class Build {
    constructor() {
        this.monitor = "暂无配置";
        this.cpu = "暂无配置";
        this.ram = "暂无配置";
        this.opticalDrive = "暂无配置";
        this.keyboard = "暂无配置";
        this.mouse = "暂无配置";

        Object.keys(this).forEach((key) => {
            //统一生成方法名
            const addName = `add${key
                .substring(0, 1)
                .toUpperCase()}${key.substring(1)}`;
            //统一执行方法
            this[addName] = (val) => {
                this[key] = val;
                return this;
            };
        });
    }
    //建造
    build() {
        const keyNotAdd = Object.keys(this).filter(
            (key) => typeof this[key] !== "function"
        );
        return keyNotAdd.reduce((val, key) => {
            return {
                ...val,
                [key]: this[key],
            };
        }, {});
    }
}

// 我们来自由搭配一下;
const computer = new Build()
    .addMonitor("5k高清显示屏")
    .addCpu("3.00GHz")
    .addRam("16G")
    .addOpticalDrive("外置光驱")
    .addKeyboard("机械键盘")
    .addMouse("雷蛇鼠标")
    .build();
console.log(computer);
/* 
    {monitor: "5k高清显示屏", CPU: "3.00GHz", RAM: "16G", opticalDrive: "外置光驱", keyboard: "机械键盘", …}
    CPU: "3.00GHz"
    RAM: "16G"
    keyboard: "机械键盘"
    monitor: "5k高清显示屏"
    mouse: "暂无配置"
    opticalDrive: "外置光驱"
    __proto__: Object
*/
```

这只是创建电脑的方法，那我想要创建很多东西怎么办呢，不能一个一个写吧，这个时候就可以把 Build 创建成一个父类，由子类去继承父类的方法

```js
//创建父类
class Build {
    //初始化
    init() {
        Object.keys(this).forEach((key) => {
            //统一生成方法名
            const addName = `add${key
                .substring(0, 1)
                .toUpperCase()}${key.substring(1)}`;
            //统一执行方法
            this[addName] = (val) => {
                this[key] = val;
                return this;
            };
        });
    }
    //建造
    build() {
        const keyNotAdd = Object.keys(this).filter(
            (key) => typeof this[key] !== "function"
        );

        return keyNotAdd.reduce((val, key) => {
            return {
                ...val,
                [key]: this[key],
            };
        }, {});
    }
}

// 子类1:创建电脑
class BuildComputer extends Build {
    constructor() {
        super();
        this.monitor = "";
        this.cpu = "";
        this.ram = "";
        this.opticalDrive = "";
        this.keyboard = "";
        this.mouse = "";
        super.init();
    }
}

// 子类2:创建汽车
class BuildCar extends Build {
    constructor() {
        super();
        this.engine = "";
        this.chassis = "";
        this.body = "";
        super.init();
    }
}
// 建造电脑
const computer = new BuildComputer()
    .addMonitor("5k高清显示屏")
    .addCpu("3.00GHz")
    .addRam("16G")
    .addOpticalDrive("外置光驱")
    .addKeyboard("机械键盘")
    .addMouse("雷蛇鼠标")
    .build();
console.log(computer);
/* 
    {monitor: "5k高清显示屏", CPU: "3.00GHz", RAM: "16G", opticalDrive: "外置光驱", keyboard: "机械键盘", …}
    CPU: "3.00GHz"
    RAM: "16G"
    keyboard: "机械键盘"
    monitor: "5k高清显示屏"
    mouse: "暂无配置"
    opticalDrive: "外置光驱"
    __proto__: Object
*/

// 建造汽车
const car = new BuildCar()
    .addEngine("v12发动机")
    .addChassis("复合材料底盘")
    .addBody("碳纤维车身")
    .build();
console.log(car);
/* 
    {engine: "v12发动机", chassis: "复合材料底盘", body: "碳纤维车身"}
    body: "碳纤维车身"
    chassis: "复合材料底盘"
    engine: "v12发动机"
    __proto__: Object
 */
```
