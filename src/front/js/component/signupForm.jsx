import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignupForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emptyFields, setEmptyFields] = useState("")
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleSingup = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setEmptyFields("Email and password fields are required")
            return;
        }
        
        let newAccount = actions.createAccount(email, password);
        if (newAccount) {
            navigate('/profile');
        }
    }

    return (
        <div className="w-50 mx-auto mt-5">
            {emptyFields && (<div className="alert alert-danger" role="alert">
                    {emptyFields}
            </div>)}
            <form onSubmit={handleSingup}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="d-flex">
                    <div className="me-3">
                        <button type="submit" className="btn btn-primary">Create account</button>
                    </div>
                    
                </div>
                
            </form>
        </div>
    )
}

export default SignupForm;