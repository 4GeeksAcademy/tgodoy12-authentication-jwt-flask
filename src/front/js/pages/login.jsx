import React, { useContext } from "react";
import { Context } from "../store/appContext";
import LoginForm from "../component/loginForm.jsx";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="text-center">
                <h1>Login</h1>
            </div>

            <LoginForm />
		</div>
	);
};
