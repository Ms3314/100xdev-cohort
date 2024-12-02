function sum (a : number , b:number) {
    return a + b ;
}

console.log(sum(2,3))

interface Adress {
    city : string ,
    state : string ,
    pincode : number 
}

/////////////////////
// Interface can can other interfaces 
interface User {
    name : string ,
    age : number ,
    address? : Adress
}

interface Office {
    adress?:Adress
}

let Singer : User = {
    name : "Singer",
    age : 332,
    address : {
        city : "Barodo",
        state : "Indore",
        pincode : 89898
    }
}
// ///////////////

let Samuel: User = {
    name : "Samuel",
    age : 23,
}

interface People {
    name : string ,
    age : number ,
    isLegal() : boolean;
}

let Person : People = {
    name :  "Samiiii" , 
    age :  89 , 
    isLegal() {
        if (this.age > 18) {
            return true 
        } else {
            return false 
        }
    }

}

class Human implements People {
    name : string ;
    age : number ;
    gender : string ;
    constructor (name : string , age : number , gender : "Male" | "Female") {
        this.name = name ;
        this.age = age ;
        this.gender = gender
    }
    isLegal() {
        if (this.age > 18) {
            return true 
        } else {
            return false 
        }
    }
    // constructor (name : string ) {
    //     this.name = name ;
    // }

}

class Pikachu extends Human {
    constructor (name: string , age:number , gender:"Male" | "Female") {
        super(name , age , gender)

    }
}

// let greet = Person.greet()
// console.log(greet)
let Rahul = new Human("Rahul" , 23 , "Male")
console.log(Rahul.name)
console.log(Rahul.age)
console.log(Rahul.gender)

const j = new Human("Samii" , 32 , "Male")

/// diff between interrfaces and classes are that u can implimnt something in classes and thenu cant do the same thing dor types
/// default implimenataion can exist in the abstract class 

abstract class Username {
    name : string ;
    constructor (name : string) {
        this.name = name
    }

    abstract greet : () => string;
    hello() {
        return "Hello everybody"
    }
}

class Employye extends Username {
    name : string ;
    constructor (name : string) {
        super(name);
        this.name = name ;
    }
    // upar abstract main arrow ustemaal kare toh extends main bhi istemaal karna acha hai 
    greet = () => {
        return `Hello ${this.name}`
    }
} 


///// TYPESSSS 

type Saraaaa = {
    name : string ;
    age : number ; 
    islegal : () => boolean ;
}

// u can do unions and itersection in the types and not in the interface 

// Intersectionn 
type Gooduseeer =  {
    name : string ,
    gift : string 
};

type BadUser = {
    name : string ,
    ip : number 
}

type userrrr = Gooduseeer | BadUser

const user : userrrr = {
    name :"Sam",
    gift : "jdjb",
    ip : 394802948
}

