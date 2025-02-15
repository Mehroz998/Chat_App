import React from 'react'
import User from './User.jsx'
import {useSelector} from 'react-redux'
import useGetOtherUsers from '../hooks/useGetOtherUsers.jsx'

const Users = ({filters}) => {
  useGetOtherUsers()
  const {otherUsers} = useSelector(store=>store.user)
  if(!otherUsers) return
  return (
      <div className='overflow-auto'>
        {
          !filters?(
            otherUsers?.map((user)=>{
              return <User key={user._id} user={user}/>
            })
          ):(
            filters.map((user)=>{
              return <User key={user._id} user={user}/>
            })
          )
          
        }
    </div>
  )
}

export default Users