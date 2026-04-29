import React, { useState } from "react";
import { Modal, Box, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateTweet } from "../api/tweetApi"; // bunu eklemen lazım

const EditModal = ({ isOpen, onClose, tweet, onUpdated }) => {
  const [content, setContent] = useState(tweet?.content || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const updated = await updateTweet(tweet.id, { content });
      onUpdated(updated);
      onClose();
    } catch (err) {
      console.error("tweet update error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} onClick={(e) => e.stopPropagation()}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 3,
          p: 3,
          outline: "none",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <CloseIcon className="cursor-pointer" onClick={onClose} />
          <button
            onClick={handleSubmit}
            disabled={loading || !content.trim()}
            className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Body */}
        <div className="flex space-x-3">
          <Avatar
            src={`https://ui-avatars.com/api/?name=${tweet?.user?.username}`}
          />
          <textarea
            className="w-full text-xl bg-transparent border-none outline-none resize-none min-h-[100px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={280}
          />
        </div>

        {/* Char count */}
        <div className="text-right text-sm text-gray-400 mt-2">
          {content.length}/280
        </div>
      </Box>
    </Modal>
  );
};

export default EditModal;