'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {isAuth} from "../auth"

const Private = ({children}) => {
    const router = useRouter()
    useEffect(() => {
        if(!isAuth()){
            router.push('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return <>{children}</>
}

export default Private;