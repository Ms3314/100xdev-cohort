let x = 122 ;
console.log(x);

function Sami (val : string | number ) {
    return `Hello ${val}`
}
Sami(3322)

function isLegal (age:number) {
    if (age > 18) 
        {
            return 'U are legal';
        }
    else {
        return 'U are not legal';
    }

}

// () this things tells that it is of type function and this tells => its return type is number 

function delayedCall (fn: () => number)  {
    setTimeout(fn, 3000);
}

delayedCall(function sayHello() {
    console.log("Helloo")
    return 112222
})

// basicaly interface aur type dono bhot similiar hai 

interface User {
    name : string ,
    age : number ,
}

// interfaces are always this object main hamesha it moslty liek a class based approach over here 

type UserType = {
    name : string ,
    age : number 
}

// type specialityyy ?? we need to fix this thing and see why this is not working 
type sumInput =  string | number ;
type sumInput1 = number

function sum(a:sumInput , b:sumInput):sumInput {
    if (typeof a === "number" || typeof b === "number")
        {
            return  a + b ;
        }
    else {
        return String(a) + String(b)
    }
}

type Manager =  {
    name : string ,
    age : number 
}

type Employee = {
    name : string ,
    department : string 
}

type teamLead = Manager & Employee

let t: teamLead =  {
    name : 'sami',
    age : 19,
    department : "Accounts"
}

