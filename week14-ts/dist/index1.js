"use strict";
function sum(a, b) {
    return a + b;
}
console.log(sum(2, 3));
let Singer = {
    name: "Singer",
    age: 332,
    address: {
        city: "Barodo",
        state: "Indore",
        pincode: 89898
    }
};
// ///////////////
let Samuel = {
    name: "Samuel",
    age: 23,
};
let Person = {
    name: "Samiiii",
    age: 89,
    isLegal() {
        if (this.age > 18) {
            return true;
        }
        else {
            return false;
        }
    }
};
class Human {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    isLegal() {
        if (this.age > 18) {
            return true;
        }
        else {
            return false;
        }
    }
}
class Pikachu extends Human {
    constructor(name, age, gender) {
        super(name, age, gender);
    }
}
// let greet = Person.greet()
// console.log(greet)
let Rahul = new Human("Rahul", 23, "Male");
console.log(Rahul.name);
console.log(Rahul.age);
console.log(Rahul.gender);
const j = new Human("Samii", 32, "Male");
/// diff between interrfaces and classes are that u can implimnt something in classes and thenu cant do the same thing dor types
/// default implimenataion can exist in the abstract class 
class Username {
    constructor(name) {
        this.name = name;
    }
    hello() {
        return "Hello everybody";
    }
}
class Employye extends Username {
    constructor(name) {
        super(name);
        // upar abstract main arrow ustemaal kare toh extends main bhi istemaal karna acha hai 
        this.greet = () => {
            return `Hello ${this.name}`;
        };
        this.name = name;
    }
}
const user = {
    name: "Sam",
    gift: "jdjb",
    ip: 394802948
};
