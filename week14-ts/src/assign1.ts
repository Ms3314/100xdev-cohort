type Person = {
    name : string ,
    Permissions : string 
}
type Admin = {
    name : string ,
    age : number ,
    admincode : number 
}

type AdminorUser = Admin | Person

function MoodAnalyser (x : AdminorUser) {
    return `Hello ${x.age}`
}



