import React from "react";
import UploadPost from "./UploadPost";
import Posts from "./Posts";

export default function Feed({userData}) {

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "90vh" }}>
                <UploadPost userData={userData} />
                <Posts userData={userData} />
            </div>
        </>);
}