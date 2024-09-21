import logo from '../logo.svg';
import app from '../App'

function Navbar() {
    return (
        <div>
            <nav className='flex gap-3'>
                <img src={logo} className="App-logo w-40" alt="logo" />
                <button><a href={app}>Login</a></button><br></br>
                <button><a href={app}>Register</a></button>
            </nav>
        </div>
    );
}

export default Navbar;
