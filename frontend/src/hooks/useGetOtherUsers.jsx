import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { setOtherUsers } from '../redux/userSlice'

const useGetOtherUsers = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchusers = async ()=>{
            try {
                let res = await fetch("http://localhost:8080/api/v1/user/",{credentials:'include'})
                res = await res.json()
                dispatch(setOtherUsers(res))
            } catch (error) {
                console.log(error)
            }
        }
        fetchusers()
    },[])
}

export default useGetOtherUsers