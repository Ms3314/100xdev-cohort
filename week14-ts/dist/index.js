"use strict";
let x = 122;
console.log(x);
function Sami(val) {
    return `Hello ${val}`;
}
Sami(3322);
function isLegal(age) {
    if (age > 18) {
        return 'U are legal';
    }
    else {
        return 'U are not legal';
    }
}
// () this things tells that it is of type function and this tells => its return type is number 
function delayedCall(fn) {
    setTimeout(fn, 3000);
}
delayedCall(function sayHello() {
    console.log("Helloo");
    return 112222;
});
function sum(a, b) {
    if (typeof a === "number" || typeof b === "number") {
        return a + b;
    }
    else {
        return String(a) + String(b);
    }
}
let t = {
    name: 'sami',
    age: 19,
    department: "Accounts"
};
