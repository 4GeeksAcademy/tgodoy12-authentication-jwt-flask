import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation(); 
	const nav = useNavigate();

    const handleLogout = () => {
        actions.logout();
		nav("/")
    }

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link to="/">
                    <button className="btn btn-outline-light me-3">Home</button>
                </Link>
                <div className="d-flex justify-content-end">
                    {store.user ? (
                        <div>
                            {location.pathname === "/" && (
                                <Link to="/profile">
                                    <button className="btn btn-outline-light me-3">Go to my profile</button>
                                </Link>
                            )}
                            <button onClick={handleLogout} className="btn btn-outline-light me-3">Logout</button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login">
                                <button className="btn btn-outline-light me-3">Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn btn-outline-light me-3">Signup</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
