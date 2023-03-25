import React from 'react';
import { Link } from 'react-router-dom';
import { userLogin, userLogout, getCurrentUserName } from '../util/user-input/userLogin';

export default function UniversalNavBar() {
  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    const fetchUserName = async () => {
      const name = await getCurrentUserName();
      setUserName(name);
    };
    setTimeout(() => {
      fetchUserName();
    }, 200)
  }, []);

  const handleLogin = async () => {
    const name = await userLogin();
    setUserName(name);
  };

  const handleLogout = async () => {
    await userLogout();
    setUserName('');
  };

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
          <li className="nav-item">
            {userName ? <span className="nav-link">{userName}</span> : null}
          </li>
        </ul>

        {userName ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}

      </div>
    </nav>
  );
}
