import Nweet from "components/Nweet";
import { dbService, storageService } from "fbInstance";
import React, { useEffect, useState } from "react";
import NweetFactory from "components/NweetFactory";

const Home = ({userObj}) => {
    const [nWeets, setNweets] = useState([]);
    useEffect(() => {
        dbService
        .collection("nweets")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setNweets(nweetArray);
        })
    }, [])
    return (
        <div className="container">
            <NweetFactory userObj={userObj}></NweetFactory>
            <div style={{ marginTop: 30 }}>
                {nWeets.map((nweet, idx) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}></Nweet>
                ))}
            </div>
        </div>
    )
}
export default Home;