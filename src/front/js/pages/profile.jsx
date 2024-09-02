import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    // const [name, setName] = useState(store.profileData.name || "");
    // const [bio, setBio] = useState(store.profileData.bio || "");
 
    useEffect(() => {
        
        console.log(store.user)
    }, [store.user]);


    console.log(store.user);
    

    return(
        <div className="container mt-5 text-center">
            <div>
            <img src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
            />
            </div>
                {/* quier que la informacion del user se muestre aca */}
                
            <p className="user-info">Email: {store.user.email}</p>
          
                
                
        </div>
      
       
    )
}