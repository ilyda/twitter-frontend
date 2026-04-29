import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Avatar } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import * as Yup from "yup";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { TweetCard } from "./TweetCard";
import {
  getTweets,
  createTweet,
  deleteTweet,
} from "../api/tweetApi";

const validationSchema = Yup.object({
  content: Yup.string().required("Tweet text required"),
});

export const HomeSection = () => {
  const [tweets, setTweets] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // 🔥 FETCH
  const fetchTweets = async () => {
    try {
      const data = await getTweets();
      setTweets(data);
    } catch (err) {
      console.log("tweet fetch error", err);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  // 🔥 CREATE
  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const newTweet = await createTweet({
          content: values.content,
          image: selectedImage,
        });

        // ✅ anında ekle
        setTweets((prev) => [newTweet, ...prev]);

        setSelectedImage("");
        resetForm();
      } catch (err) {
        console.log("tweet create error", err);
      }
    },
  });

  // 🔥 DELETE
const handleDeleteTweet = async (id) => {
  await deleteTweet(id);

  setTweets((prev) =>
    prev.filter((t) => t.id !== id)
  );
};

  // 🔥 UPDATE (RETWEET vs)
  const handleUpdateTweet = (updatedTweet) => {
    setTweets((prev) =>
      prev.map((t) => (t.id === updatedTweet.id ? updatedTweet : t))
    );
  };

  // 🔥 REPLY
  const handleAddReply = (tweetId, newReply) => {
    setTweets((prev) =>
      prev.map((t) =>
        t.id === tweetId
          ? {
              ...t,
              replies: t.replies
                ? [...t.replies, newReply]
                : [newReply],
            }
          : t
      )
    );
  };


  // IMAGE
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);

    setSelectedImage(URL.createObjectURL(file));
    formik.setFieldValue("image", file);

    setUploadingImage(false);
  };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>

      {/* TWEET BOX */}
      <section className="pb-10">
        <div className="flex space-x-5">
          <Avatar          src={`https://ui-avatars.com/api/?name=${localStorage.getItem("username")}`}/>

          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                name="content"
                placeholder="What is happening?"
                className="border-none outline-none text-xl bg-transparent w-full"
                {...formik.getFieldProps("content")}
              />

              {formik.touched.content && formik.errors.content && (
                <div className="text-red-500 text-sm">
                  {formik.errors.content}
                </div>
              )}

              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="preview"
                  className="mt-3 w-40 h-40 object-cover rounded"
                />
              )}

              <div className="flex items-center justify-between mt-5">
                <div className="flex space-x-5 items-center">
                  <label htmlFor="image" className="cursor-pointer">
                    <ImageIcon className="text-[#1D9BF0]" />
                  </label>

                  <input
                    id="image"
                    type="file"
                    className="hidden"
                    onChange={handleSelectImage}
                  />

                  <TagFacesIcon className="text-[#1D9BF0]" />
                  <FmdGoodIcon className="text-[#1D9BF0]" />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                  disabled={uploadingImage}
                >
                  {uploadingImage ? "Uploading..." : "Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 🔥 TWEET LIST */}
      {tweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          onDelete={handleDeleteTweet}
          onUpdate={handleUpdateTweet}
          onTweetUpdate={handleUpdateTweet}
          onReply={handleAddReply}
        />
      ))}
    </div>
  );
};