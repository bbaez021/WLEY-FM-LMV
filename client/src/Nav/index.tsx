import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

const Nav = () => {
    return (
        <nav>
            <ul>
                <li><Link to ="/">Left</Link></li>
                <li><Link to="/list">Middle</Link></li>
                <li><Link to="/gallery">Right</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;