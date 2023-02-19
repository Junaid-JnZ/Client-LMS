import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import ('./Navbar.css')

const Navbar = () => {

    return (
        <nav className="navbar">
            <h1>  LMS </h1>
            <div className="link">
                <Link to = "/">Home</Link>
                <Link to = "/create">New Blog</Link>
            </div>
        </nav>
    );
}
 
export default Navbar