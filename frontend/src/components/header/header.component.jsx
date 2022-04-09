import React from 'react';
import './header.component.css';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <div>
            <div className="header">
                <h4 class="logo">SYN</h4>
                <div className="c__header">
                    <Link to="/login"><h5 className="header__signin">Sign In</h5></Link>
                    <Link to="/register"><h5 className="header__signup">Sign Up</h5></Link>
                </div>
            </div>
        </div>);
}

export default Header;
