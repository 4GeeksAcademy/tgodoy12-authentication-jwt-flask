import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const {store, actions} = useContext(Context);

	const handleLogout = () => {
		actions.logout();
	}

	return (
		<nav className="navbar navbar-light">
			<div className="container">
				<Link to="/">
					<button className="btn btn-outline-light me-3">Home</button>
				</Link>
				<div className="d-flex justify-content-end">
				<div>
					{store.authentication ? (
						<div>
						<Link to="/profile">
							<button onClick={handleLogout} className="btn btn-outline-light me-3">Go to my profile</button>
						</Link>
						<Link to="/">
							<button onClick={handleLogout} className="btn btn-outline-light me-3">Logout</button>
						</Link>
						</div>
					) : (
						<div>
						<Link to="/login">
							<button className="btn btn-outline-light me-3">Login</button>
						</Link>
						<Link to="/signup">
							<button className="btn btn-outline-light">Signup</button>
						</Link>
						</div>
					)}
					
				
					
				</div>
			</div>
			</div>
			
		</nav>
	);
};
