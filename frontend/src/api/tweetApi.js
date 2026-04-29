// src/api/tweetApi.js
import API from "./axios";

export const getTweets = async () => {
  const res = await API.get("/tweets", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return res.data;
};
export const getProfile = async (userId) => {
  const res = await API.get(`/auth/user/${userId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return res.data;
};
export const updateComment = async (commentId, content) => {
    const res = await API.put(`/comment/${commentId}`, { content });
    return res.data;
};

export const getIdTweets = async (id) => {
  const res = await API.get(`/tweets/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return res.data;
};
export const reTweet = async (tweetId) => {
  const res = await API.post(
    `/retweet/${tweetId}`,
    null,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  return res.data;
};
export const likeTweet = async (tweetId) => {
  const res = await API.post(
    `/tweets/like/${tweetId}`,
    null,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  return res.data;
};
export const deleteTweet = async (tweetId) => {
  const res = await API.delete(`/tweets/${tweetId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  console.log("delete response", res.data);
  return res.data;

};
export const deleteComment = async (tweetId) => {
  const res = await API.delete(`/comment/${tweetId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return res.data;

};
export const updateTweet = async (id, body) => {
  
  const res = await API.put(`/tweets/${id}`, body, {

    
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return res.data;
};
export const createReply = async (data) => {
  const res = await API.post(
    `/comment`,
    data,
    {
       headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    }
  );

  return res.data;
};
export const createTweet = async (data) => {
  const res = await API.post("/tweets", data, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return res.data;
};