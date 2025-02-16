import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice'

const useGetMessages = () => {
    const {selectedUser} = useSelector(store=>store.user)
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchMessages =async ()=>{
        try {
            if (!selectedUser) return;
            let res = await fetch(`https://outrageous-sisile-mehrozali-f62a59fb.koyeb.app/api/v1/message/${selectedUser._id}`,{credentials:'include'})
            res = await res.json()
            dispatch(setMessages(res))
        } catch (error) {
            console.log(error)
        }
    } 
    fetchMessages()
  },[selectedUser])
}

export default useGetMessages