import "../style/appLayout.css";

import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";

export default function AppLayout() {
  const { user, isLoading, isAuthenticated, logout } = useAuth0();
  const { accessToken } = useAuthToken();
  //   const { accessToken, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      {/* <div className="title">
        <h1>My Movie Journal</h1>
      </div> */}
      <div className="header">
        <nav className="menu">
          <ul className="menu-list">
            <li>
              <Link to="/app">Profile</Link>
            </li>
            <li>
              <Link to="/app/journals">Journals</Link>
            </li>
            <li>
              <Link to="/app/ombd">OMBD Page</Link>
            </li>
            {/* <li>
              <Link to="/app/debugger">Auth Debugger</Link>
            </li> */}
            <li>
              {isAuthenticated ? (
                <button
                  className="exit-button"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  LogOut
                </button>
              ) : (
                <Link to="/app/login">Login</Link>
              )}
            </li>
          </ul>
        </nav>
        {/* <div>Welcome 👋 {user.name} </div> */}
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
