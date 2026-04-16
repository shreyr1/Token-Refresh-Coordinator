
import { Link, useLocation } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'

const Sidebar = () => {
    const location = useLocation();
    
    return (
        <div className="w-64 h-full bg-black border-r border-zinc-800 flex flex-col gap-2 text-white px-4 py-9 gap-4">

            <Link
                to="/workspace/display"
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm font-medium text-md text-white hover:text-black hover:bg-white  
            `}
            >
                <FaUser />
                Display Users
            </Link>

            <Link
                to="/workspace/system"
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm font-medium text-md text-white hover:text-black hover:bg-white`}
            >
                <FaUser />
                System Design
            </Link>

        </div>
    )
}

export default Sidebar