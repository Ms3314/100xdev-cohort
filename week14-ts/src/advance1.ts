interface User21 {
    id : string,
    name : string ,
    age : number ,
    email : string ,
    password : string
}
// const user222:User21 =  User.findOne({where:{email : "Samiuddin"}})

type UpdateProps = Pick<User21,'name' | 'age' | 'email'>

function updateUser (updatedProps : UpdateProps) {
    
}