interface PropType {
    placeholder : string ,
}

export function TextInput({
    placeholder , 
}:PropType) {
    return (
        <>
        <input type="text" placeholder={placeholder} className="p-"  />
        </>
    )
}