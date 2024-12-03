import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import placeholderLogo from "../assets/placeholder_logo.png";
import { getMyUsername } from "../services/users.js";
import { useState, useEffect } from "react";
import "./NavBar.css"


export function NavBar() {
    const [username, setUsername] = useState("")
    useEffect(() => {
        const token = localStorage.getItem("token")
        getMyUsername(token)
        .then((data) => {
            setUsername(data.username)
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    return(
        <>
        <nav className="navbar">
            <img width="70rem" height="70rem" src={placeholderLogo}></img>
            {/* The line below will only show the profile link if the username is not an empty string */}
            {username !== "" && (<Link className="nav-link" to={`/profile/${username}`}>Profile</Link>)}
            <Link className="nav-link" to="/posts">Feed</Link>
            <LogoutButton/>
        </nav>
        </>
    );
}