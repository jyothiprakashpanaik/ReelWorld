import React, { useEffect, useState } from "react";
import {auth} from "../firebase";

export const AuthContext = React.createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password){
        console.log(email, password);
        return auth.createUserWithEmailAndPassword(email, password); 
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout(){
        return auth.signOut();
    }

    function password_reset(email){
        return auth.sendPasswordResetEmail(email);
    }

    function confirm_password_reset(oobCode, newPassword){
        return auth.confirmPasswordReset(oobCode, newPassword);
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return ()=>{
            unsub();
        }
    },[])

    const store = {
        user,
        signup,
        login,
        logout,
        password_reset,
        confirm_password_reset
    }

    return (
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )


}