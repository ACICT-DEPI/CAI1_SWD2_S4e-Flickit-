import { BsArrowLeft } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoChevronDown, IoPerson, IoLogOutOutline } from "react-icons/io5";
import { CgGames } from "react-icons/cg";
import { PiFilmSlateFill } from "react-icons/pi";
import { GiMeal } from "react-icons/gi";
import { MdOutlineEmojiFlags } from "react-icons/md";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Ensure this import is included

export const Slide = () => {
    const [open, setOpen] = useState(true);
    const [submenuOpen, setSubmenuOpen] = useState(null); 
    const [searchQuery, setSearchQuery] = useState(""); // State to store search input

    // Function to handle logout confirmation
    const handleLogout = () => {
        Swal.fire({
            title: 'Are You Sure?',
            text: 'Log out!',
            icon: 'warning', // Optional: add an icon
            showCancelButton: true, // Show cancel button
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel' // Optional: add cancel button text
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('username');
                window.location.href = '/login';    
            }
        });
    };

    const Menus = [
        { title: "Dashboards", path:'/Admin', icon: <MdDashboard /> },
        { title: "Users", path: "/Users", icon: <IoPerson /> },
        {
            title: "Games",
            icon: <CgGames />,
            submenu: true,
            submenuItems: [
                { title: "Films", path: "/Film", icon: <PiFilmSlateFill /> },
                { title: "Meals", path: "/Meals", icon: <GiMeal /> },
                { title: "Country & Flags", path: "/flags", icon: <MdOutlineEmojiFlags /> },
            ],
        },
        { title: "Profile", path: "/profile", spacing: true, icon: <CgProfile /> },
        { title: "Logout", path: "#", icon: <IoLogOutOutline />, onClick: handleLogout }, // Changed path to "#" and added onClick
    ];

    // Filtered menus based on search input
    const filteredMenus = Menus.filter(menu =>
        menu.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Main menu filter
        (menu.submenu && menu.submenuItems.some(sub => sub.title.toLowerCase().includes(searchQuery.toLowerCase()))) // Submenu filter
    );

    const handleSubmenuToggle = (index) => {
        setSubmenuOpen(submenuOpen === index ? null : index);
    };

    return (
        <div className="flex">
            <div
                className={`bg-gradient-to-r from-violet-800 via-sky-600 via-30% to-fuchsia-500 max-h-full p-5 pt-8 ${
                    open ? "w-72" : "w-20"
                } duration-300 relative`}
            >
                <BsArrowLeft
                    className={`bg-white text-purple text-xl rounded-full absolute -right-3 top-9 border border-purple cursor-pointer ${
                        !open && "rotate-180"
                    }`}
                    onClick={() => setOpen(!open)}
                />

                <div className="inline-flex">
                    <CgProfile
                        className={`text-fuchsia-900 text-3xl cursor-pointer rounded block float-left mr-2 duration-300 ${
                            open && "rotate-[360deg]"
                        }`}
                    />
                    <Link
                        to="/Admin"
                        className={`text-indigo-900 origin-left font-medium text-2xl duration-300 ${
                            !open && "scale-0"
                        }`}
                    >
                        Admin
                    </Link>
                </div>

                <div
                    className={`flex items-center rounded-md bg-transparent bg-indigo-300 mt-6 ${
                        !open ? "px-2.5" : "px-4"
                    } py-2`}
                >
                    <FaSearch className={`text-lg block float-left cursor-pointer ${open && "mr-2"}`} />
                    <input
                        type={"search"}
                        placeholder="Search"
                        value={searchQuery} // Bind the input to the state
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
                        className={`text-base bg-transparent ml-2 w-full text-purple focus:outline-none ${
                            !open && "hidden"
                        }`}
                    />
                </div>

                <ul className="pt-2">
                    {filteredMenus.map((menu, index) => (
                        <div key={index}>
                            <li
                                className={`text-indigo-950 text-l flex items-center gap-x-4 cursor-pointer p-2 hover:bg-indigo-300 rounded-md ${
                                    menu.spacing ? "mt-9" : "mt-2"
                                }`}
                            >
                                <Link to={menu.path || "#"} className="flex items-center gap-x-4 w-full" onClick={menu.onClick}>
                                    <span className="text-2xl block float-left">
                                        {menu.icon ? menu.icon : <MdDashboard />}
                                    </span>
                                    <span
                                        className={`font-medium text-base flex-1 duration-200 ${!open && "hidden"}`}
                                    >
                                        {menu.title}
                                    </span>
                                </Link>
                                {menu.submenu && open && (
                                    <IoChevronDown
                                        className={`${submenuOpen === index && "rotate-180"}`}
                                        onClick={() => handleSubmenuToggle(index)}
                                    />
                                )}
                            </li>

                            {menu.submenu && submenuOpen === index && open && (
                                <ul>
                                    {menu.submenuItems.filter(sub =>
                                        sub.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filter submenu items based on search
                                    ).map((submenuItem, subIndex) => (
                                        <li
                                            key={subIndex}
                                            className={`text-indigo-950 text-l flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-indigo-300 rounded-md mt-2`}
                                        >
                                            <Link to={submenuItem.path || "#"} className="flex items-center gap-x-4 w-full">
                                                {submenuItem.icon ? submenuItem.icon : <MdDashboard />}
                                                {submenuItem.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};
