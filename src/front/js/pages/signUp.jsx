import React from "react";
import SignupForm from "../component/signupForm.jsx";

export const SignUp = () => {
    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1>Create Account</h1>
            </div>
            <SignupForm />
        </div>
    )
}