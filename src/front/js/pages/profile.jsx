import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState(store.profileData.name || "");
    const [bio, setBio] = useState(store.profileData.bio || "");

    useEffect(() => {
        actions.getProfile();
        
    }, []);

    useEffect(() => {
        setName(store.profileData.name || "");
        setBio(store.profileData.bio || "");
    }, [store.profileData]);

    const handleUpdateProfile = () => {
        actions.updateProfile(name, bio);
    };

    return(
        <div className="container mt-5 text-center">
            <div>
            <img src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
            />
            </div>
                {/* quier que la informacion del user se muestre aca */}
                
                <p className="user-info">Email: {store.profileData.email}</p>
                {store.profileData.name == null ? (<div>
                    <label>
                        Name:
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </label>
                    <button onClick={handleUpdateProfile}>Update Profile</button>
                </div>) :
                (<p className="user-info">{store.profileData.name}</p>)
                }
                
                {store.profileData.bio == null ? (<div>
                    <label>
                        Bio:
                        <input 
                            type="text" 
                            value={bio} 
                            onChange={(e) => setBio(e.target.value)} 
                        />
                    </label>
                    <button onClick={handleUpdateProfile}>Update Profile</button>
                </div> 
                ) : (<p className="user-info">{store.profileData.bio}</p>)}
                
                
                
        </div>
      
       
    )
}