import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Users from "./Users.jsx";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { otherUsers } = useSelector((store) => store.user);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState("");
  const { selectedUser } = useSelector((store) => store.user);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!otherUsers) return; // ✅ Agar `otherUsers` null hai to function exit kar dein

    const filteredUsers = otherUsers.filter((user) =>
      user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      user?.username?.toLowerCase().includes(search.toLowerCase())
    );
    setFilters(filteredUsers);
  };

  useEffect(() => {
    if (!search) {
      setFilters(null); 
    }
  }, [search]);

  return (
    <div className={`${selectedUser?'hidden':'flex'} sm:flex flex-col p-4 w-full sm:w-auto`}>
      <form action="" className="flex gap-2 items-center justify-center" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="input input-bordered w-full max-w-xs text-black"
        />
        <button type="submit" className="btn bg-white">
          <IoSearch style={{ fontSize: "1.3em" }} />
        </button>
      </form>
      <div className="divider py-0 my-0"></div>
      <Users filters={filters} />
    </div>
  );
};

export default Sidebar;
