import { useState } from "react"
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../styles/components/Navbar.css';

export default function Navbar() {
    const location = useLocation();
    const showNavbar = location.pathname !== "/login" && location.pathname !== "/register";

    //const [showNavbar, setShowNavbar] = useState(false);

    return(
        <>
            {showNavbar && (
            <ul className="navbar">
                <li className="navbar-left">
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                    <img src="/favicon.ico" alt="Pokéball logo" />
                    </NavLink>
                </li>
                <li className="navbar-center">
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
                </li>
                <li className="navbar-center">
                    <NavLink to="/search" className={({ isActive }) => (isActive ? "active" : "")}>Search</NavLink>
                </li>
                <li className="navbar-center">
                    <NavLink to="/deck" className={({ isActive }) => (isActive ? "active" : "")}>Pokédex</NavLink>
                </li>
            </ul>
            )}
        </>
    );
}