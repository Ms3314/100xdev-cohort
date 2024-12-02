type Person = {
    name : string ,
    Permissions : string 
}
type Admin = {
    name : string ,
    age : number ,
    admincode : number 
}

type AdminorUser = Admin | Person // this is like an intersection for both Admin and a personn

function MoodAnalyser (x : AdminorUser) {
    if (x.age != undefined) {
        return `Hello ${x.age}`
    }
}



