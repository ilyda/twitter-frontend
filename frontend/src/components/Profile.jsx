import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getIdTweets,getProfile } from "../api/tweetApi";
import { TweetCard } from "./TweetCard";
import { Avatar, Menu, MenuItem } from "@mui/material";
const Profile = () => {
const { userId } = useParams();// /user/:userId

  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const data = await getProfile(userId);
      setTweets(data);
    } catch (err) {
      console.log("profile fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [userId]);

  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto">

  {/* Profil Header */}
  <div className="bg-gray-100 h-32 rounded-b-2xl relative">
    <div className="absolute -bottom-4 left-4">
         <Avatar
          src={`https://ui-avatars.com/api/?name=${tweets.length > 0 ? tweets[0].user.username : "Kullanıcı"}`} 
        />
    </div>
  </div>

  {/* Kullanıcı bilgisi */}
  <div className="mt-12 px-4">
    <h2 className="text-xl font-bold">
      {tweets.length > 0 ? tweets[0].user.username : "Kullanıcı"}
    </h2>
    <p className="text-gray-500 text-sm">@{tweets.length > 0 ? tweets[0].user.username : "Kullanıcı"}</p>
    
  </div>

  {/* Tweet list */}
  <div className="mt-4">
    {tweets.length === 0 ? (
      <p className="text-center text-gray-500">Hiç tweet yok</p>
    ) : (
      tweets.map((tweet) => (
        <div key={tweet.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
          <TweetCard tweet={tweet} userId={userId} />
        </div>
      ))
    )}
  </div>

</div>
  );
};

export default Profile;