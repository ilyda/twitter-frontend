import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import  UpdateCommentModal  from "./UpdateCommentModal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageIcon from "@mui/icons-material/Image";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { getIdTweets, deleteComment, createReply, updateComment } from "../api/tweetApi";
import { useNavigate, useLocation } from "react-router-dom";
const validationSchema = Yup.object({
  content: Yup.string().required("Reply text required"),
});

export const TweetDetails = () => {
   const navigate = useNavigate();
  const { id } = useParams();
  const [tweet, setTweet] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReplyId, setSelectedReplyId] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
const [selectedReplyUserId, setSelectedReplyUserId] = useState(null);
const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
const [selectedReplyContent, setSelectedReplyContent] = useState("");
const [pendingUpdateId, setPendingUpdateId] = useState(null);
// 🔥 TEK handleClick KALSIN

  // 🔥 FETCH
  const fetchTweets = async () => {
    try {
      const data = await getIdTweets(id);
      setTweet(data);
    } catch (err) {
      console.log("tweet fetch error", err);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, [id]);

  // 🔥 CREATE REPLY
  const formik = useFormik({
    initialValues: { content: "", image: "", twitId: id },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {


    const newReply = await createReply({
     content: values.content,
  image: selectedImage || "",
  twitId: Number(id),
      });
        // ✅ anında ekle
   setTweet(newReply);

        setSelectedImage("");
        resetForm();
      } catch (err) {
        console.log("reply create error", err);
      }
    },
  });

  // 🔥 DELETE REPLY
  const handleDelete = async () => {
    try {
      await deleteComment(selectedReplyId);
      setTweet((prev) => ({
        ...prev,
        replies: prev.replies.filter((r) => r.id !== selectedReplyId),
      }));

      handleClose();
    } catch (err) {
      console.log("reply delete error", err);
    }
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

  // MENU
const handleClick = (event, replyId, userId) => {
  setAnchorEl(event.currentTarget);
  setSelectedReplyId(replyId);
  setSelectedReplyUserId(userId);
};
// state'lere ekle


const handleUpdate = () => {
  const reply = tweet.replies.find((r) => r.id === selectedReplyId);
  setSelectedReplyContent(reply?.content || "");
  setPendingUpdateId(selectedReplyId); // 🔥 kaydet
  setIsUpdateModalOpen(true);
  handleClose(); // bu selectedReplyId'yi null yapıyor
};

const handleUpdateSubmit = async (newContent) => {
  try {
    const updated = await updateComment(pendingUpdateId, newContent); // 🔥 pendingUpdateId kullan
    setTweet((prev) => ({
      ...prev,
      replies: prev.replies.map((r) =>
        r.id === pendingUpdateId ? { ...r, content: updated.content } : r
      ),
    }));
    setIsUpdateModalOpen(false);
    setPendingUpdateId(null);
  } catch (err) {
    console.log("update error", err);
  }
};
const handleClose = () => {
  setAnchorEl(null);
  setSelectedReplyId(null);
  setSelectedReplyUserId(null);
};
  if (!tweet) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto min-h-screen">

      {/* HEADER */}
      <div className="p-4">
        <h2 className="font-bold text-lg">Post</h2>
      </div>

      {/* TWEET */}
      <div className="p-4">
        <div className="flex space-x-3">
          <Avatar src={`https://ui-avatars.com/api/?name=${tweet.user?.username}`} />
          <div className="w-full">
            <div className="flex items-center space-x-2"  onClick={(e) => {
    e.stopPropagation();
    navigate(`/user/${tweet.user?.userId}`);
  }}>
              <span className="font-semibold">{tweet.user.username}</span>
              <span className="text-gray-500">@{tweet.user.username}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500 text-sm">.2m</span>
            </div>
            <p className="mt-2 text-sm">{tweet.content}</p>
            {tweet.image && (
              <img src={tweet.image} className="mt-3 rounded-xl w-full" />
            )}
            <div className="flex justify-between mt-4 text-gray-500">
              {/* <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
                <ChatBubbleOutlineIcon fontSize="small" />
              </div>
              <div className="flex items-center space-x-1 cursor-pointer hover:text-green-500">
                <RepeatIcon fontSize="small" />
              </div>
              <div className="flex items-center space-x-1 cursor-pointer hover:text-red-500">
                <FavoriteBorderIcon fontSize="small" />
              </div>
              <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
                <BarChartIcon fontSize="small" />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 REPLY BOX */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex space-x-5">
          <Avatar src={`https://ui-avatars.com/api/?name=${tweet.user?.username}`}/>
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                name="content"
                placeholder="Post your reply"
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
                  <label htmlFor="reply-image" className="cursor-pointer">
                    <ImageIcon className="text-[#1D9BF0]" />
                  </label>
                  <input
                    id="reply-image"
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
                  {uploadingImage ? "Uploading..." : "Reply"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 🔥 REPLIES */}
<div>
<div>
  {tweet.replies.map((reply) => (
    <div
      key={reply.id}
      className="p-4 border-b border-gray-200 flex gap-3 hover:bg-gray-50 transition group"
    >
      {/* Avatar */}
      <img
        src={`https://ui-avatars.com/api/?name=${reply.user?.username}`}
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm">
            {reply.user?.username}
          </p>

          {/* More Icon */}
          <MoreHorizIcon
            className="cursor-pointer text-gray-400  "
            onClick={(e) =>
              handleClick(e, reply.id, reply.user.userId)
            }
          />
        </div>

        <p className="text-sm text-gray-600 break-words mt-1">
          {reply.content}
        </p>
      </div>
    </div>
  ))}
{selectedReplyUserId === Number(localStorage.getItem("userID")) && (
  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
    <MenuItem onClick={handleDelete}>Delete</MenuItem>
    <MenuItem onClick={handleUpdate}>Update</MenuItem>
  </Menu>
)}
</div>

</div>
{/* Update Modal */}
<UpdateCommentModal
  isOpen={isUpdateModalOpen}
  onClose={() => setIsUpdateModalOpen(false)}
  initialContent={selectedReplyContent}
  onSubmit={handleUpdateSubmit}
/>
    </div>
  );
};