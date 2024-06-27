import { NavLink } from 'react-router-dom';
import './Offline.css';

export default function Offline() {
    return (
        <div className='OfflinePage'>
            <div className="content">
                <h1>OFFLINE</h1>
                <h3>You are currently offline</h3>
                <p>You are not connected to the Internet. The page automatically reload when you get back online</p>
                <NavLink to='/'>Go to Home</NavLink>
            </div>
        </div>
    )
};
