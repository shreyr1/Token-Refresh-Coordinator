import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="w-full h-auto bg-black flex py-5 px-8 justify-between items-center border-b border-zinc-800 ">
            <div className="flex items-center">
                <Link to="/" className="text-white flex items-center gap-2 hover:text-zinc-300 transition-color ">
                    <FaArrowLeft  />
                    <span>Back</span>
                </Link>
            </div>
            <div>
                <span className="text-white font-bold tracking-wider text-xl ">Admin Dashboard</span>
            </div>
           
        </div>
    )
}

export default Navbar
