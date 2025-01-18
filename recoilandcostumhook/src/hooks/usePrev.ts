import { useEffect, useRef } from "react"

export const usePrev = (value : number) => {
    const ref = useRef<number | undefined>()
    useEffect(()=>{
        ref.current = value ;
    } , [value])

    return ref.current ;
}


// in React first we return then the useEFFECT WILL RUN 