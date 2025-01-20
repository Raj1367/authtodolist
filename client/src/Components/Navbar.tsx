import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../Zustand/UserStore';

const Navbar = () => {
    const { pathname } = useLocation();
    const { user, logout } = useUserStore();

    if (pathname === '/login' || pathname === '/signup') {
        return null;
    }

    return (
        <div className="h-[60px] bg-sky-200 shadow-sm flex items-center px-4 sm:px-6 md:px-8 py-2">
            <div className="flex justify-between w-full items-center">
                {/* Logo */}
                <h5 className="font-semibold text-lg sm:text-xl text-gray-500">
                    TodoList
                </h5>

                {/* User Info and Actions */}
                <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
                    <div className="hidden sm:block text-xs sm:text-sm bg-yellow-200 px-3 sm:px-5 py-1 rounded-md shadow-sm text-gray-500">
                        <p>
                            <span className="font-semibold">User:</span> {user?.username || 'Guest'}
                        </p>
                        <p>
                            <span className="font-semibold">Role:</span> {user?.role || 'No role'}
                        </p>
                    </div>
                    {user?._id ? (
                        <button
                            onClick={logout}
                            className="px-3 py-1 sm:px-4 rounded-md font-semibold text-gray-600 bg-pink-200 hover:bg-pink-300 shadow-md"
                        >
                            <Link to="/login">Logout</Link>
                        </button>
                    ) : (
                        <Link to="/login">
                            <button className="px-3 py-1 sm:px-4 rounded-full text-gray-600 bg-yellow-200 hover:bg-yellow-300">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
