import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light">
			<div className="container">
				<Link to="/">
					<button className="btn btn-outline-light me-3">Home</button>
				</Link>
				<div className="d-flex justify-content-end">
				<div>
					<Link to="/login">
						<button className="btn btn-outline-light me-3">Login</button>
					</Link>
				
					<Link to="/signup">
						<button className="btn btn-outline-light">Signup</button>
					</Link>
				</div>
			</div>
			</div>
			
		</nav>
	);
};
