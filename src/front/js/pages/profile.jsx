import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getProfile();
        
    }, [actions]);

    return(
        <div className="container mt-5 text-center">
            <div>
                <h1 className="title">Profile</h1>
                {/* quier que la informacion del user se muestre aquí */}
                <p className="user-info">{store.profileData.email}</p>
                <p className="user-info">{store.profileData.name}</p>
                <p className="user-info">{store.profileData.bio}</p>
            </div>
        </div>
    )
}