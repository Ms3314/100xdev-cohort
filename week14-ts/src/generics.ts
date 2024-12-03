function Returnfirst (x : (number | string)[]){
    return x[3]
}

// const h = Returnfirst([2,3,9,'DFHSDJF'])
// console.log(h.toLowerCase())

// function getFirstElement<T>(arr:T[]){
//     return arr[0]
// }

// const el = getFirstElement<string>(["sami",2])
// console.log(el.toLowerCase())

function identity<Type>(arg: Type): Type {
    return arg;
  }
   
//   let myIdentity: <Input>(arg: Input) => Input = identity;

let chicken: <gi>(arg:gi)=>gi = identity 
console.log(chicken<string>("Sami"))