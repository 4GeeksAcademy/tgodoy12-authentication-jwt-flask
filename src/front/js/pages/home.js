import React, { useContext } from "react";

import "../../styles/home.css";
import LoginForm from "../component/loginForm.jsx";

export const Home = () => {
	

	return (
		<div className="container mt-5">
			<div className="text-center">
				<h1>Acceder</h1>
			</div>
			<LoginForm/>

		</div>
	);
};
