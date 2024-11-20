import { useEffect, useState } from "react"

function useLoading() {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        setIsLoading(!isLoading);
    },[])
  return [isLoading]
}

export default useLoading;