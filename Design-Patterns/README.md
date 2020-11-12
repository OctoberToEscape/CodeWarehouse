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

接下来我就介绍一下常用的几种设计模式

---

### 1.建造者模式

建造者模式将一个复杂对象分解成多个相对简单的部分，然后根据不同需要分别创建它们，最后构建成该复杂对象。

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

举个例子来解释一下这个模式，现在 21 世纪家家户户都有电脑了吧，但是你知道电脑是由什么组成的么，简单点假如电脑由显示器，cpu，内存条，光驱，键盘，鼠标组成，这个时候我们就可以这么去建造自己想要的电脑

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
    {monitor: "5k高清显示屏", cpu: "3.00GHz", ram: "16G", opticalDrive: "外置光驱", keyboard: "机械键盘", …}
    cpu: "3.00GHz"
    keyboard: "机械键盘"
    monitor: "5k高清显示屏"
    mouse: "雷蛇鼠标"
    opticalDrive: "外置光驱"
    ram: "16G"
    __proto__: Object
*/
```

上面就通过我 Build 这个创建者类的写法和调用方法，但是仅仅是一个 6 个属性的对象，我们使用了如此多的代码去创建，这远比直接在 constructor 传递参数创建对象要复杂得多。这是由于在创建的过程中，我们有太多的 addxxxx 方法。我们其实可以自动创建这类 addxxxx 方法以简化代码。

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
    {monitor: "5k高清显示屏", cpu: "3.00GHz", ram: "16G", opticalDrive: "外置光驱", keyboard: "机械键盘", …}
    cpu: "3.00GHz"
    keyboard: "机械键盘"
    monitor: "5k高清显示屏"
    mouse: "雷蛇鼠标"
    opticalDrive: "外置光驱"
    ram: "16G"
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
    {monitor: "5k高清显示屏", cpu: "3.00GHz", ram: "16G", opticalDrive: "外置光驱", keyboard: "机械键盘", …}
    cpu: "3.00GHz"
    keyboard: "机械键盘"
    monitor: "5k高清显示屏"
    mouse: "雷蛇鼠标"
    opticalDrive: "外置光驱"
    ram: "16G"
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

---

### 2.工厂模式

在众多设计模式当中，有一种被称为工厂模式的设计模式，它提供了创建对象的最佳方式。工厂模式可以分为：**简单工厂模式**、**工厂方法模式**和**抽象工厂模式**。

-   简单工厂模式

    简单工厂模式又叫 **_静态方法模式_**，因为工厂类中定义了一个静态方法用于创建对象。

    > 优点：
    >
    > > 1.客户端只需知道传入工厂类静态方法的参数，而不需要关心创建对象的细节
    >
    > > 2.工厂类负责创建的对象比较少：由于创建的对象比较少，不会造成工厂方法中业务逻辑过于复杂

    ```js
    //我们想去买点动物，这个时候去了一家宠物店

    //宠物猫
    class Cat {
        constructor(person) {
            console.log(`${person}买了一只猫咪`);
        }
    }
    //宠物狗
    class Dog {
        constructor(person) {
            console.log(`${person}买了一只狗`);
        }
    }
    //宠物猪
    class Pig {
        constructor(person) {
            console.log(`${person}买了一只猪`);
        }
    }

    //店家
    class Animal {
        constructor(animal, person) {
            switch (animal) {
                case "cat":
                    return new Cat(person);
                    break;
                case "dog":
                    return new Dog(person);
                    break;
                case "pig":
                    return new Pig(person);
                    break;
                default:
                    throw new Error(`尊敬的${person},很抱歉,本店没有${animal}`);
            }
        }
    }

    //用户去购买小动物
    new Animal("cat", "Tom"); // Tom买了一只猫咪
    new Animal("pig", "Jack"); // Jack买了一只猪
    new Animal("dog", "Lisa"); // Lisa买了一只狗
    new Animal("monkey", "Heqi"); //  Error: 尊敬的Heqi,很抱歉,本店没有monkey at new Animal
    ```

    在以上代码中，我们定义一个 `Animal` 类，该类提供了一个叫 `animal` 的参数，用于根据不同的模型参数来购买不同类型的小动物。

-   工厂方法模式

    工厂方法模式又称为工厂模式，也叫 **_多态工厂模式_**，它属于类创建型模式。

    工厂方法模式是对简单工厂的进一步优化， 在工厂方法模式中，我们不再提供一个统一的工厂类来创建所有的对象，而是针对不同的对象提供不同的工厂。也就是说**每个对象都有一个与之对应的工厂**。说的好像挺复杂，其实在我看来他就是 **_解决简单工厂模式存在的不方便添加新的类，因为添加新的类以后需要修改工厂函数_**。而工厂方法模式就是解决这个问题，

    ```js
    //我们在之前的例子上在升级一下

    //现在宠物店升级了
    const Animal = (() => {
        const animal = {
            cat(person) {
                console.log(`${person}买了一只猫咪`);
            },
            dog(person) {
                console.log(`${person}买了一只狗子`);
            },
            pig(person) {
                console.log(`${person}买了一只猪猪`);
            },
            //现在宠物店新进了一只宠物
            monkey(person) {
                console.log(`${person}买了一只猴子`);
            },
        };

        return class {
            constructor(type, person) {
                try {
                    return animal[type](person);
                } catch {
                    throw new Error(`尊敬的${person},很抱歉,本店没有${type}`);
                }
            }
        };
    })();

    //再次购买宠物
    new Animal("cat", "Tom"); // Tom买了一只猫咪
    new Animal("pig", "Jack"); // Jack买了一只猪
    new Animal("dog", "Lisa"); // Lisa买了一只狗
    new Animal("monkey", "Heqi"); // Heqi买了一只猴子 因为上架了猴子，所以这次能买到猴子了
    ```

    上面代码我们可以看到，相比于简单工厂函数，工厂方法模式的工厂函数不是固定的，而是根据 type 不同而不同。当我们需要**添加**新的类时，只需要在 animal 对象中添加实例即可，不需要修改工厂函数。这样的话就不会因为需要添加新的类，而修改过多的代码逻辑。这就是工厂方法模式。**其实就是对简单工厂模式的优化而已。**

-   抽象工厂模式

    抽象工厂模式是围绕一个超级工厂创建其他工厂。该超级工厂又称为其他工厂的工厂。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。提供一个创建一系列相关或相互依赖对象的接口，而无须指定它们具体的类。

    ```js
    //现在我们的宠物店已经做得很大了，可以开很多分店了，而且还加入新的收购宠物的功能

    //宠物总店
    class HeadOffice {
        sellAnimal(name, person) {
            console.log(`店铺出售了一只${name}给${person}`);
        }
        buyAnimal(name, person) {
            console.log(`${person}卖给店铺一只${name}`);
        }
        methods(type, name, person) {
            switch (type) {
                case "sell":
                    this.sellAnimal(name, person);
                    break;
                case "buy":
                    this.buyAnimal(name, person);
            }
        }
    }

    //陆地宠物分店
    class LandAnimal extends HeadOffice {
        constructor() {
            super();
        }
        cat(type, person) {
            this.methods(type, "猫咪", person);
        }
        dog(type, person) {
            this.methods(type, "狗狗", person);
        }
        pig(type, person) {
            this.methods(type, "猪猪", person);
        }
    }

    //水类宠物分店
    class FishAnimal extends HeadOffice {
        constructor() {
            super();
        }
        shark(type, person) {
            this.methods(type, "鲨鱼", person);
        }
        whale(type, person) {
            this.methods(type, "鲸鱼", person);
        }
    }

    //店铺选择
    const pet = (shop) => {
        switch (shop) {
            case "land":
                return new LandAnimal();
                break;
            case "fish":
                return new FishAnimal();
                break;
            default:
                throw new Error(`非常抱歉，暂时没有${shop}店铺`);
        }
    };

    //去陆地宠物店
    const landShop = pet("land");
    landShop.cat("sell", "Tom"); // 店铺出售了一只猫咪给Tom
    landShop.dog("buy", "Jack"); // Jack卖给店铺一只狗狗

    //去水族馆
    const aquarium = pet("fish");
    aquarium.shark("sell", "Lisa"); // 店铺出售了一只鲨鱼给Lisa
    aquarium.whale("buy", "Nick"); // Nick卖给店铺一只鲸鱼

    //去一个不存在的店铺
    const zoo = pet("zoo"); // Error: 非常抱歉，暂时没有zoo店铺at pet
    ```

    如上我们通过选择不同的类型进入不同的店铺购买或出售小宠物，用抽象工厂完成了一个简单去各分店的功能。

---

### 3.单例模式

单例模式是一种常用的模式，有一些对象我们往往只需要一个，比如全局缓存、浏览器中的 window 对象等。单例模式用于保证一个类仅有一个实例，并提供一个访问它的全局访问点。

> 优点：适用于单一对象，只生成一个对象实例，避免频繁创建和销毁实例，减少内存占用。

> 缺点：不适用动态扩展对象，或需创建多个相似对象的场景。

-   普通版单例模式

    通过静态属性定义了个 getInstance 方法，检查 instance 是否存在实现单例属性

    但是也存在缺点，并不能通过 new 实例化，只能通过访问静态属性来创建，不够透明

    ```js
    //单例模式
    class Singleton {
        static instance = null;
        constructor(name) {
            this.name = name;
        }
        getName() {
            console.log(this.name);
        }
        static getInstance(name) {
            if (!Singleton.instance) {
                Singleton.instance = new Singleton(name);
            }
            return Singleton.instance;
        }
    }

    const point1 = Singleton.getInstance("javascript");
    const point2 = Singleton.getInstance("php");
    point1.getName(); // javascript
    point2.getName(); // javascript
    console.log(point1 === point2); // true

    //不能new 实例化实现单例属性
    const point3 = new Singleton("javascript");
    const point4 = new Singleton("php");
    point3.getName(); // javascript
    point4.getName(); // php
    console.log(point3 === point4); // false
    ```

-   透明单例实现（可以通过 new 创建的就是透明单例）

    ```js
    class Singleton {
        // 静态属性
        static instance = null;
        constructor(name) {
            if (Singleton.instance) return Singleton.instance;
            this.name = name;
            return (Singleton.instance = this);
        }
        getName() {
            console.log(this.name);
        }
    }
    const point1 = new Singleton("javascript");
    const point2 = new Singleton("php");
    point1.getName(); // javascript
    point2.getName(); // javascript
    console.log(point1 === point2); // true
    ```

-   代理模式单例

    ```js
    class Singleton {
        constructor(name) {
            this.name = name;
        }
        getName() {
            console.log(this.name);
        }
    }

    let proxySingleton = (function () {
        var instance = null;
        return function (name) {
            if (!instance) {
                instance = new Singleton(name);
            }
            return instance;
        };
    })();
    const point1 = new proxySingleton("javascript");
    const point2 = new proxySingleton("java");
    point1.getName(); // javascript
    point2.getName(); // javascript
    console.log(point1 === point2); // ture
    ```

---

### 4.策略模式

策略模式定义了一系列的算法，把它们一个个封装起来，并且使它们可以互相替换。策略模式的重心不是如何实现算法，而是如何组织、调用这些算法，从而让程序结构更灵活、可维护、可扩展。

> 优点：多重条件语句不易维护，而使用策略模式可以避免使用多重条件语句。（解决 if 嵌套问题）

> 缺点：
>
> > 1.客户端必须理解所有策略算法的区别，以便适时选择恰当的算法类。
>
> > 2.策略模式造成很多的策略类。

#### 策略模式的通俗理解

现在我们有了一个需求，根据不同国家的人员，进行不同页面语言的设置

```js
/*
 * 基本需求：假设我们的网站针对3类国家人员进行不同语言的设置
 * 人员分为：1.中国人，2.美国人，3.法国人
 */

