// src/pages/TweetPage.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";
import TweetForm from "../components/TweetForm";
import TweetList from "../components/TweetList";

export default function TweetPage() {
  const [tweets, setTweets] = useState([]);

  const userId = 852;

  const fetchTweets = async () => {
    const res = await API.get(`/tweet/user/${userId}`);
    setTweets(res.data);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Fwitter</h2>

      <TweetForm userId={userId} onTweetCreated={fetchTweets} />

      <TweetList
        tweets={tweets}
        userId={userId}
        onRefresh={fetchTweets}
      />
    </div>
  );
}