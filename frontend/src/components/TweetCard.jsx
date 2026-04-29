import { Avatar, Menu, MenuItem } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ModeCommentOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BarChartIcon from "@mui/icons-material/BarChart";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { reTweet, likeTweet } from "../api/tweetApi";
import React, { useState } from "react";
import EditModal from "./EditModal";
import TweetPostModal from "./TweetPostModal"; // 🔥 bu dosyayı oluşturup içeriğini EditModal.jsx ile doldurman lazım
export const TweetCard = ({ tweet, onDelete }) => {
  const navigate = useNavigate();

  const [data, setData] = useState(tweet);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const open = Boolean(anchorEl);
const handleOpenEditModal = (e) => {
  e.stopPropagation();
  handleClose(); // menüyü kapat
  setIsEditModalOpen(true);
};const handleTweetUpdated = (updatedTweet) => {
  setData(updatedTweet);
};
  const handleClick = (event) => {
    event.stopPropagation(); // 🔥
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleDelete = (e, tweetId) => {
    e.stopPropagation(); // 🔥
    if (onDelete) onDelete(tweetId);
  };

  const handleOpenReplyModal = (e) => {
    e.stopPropagation(); // 🔥
    setSelectedTweet(data);
    setIsModalOpen(true);
  };

  const addReplyToTweet = (newReply) => {
    setData((prev) => ({
      ...prev,
      replies: prev.replies
        ? [...prev.replies, newReply]
        : [newReply],
    }));
  };

  const handleCreateRetweet = async (e, tweetId) => {
    e.stopPropagation(); // 🔥
    const updatedTweet = await reTweet(tweetId);
    setData(updatedTweet);
  };

  const handleCreateLike = async (e, tweetId) => {
    e.stopPropagation(); // 🔥
    const updatedTweet = await likeTweet(tweetId);
    setData(updatedTweet);
  };

  const isRetweeted = data.retwitUser?.some(
     (u) => u.userId === Number(localStorage.getItem("userID"))
  );

  const isLiked = data.likes?.some(
  (u) => u.userId === Number(localStorage.getItem("userID"))
  );
  return (
    <div
      className="border-b border-gray-200 p-4 hover:bg-gray-50 transition cursor-pointer"
      onClick={() => navigate(`/tweet/${data.id}`)}
    > 
      <div className="flex space-x-3">
        <Avatar
          src={`https://ui-avatars.com/api/?name=${data.user?.username}`} 
        />

        <div className="w-full">
          {/* HEADER */}
          <div className="flex justify-between items-center" >
            <div className="flex items-center space-x-2">
              <span className="font-semibold">
                {data.user?.username}
              </span>
              <span className="text-gray-500 text-sm">
                @{data.user?.username} · 2m
              </span>
            </div>

            {data.twit && (
              <>
                <MoreHorizIcon
                  className="cursor-pointer"
                  onClick={handleClick}
                />

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={(e) => handleDelete(e, data.id)}
                  >
                    Delete
                  </MenuItem>
                  <MenuItem onClick={(e) => handleOpenEditModal(e)}>Update</MenuItem>
                </Menu>
              </>
            )}
          </div>

          {/* CONTENT */}
          <div className="mt-2">
            <p className="text-sm">{data.content}</p>
          </div>

          {data.image && (
            <img
              src={data.image}
              className="mt-3 rounded-xl w-full max-h-96 object-cover"
            />
          )}

          {/* ACTIONS */}
          <div className="flex justify-between mt-3 text-sm">
            {/* COMMENT */}
            <div className="flex items-center space-x-1 text-gray-600">
              <ChatBubbleOutlineIcon
                fontSize="small"
                onClick={(e) => handleOpenReplyModal(e)}
              />
              <span>{data.replies?.length || 0}</span>
            </div>

            {/* RETWEET */}
            <div
              className={`flex items-center space-x-1 ${
                isRetweeted ? "text-pink-600" : "text-gray-600"
              }`}
            >
              <RepeatIcon
                fontSize="small"
                onClick={(e) =>
                  handleCreateRetweet(e, data.id)
                }
              />
              <span>{data.retwitUser?.length || 0}</span>
            </div>

            {/* LIKE */}
            <div
              className={`flex items-center space-x-1 ${
                isLiked ? "text-pink-600" : "text-gray-600"
              }`}
            >
              {isLiked ? (
                <FavoriteIcon
                  fontSize="small"
                  onClick={(e) =>
                    handleCreateLike(e, data.id)
                  }
                />
              ) : (
                <FavoriteBorderIcon
                  fontSize="small"
                  onClick={(e) =>
                    handleCreateLike(e, data.id)
                  }
                />
              )}
              <span>{data.likes?.length || 0}</span>
            </div>

            {/* VIEW */}
            <div className="flex items-center space-x-1 text-gray-600">
              <BarChartIcon fontSize="small" />
              <span>1</span>
            </div>
          </div>
        </div>
      </div>

      <TweetPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tweet={selectedTweet}
        onReplyCreated={addReplyToTweet}
      />
      <EditModal
  isOpen={isEditModalOpen}
  onClose={() => setIsEditModalOpen(false)}
  tweet={data}
  onUpdated={handleTweetUpdated}
/>
    </div>
  );
};