//通常我们会用if去进行判断
const peopleComeFrom = "chinese";

if (people === "chinese") {
    console.log("中文设置");
} else if (people === "americans") {
    console.log("英语设置");
} else if (people === "french") {
    console.log("法语设置");
}
//控制台打印 -> 中文设置

//我们来进行简单的策略模式来优化这里
const settingLanguage = {
    chinese() {
        console.log("中文设置");
    },
    americans() {
        console.log("英语设置");
    },
    french() {
        console.log("法语设置");
    },
};
//调用
settingLanguage[peopleComeFrom](); // 中文设置
```

**解决多重嵌套条件业务**:这个时候我们又多了一个需求，在设置语言的基础上，我们针对不同年龄段的人去推荐不同的广告，

```js
/*
 * 基本需求：假设我们的网站针对3类国家人员进行不同语言的设置
 * 人员分为：1.中国人，2.美国人，3.法国人
 * 现在又加了个需求根据不同年龄段来再次进行页面的广告推送(青年，中年，老年)
 */

//传统方法可能是多层if嵌套;
const people = "americans";
const age = "elderly"; // 青年:youth , 中年:middleAged , 老年:elderly
if (people === "chinese") {
    if (age === "youth") {
        console.log("中文设置，青年广告");
    } else if (age === "middleAged") {
        console.log("中文设置，中年广告");
    } else if (age === "elderly") {
        console.log("中文设置，老年广告");
    }
} else if (people === "americans") {
    if (age === "youth") {
        console.log("英语设置，青年广告");
    } else if (age === "middleAged") {
        console.log("英语设置，中年广告");
    } else if (age === "elderly") {
        console.log("英语设置，老年广告");
    }
} else if (people === "french") {
    if (age === "youth") {
        console.log("法语设置，青年广告");
    } else if (age === "middleAged") {
        console.log("法语设置，中年广告");
    } else if (age === "elderly") {
        console.log("法语设置，老年广告");
    }
}
```

看到上面的代码是不是已经快窒息了？这是个什么东西 `if 嵌套 if`，可能真实的需求不止 3 个国家的人，且越来越多的条件加入的同时，造成代码的可读性、可维护性、可迭代性急速下降，虽然上述代码格式化之后，看起来倒还是很工整的。这个时候我们就可以利用策略模式结合 ES6 的 `Map` 来进行优化

```js
//对算法进行分类
const views = () => {
    const map = new Map([
        [
            {
                people: "chinese",
                age: "youth",
            },
            () => {
                console.log("中文设置，青年广告");
            },
        ],
        [
            {
                people: "chinese",
                age: "middleAged",
            },
            () => {
                console.log("中文设置，中年广告");
            },
        ],
        [
            {
                people: "chinese",
                age: "elderly",
            },
            () => {
                console.log("中文设置，老年广告");
            },
        ],
        [
            {
                people: "americans",
                age: "youth",
            },
            () => {
                console.log("英语设置，青年广告");
            },
        ],
        [
            {
                people: "americans",
                age: "middleAged",
            },
            () => {
                console.log("英语设置，中年广告");
            },
        ],
        [
            {
                people: "americans",
                age: "elderly",
            },
            () => {
                console.log("英语设置，老年广告");
            },
        ],
        [
            {
                people: "french",
                age: "youth",
            },
            () => {
                console.log("法语设置，青年广告");
            },
        ],
        [
            {
                people: "french",
                age: "middleAged",
            },
            () => {
                console.log("法语设置，中年广告");
            },
        ],
        [
            {
                people: "french",
                age: "elderly",
            },
            () => {
                console.log("法语设置，老年广告");
            },
        ],
    ]);
    return map;
};

