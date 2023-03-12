import { Link } from 'react-router-dom';
import { userLogin } from '../util/user-input/userLogin';

export default function UniversalNavBar() {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <Link className="navbar-brand mr-auto" to="/">WhyRC</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {/* <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                    </li> */}
                </ul>
                <button onClick={(e)=>{ userLogin(); }}>Login</button>
            </div>
        </nav>
    );
}