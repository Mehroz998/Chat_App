import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { setAuthUser, setSelectedUser} from "../redux/userSlice";

const Navbar = () => {
  const dispatch = useDispatch()
  const {authUser , selectedUser} = useSelector(store=>store.user)
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      let res = await fetch("http://localhost:8080/api/v1/user/logout");
      res = await res.json();
      toast.success(res.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/login')
      dispatch(setAuthUser(null))
      dispatch(setSelectedUser(null))
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`navbar bg-base-100 justify-between px-6 lg:rounded-t-lg sm:flex ${selectedUser&&'hidden'}`} >
      <h1 className="text-black font-bold text-2xl">{authUser?.name}</h1>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-12 rounded-full">
              <img
                alt="ptofile"
                src={authUser?.profilePhoto}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black"
          >
            <li>
              <Link onClick={logoutHandler}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
