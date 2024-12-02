function FindMax (x:number[]) {
    let max = -100000000 ;
    x.map((xn)=>{
        if (xn > max ) {
            max = xn ; 
        }
    })
    return max ;
}

let arr = [1,2,3,40,5,6]
// console.log()

interface Adress {
    city : string ,
    state : string ,
    pincode : number
}

interface User {
    name : string ,
    age : number ,
    adresses : Adress[]
    // this is like an array of adresses so basically it is like this 
}

let user23 : User =  {
    name :"Samiuddin",
    age :239048904 ,
    adresses :[ {
        city : "stridddng",
        state : "riddddng",
        pincode : 78978789,
    },
    {
        city : "stridddng",
        state : "riddddng",
        pincode : 78978789,
    },
    {
        city : "stridddng32",
        state : "riddddn33g",
        pincode : 78978733389,
    }
]
}

//////////////////////////////////////////////////////

interface User123 {
    firstname : string ,
    lastname : string ,
    age : number ,
}

function isLegalCheck (x:User123[]) {   
    let arr:any = []
    x.map((xn)=>{
        if (xn.age > 18 )
            {
                arr.push(xn)
            }
    })
    return arr;
}

let Cheetah:User123[] =  [
    {
    firstname : "string" ,
    lastname : "string" ,
    age : 120 ,
    }, 
    {
    firstname : "string" ,
    lastname : "string" ,
    age : 4 ,
    }, 
    {
    firstname : "string" ,
    lastname : "string" ,
    age : 6 ,
    }, 
]

console.log(isLegalCheck(Cheetah))

////////////////////////////////////////////

type A = {
    name : string 
}
type B = {
    age : number
}

type Lal = A | B // yaha dono bhi reh sakte but ak bhi raha toh chalta and this is unionss
type lalu = A & B // dono rehna zarurui hai and this is what we call intersection 
interface Lala extends A , B {} // this is similiar to intersection and it is achieved using an interface 



let Sami123:Lal = {
    name : "String",
    age : 323
}

// the error in both of the below 
//Type '{ name: string; }' is not assignable to type 'lalu'.
//Property 'age' is missing in type '{ name: string; }' but required in type 'B'.ts(2322)

// let dsnfn:lalu = {
//     name : "skdkla",
// }

// let Person23:Lala  = {
//     name : "fjkbfj" , 
// }
