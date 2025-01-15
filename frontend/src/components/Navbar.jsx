
import useUser from "../contexts/User/UserContext";



function Navbar() {
    const { user, signout } = useUser();
  return (
   <div className="bg-[#343A40] text-white flex justify-between items-center p-[1.2rem] px-[2.4rem] shadow-md">
        <h1 className="text-[1.6rem] font-medium">Welcome, {user.username}</h1>
        <button className="bg-[#6C757D] text-white border-none p-[0.6rem] px-[1.2rem] rounded-[8px] cursor-pointer transition-all hover:bg-[#495057]" 
        onClick={signout}>
          Logout
        </button>
      </div>
  )
}

export default Navbar