import react, {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import UploadPost from "./UploadPost";
import Posts from "./Posts";
import { database } from "../firebase";


export default function Feed() {

    const [userData, setUserData] = useState();

    const navigate = useNavigate();
    const { logout,user } = useContext(AuthContext);


    useEffect(()=>{
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
            setUserData(snapshot.data());
        })
        return ()=> {unsub();}
    }, [user]);

    const handleLogout = async () => {
        const userObj = await logout();
        console.log(userObj);
        navigate("/login");

    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div className="feed" style={{ width: "50%" }}>
                <h1>Welcome to Feed</h1>
                <button onClick={handleLogout}>logout</button>
            </div>
            <UploadPost userData={userData}/>
            <Posts userData={userData}/>
        </div>);
}