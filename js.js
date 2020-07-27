const _privateData = Symbol("privateData");
class Foo {
    constructor(privateData, age) {
        this.age = age;
        this[_privateData] = privateData;
    }

    getPrivate() {
        return this[_privateData];
    }
}
