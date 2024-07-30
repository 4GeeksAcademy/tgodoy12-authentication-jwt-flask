import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getProfile();
    }, [])

    return(
        <div className="container mt-5">
            <div>
                <h1 className="title">Profile</h1>
                {/* quier que la informacion del user se muestre aquí */}
                <p className="user-info">Email: {store.profileData.email}</p>
                <p className="user-info">Name: {store.profileData.name}</p>
                <p className="user-info">Bio: {store.profileData.bio}</p>
            </div>
        </div>
    )
}