import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Home from "./Components/Home.jsx"
import Login from "./Components/Login.jsx"
import Signup from "./Components/Signup.jsx" 
import './App.css';
import { io } from "socket.io-client";
import { useEffect} from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { setSocket } from './redux/socketSlice.js';
import { setOnlineUsers } from './redux/userSlice.js';

const router = createBrowserRouter([
  {
    path:"/home",
    element:<Home/>
  },
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
])

function App() {
  const {authUser} = useSelector(store=>store.user)
  // const {socket} = useSelector(store=>store.socket)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(authUser){
      let socket = io('https://severe-annabell-mehrozali-9d0db8b7.koyeb.app',{
        query:{
          userId:authUser._id,
        }
      })
      dispatch(setSocket(socket))

      socket.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
      return ()=>{
        socket.close()
      }
    }
  },[authUser,dispatch])
  return (
    <div className="lg:p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
