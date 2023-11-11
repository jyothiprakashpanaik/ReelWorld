import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import Feed from './Components/Feed';
import Profile from './Components/Profile';
import ManageAccount from './Components/ManageAccount';
import SideNavBar from './Components/SideNavBar';
import { AuthContext } from './Context/AuthContext';
import { database } from './firebase';

function InternalRoutes() {
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
            <SideNavBar userData={userData} />
            <Routes>
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/manageaccount" element={<ManageAccount userData={userData} />} />
                <Route exact path="/" element={<Feed userData={userData} />} />
            </Routes>
        </>
    )
}

export default InternalRoutes