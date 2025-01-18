import { useEffect, useState } from 'react'

function useFetch(url:string) {
    const [post , setPost] = useState({});
    const [loading , setLoading] = useState(true)
    console.log(url)
    async function getPosts() {
      const response = await fetch(url);
      const json = await response.json();
      setPost(json);
      setLoading(false)  
    }
    useEffect(()=>{
        const timer = setInterval(()=> {
            getPosts();
        } , 10000)
        return () => {
            clearInterval(timer) ;
        }
    },[url])
    return {
      post ,
      loading
    }
  }

export default useFetch