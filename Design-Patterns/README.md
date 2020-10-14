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

    工厂方法模式（又称为工厂模式，也叫 **_多态工厂模式_**，它属于类创建型模式。

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
