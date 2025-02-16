import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { setOtherUsers } from '../redux/userSlice'

const useGetOtherUsers = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchusers = async ()=>{
            try {
                let res = await fetch("https://outrageous-sisile-mehrozali-f62a59fb.koyeb.app/api/v1/user/",{credentials:'include'})
                res = await res.json()
                dispatch(setOtherUsers(res))
            } catch (error) {
                console.log(error)
            }
        }
        fetchusers()
    },[dispatch])
}

export default useGetOtherUsers