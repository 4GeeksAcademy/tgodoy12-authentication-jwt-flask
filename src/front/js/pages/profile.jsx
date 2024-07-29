import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { actions } = useContext(Context);

    useEffect(() => {
        actions.getProfile();
    }, [])

    return(
        <div className="container">
            <div>
                <h1>Profile</h1>
                
            </div>
        </div>
    )
}