//根据参数调取不同的算法
const linkView = (people, age) => {
    let view = [...views()].filter(
        ([key, value]) => key.people === people && key.age === age
    );
    view.forEach(([key, fn]) => fn());
};

//调用
linkView("americans", "youth"); // 调用方法，进行传参数 打印：英语设置，青年广告
```

如果再有新增的规则，我们可以放在 map 里面进行新增对应规则与方法，减少条件嵌套地狱出现，并且逻辑会更加清晰。但实际情况中还可以对类似的方法进行合并，逻辑会更加清晰。

**解决多重嵌套条件地狱**：在这个的基础上，我们有又新增了一个判断，根据用户选择金额的比来精准投放广告，这个时候你将体会到 if 语句的嵌套地狱模式

```js
/*
 * 基本需求：假设我们的网站针对3类国家人员进行不同语言的设置
 * 人员分为：1.中国人，2.美国人，3.法国人
 * 现在又加了个需求根据不同年龄段来再次进行页面的广告推送(青年，中年，老年)
 * 我们又再次加入需求，根据用户选择金额的数值来精准投放广告(0-10000,10000-30000,30000以上)
 */

const people = "americans";
const age = "youth"; // 青年:youth , 中年:middleAged , 老年:elderly
const money = 22222;
if (people === "chinese") {
    if (age === "youth") {
        if (0 < money && money < 10000) {
            console.log("中文设置，青年广告，金额0至10000");
        } else if (money < 30000) {
            console.log("中文设置，青年广告，金额10000至30000");
        } else {
            console.log("中文设置，青年广告，金额30000以上");
        }
    } else if (age === "middleAged") {
        if (0 < money && money < 10000) {
            console.log("中文设置，中年广告，金额0至10000");
        } else if (money < 30000) {
            console.log("中文设置，中年广告，金额10000至30000");
        } else {
            console.log("中文设置，中年广告，金额30000以上");
        }
    } else if (age === "elderly") {
        if (0 < money && money < 10000) {
            console.log("中文设置，老年广告，金额0至10000");
        } else if (money < 30000) {
            console.log("中文设置，老年广告，金额10000至30000");
        } else {
            console.log("中文设置，老年广告，金额30000以上");
        }
    }
} else if (people === "americans") {
    if (age === "youth") {
        if (0 < money && money < 10000) {
            console.log("英语设置，青年广告，金额0至10000");
        } else if (money < 30000) {
            console.log("英语设置，青年广告，金额10000至30000");
        } else {
            console.log("英语设置，青年广告，金额30000以上");
        }
    } else if (age === "middleAged") {
        if (0 < money && money < 10000) {
            console.log("英语设置，中年广告，金额30000以上");
        } else if (money < 30000) {
            console.log("英语设置，中年广告，金额30000以上");
        } else {
            console.log("英语设置，中年广告，金额30000以上");
        }
    } else if (age === "elderly") {
        if (0 < money && money < 10000) {
            console.log("英语设置，老年广告，金额30000以上");
        } else if (money < 30000) {
            console.log("英语设置，老年广告，金额30000以上");
        } else {
            console.log("英语设置，老年广告，金额30000以上");
        }
    }
} else if (people === "french") {
    if (age === "youth") {
        if (0 < money && money < 10000) {
            console.log("法语设置，青年广告，金额0至10000");
        } else if (money < 30000) {
            console.log("法语设置，青年广告，金额10000至30000");
        } else {
            console.log("法语设置，青年广告，金额30000以上");
        }
    } else if (age === "middleAged") {
        if (0 < money && money < 10000) {
            console.log("法语设置，中年广告，金额0至10000");
        } else if (money < 30000) {
            console.log("法语设置，中年广告，金额10000至30000");
        } else {
            console.log("法语设置，中年广告，金额30000以上");
        }
    } else if (age === "elderly") {
        if (0 < money && money < 10000) {
            console.log("法语设置，老年广告，金额0至10000");
        } else if (money < 30000) {
            console.log("法语设置，老年广告，金额10000至30000");
        } else {
            console.log("法语设置，老年广告，金额30000以上");
        }
    }
}

