import react from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import UploadPost from "./UploadPost";

export default function Feed() {

    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);
    
    const handleLogout = async () => {
        const userObj = await logout();
        console.log(userObj);
        navigate("/login");

    }
    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", width:"50%"}}>
            <h1>Feed</h1>
            <button onClick={handleLogout}>logout</button>
            <UploadPost/>
        </div>);
}