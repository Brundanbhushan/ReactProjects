import { LOGO_URL } from '../utils/constants'; 
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    const [btnName, setbtnName] = useState('LogIn');

    return (
    <div className="header">
         <div className="logo-container">
            <img className="logo" src={LOGO_URL}/>
        </div>
        <div className="nav-items">
            <ul>
                <li><Link to ="/">Home</Link></li>
                <li><Link to ="/about">About Us</Link></li>
                <li><Link to = "/contact">Contact Us</Link></li>
                <li onClick={() => {
                        btnName === 'LogIn'
                            ? setbtnName('LogOut')
                            : setbtnName('LogIn');
                    }}>
                    {btnName}</li>                    
            </ul>       
        </div>
    </div>
    );
};

export default Header;