//打印结果为：英语设置，青年广告，金额10000至30000
```

现在内心看到这些代码是不是内心一万只草泥马奔腾而过？这是个什么东西？？？这是个什么鬼东西，现在是不是只想跑路，或者打死这样写代码的哥们。

我们来用策略模式进行一下优化

```js
//第一步，我们已经知道金额是有3个档次，所以我们把金额提取出来单独写个方法
const hasMoney = (money) => {
    let type;
    if (0 < money && money < 10000) type = 1;
    //0-10000
    else if (money < 30000) type = 2;
    //10000-30000
    else type = 3; // 30000以上
    return type;
};

//第二部利用ES6的map
const views = () => {
    const map = new Map([
        //中国
        [
            {
                people: "chinese",
                age: "youth",
                hasMoney: 1,
            },
            () => {
                console.log("中文设置，青年广告,金额0至10000");
            },
        ],
        [
            {
                people: "chinese",
                age: "youth",
                hasMoney: 2,
            },
            () => {
                console.log("中文设置，青年广告,金额10000至30000");
            },
        ],
        [
            {
                people: "chinese",
                age: "youth",
                hasMoney: 3,
            },
            () => {
                console.log("中文设置，青年广告,金额30000以上");
            },
        ],

        [
            {
                people: "chinese",
                age: "middleAged",
                hasMoney: 1,
            },
            () => {
                console.log("中文设置，中年广告,金额0至10000");
            },
        ],
        [
            {
                people: "chinese",
                age: "middleAged",
                hasMoney: 2,
            },
            () => {
                console.log("中文设置，中年广告,金额10000至30000");
            },
        ],
        [
            {
                people: "chinese",
                age: "middleAged",
                hasMoney: 3,
            },
            () => {
                console.log("中文设置，中年广告,金额30000以上");
            },
        ],

        [
            {
                people: "chinese",
                age: "elderly",
                hasMoney: 1,
            },
            () => {
                console.log("中文设置，老年广告,金额0至10000");
            },
        ],
        [
            {
                people: "chinese",
                age: "elderly",
                hasMoney: 2,
            },
            () => {
                console.log("中文设置，老年广告,金额10000至30000");
            },
        ],
        [
            {
                people: "chinese",
                age: "elderly",
                hasMoney: 3,
            },
            () => {
                console.log("中文设置，老年广告,金额30000以上");
            },
        ],
        //美国
        [
            {
                people: "americans",
                age: "youth",
                hasMoney: 1,
            },
            () => {
                console.log("英语设置，青年广告,金额0至10000");
            },
        ],
        [
            {
                people: "americans",
                age: "youth",
                hasMoney: 2,
            },
            () => {
                console.log("英语设置，青年广告,金额10000至30000");
            },
        ],
        [
            {
                people: "americans",
                age: "youth",
                hasMoney: 3,
            },
            () => {
                console.log("英语设置，青年广告,金额30000以上");
            },
        ],

        [
            {
                people: "americans",
                age: "middleAged",
                hasMoney: 1,
            },
            () => {
                console.log("英语设置，中年广告，金额0至10000");
            },
        ],
        [
            {
                people: "americans",
                age: "middleAged",
                hasMoney: 2,
            },
            () => {
                console.log("英语设置，中年广告，金额10000至30000");
            },
        ],
        [
            {
                people: "americans",
                age: "middleAged",
                hasMoney: 3,
            },
            () => {
                console.log("英语设置，中年广告，金额30000以上");
            },
        ],

        [
            {
                people: "americans",
                age: "elderly",
                hasMoney: 1,
            },
            () => {
                console.log("英语设置，老年广告，金额0至10000");
            },
        ],
        [
            {
                people: "americans",
                age: "elderly",
                hasMoney: 2,
            },
            () => {
                console.log("英语设置，老年广告，金额10000至30000");
            },
        ],
        [
            {
                people: "americans",
                age: "elderly",
                hasMoney: 3,
            },
            () => {
                console.log("英语设置，老年广告，金额30000以上");
            },
        ],
        //法国
        [
            {
                people: "french",
                age: "youth",
                hasMoney: 1,
            },
            () => {
                console.log("法语设置，青年广告，金额0至10000");
            },
        ],
        [
            {
                people: "french",
                age: "youth",
                hasMoney: 2,
            },
            () => {
                console.log("法语设置，青年广告，金额10000至30000");
            },
        ],
        [
            {
                people: "french",
                age: "youth",
                hasMoney: 3,
            },
            () => {
                console.log("法语设置，青年广告，金额30000以上");
            },
        ],

        [
            {
                people: "french",
                age: "middleAged",
                hasMoney: 1,
            },
            () => {
                console.log("法语设置，中年广告，金额0至10000");
            },
        ],
        [
            {
                people: "french",
                age: "middleAged",
                hasMoney: 2,
            },
            () => {
                console.log("法语设置，中年广告，金额10000至30000");
            },
        ],
        [
            {
                people: "french",
                age: "middleAged",
                hasMoney: 3,
            },
            () => {
                console.log("法语设置，中年广告，金额30000以上");
            },
        ],

        [
            {
                people: "french",
                age: "elderly",
                hasMoney: 1,
            },
            () => {
                console.log("法语设置，老年广告，金额0至10000");
            },
        ],
        [
            {
                people: "french",
                age: "elderly",
                hasMoney: 2,
            },
            () => {
                console.log("法语设置，老年广告，金额10000至30000");
            },
        ],
        [
            {
                people: "french",
                age: "elderly",
                hasMoney: 3,
            },
            () => {
                console.log("法语设置，老年广告，金额30000以上");
            },
        ],
    ]);
    return map;
};

