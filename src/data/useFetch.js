import { useState, useEffect } from "react";


export function useFetch() {
    const [data , setData] = useState(null);
    useEffect(()=>{
        fetch(url, hea)
        .then((Response)=> Response.json())
        .then((data)=> setData(data))
    },[])

    return {data};
}