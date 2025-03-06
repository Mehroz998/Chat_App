import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { setOtherUsers } from '../redux/userSlice'
import { Url } from './Context/context'
import { useContext } from 'react'

const useGetOtherUsers = () => {
    const url = useContext(Url)
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchusers = async ()=>{
            try {
                let res = await fetch(`${url}/api/v1/user/`,{credentials:'include'})
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