const linkView = (people, age, hasMoney) => {
    let view = [...views()].filter(
        ([key, value]) =>
            key.people === people &&
            key.age === age &&
            key.hasMoney === hasMoney
    );

    view.forEach(([key, fn]) => fn());
};

linkView("french", "middleAged", hasMoney(222222)); //打印:法语设置，中年广告，金额30000以上
```

上述就是将两个策略拆开再组合，可以使条件逻辑更加清晰，但是从上述例子也能看出，策略模式在使用过程中并不能减少很多的代码量，并且策略越多，拆分组合的过程就会越复杂，所以的使用过程中要合理运用。

---

### 5.适配器模式

在实际生活中，也存在适配器的使用场景，比如：港式插头转换器、电源适配器和 USB 转接口。**而在软件工程中，适配器模式的作用是解决两个软件实体间的接口不兼容的问题。** 使用适配器模式之后，原本由于接口不兼容而不能工作的两个软件实体就可以一起工作。

```js
/*
 * 现在我们有个需求是通过地图来定位，这个时候引入了三个地图定位的第三方sdk
 */

const baiduMap = {
    show: () => {
        console.log("百度地图初始化了");
    },
};

const googleMap = {
    show: () => {
        console.log("谷歌地图初始化了");
    },
};

const tencentMap = {
    create: () => {
        console.log("腾讯地图初始化了");
    },
};

//做适配
const adapter = {
    show: () => {
        return tencentMap.create();
    },
};

//初始化地图调用
const renderMap = function (map) {
    if (map.show instanceof Function) map.show();
    else throw Error("不存在show方法");
};

renderMap(baiduMap);
renderMap(googleMap);
renderMap(tencentMap); // 不存在show，因为腾讯地图的方法是create，但是我们也想调用怎么办呢，就得用到适配器

renderMap(adapter); // 腾讯地图初始化了 这样就能统一调用了
```

适配器模式在 JS 中的使用场景很多，在参数的适配上，有许多库和框架都使用适配器模式；数据的适配在解决前后端数据依赖上十分重要。但是适配器模式本质上是一个亡羊补牢的模式，它解决的是现存的两个接口之间不兼容的问题，你不应该在软件的初期开发阶段就使用该模式；如果在设计之初我们就能够统筹的规划好接口的一致性，那么适配器就应该尽量减少使用。

---

### 5.模式
