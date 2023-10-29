import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import UploadPost from "./UploadPost";
import Posts from "./Posts";
import { database } from "../firebase";
import Navbar from "./Navbar";


export default function Feed() {

    const [userData, setUserData] = useState();

    const { user } = useContext(AuthContext);


    useEffect(() => {
        console.log("running use effect")
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
            setUserData(snapshot.data());
        })
        return () => { unsub(); }
    }, []);

    return (
        <>
            {userData && <>
                <Navbar userData={userData} />
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "90vh" }}>

                    <UploadPost userData={userData} />
                    <Posts userData={userData} />
                </div>
            </>
            }
        </>);
}