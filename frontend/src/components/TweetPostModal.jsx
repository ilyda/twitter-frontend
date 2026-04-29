import { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { createReply } from "../api/tweetApi";
export default function TweetPostModal({ isOpen, onClose, tweet ,onReplyCreated}) {

  const [preview, setPreview] = useState(null);

  // 🔥 modal kapanınca state temizle
  useEffect(() => {
    
    if (!isOpen) {
      setPreview(null);
    }
  }, [isOpen]);

  const formik = useFormik({
    initialValues: {
      content: "",
      imageInputId: null,
    },

    validationSchema: Yup.object({
      content: Yup.string().required("Tweet text required"),
    }),

  onSubmit: async (values, { resetForm }) => {
    try {
      const newReply = await createReply({
        twitId: tweet.id,
        content: values.content,
        image: preview,
      });

      if (onReplyCreated) onReplyCreated(newReply); // ✅ parent'a bildir

      resetForm();
      setPreview(null);
      onClose();

    } catch (err) {
      console.log("reply error:", err);
    }
  },
  });

  const handleSelectImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setPreview(url);
    formik.setFieldValue("imageInputId", file);
  };
const imageInputId = useMemo(() => `image-${tweet?.id || "new"}`, [tweet]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"  onClick={(e) => e.stopPropagation()} >

      <div className="bg-white w-full max-w-md rounded-2xl p-4 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        {/* ORİJİNAL TWEET */}
        {tweet && (
          <div className="mb-4 pb-3">

            <div className="flex items-center gap-2">
              <img
                src={`https://ui-avatars.com/api/?name=${tweet.user?.username}`}
                className="w-8 h-8 rounded-full"
              />

              <span className="font-semibold">
                {tweet.user?.username}
              </span>

              <span className="text-gray-500 text-sm">
                @{tweet.user?.username}
              </span>
            </div>

            <p className="mt-2 text-lg">
              {tweet.content}
            </p>

          </div>
        )}

        {/* FORM */}
        <form onSubmit={formik.handleSubmit}>

          <input
            type="text"
            placeholder="Post your reply"
            className="w-full outline-none text-xl"
            {...formik.getFieldProps("content")}
          />

          {formik.touched.content && formik.errors.content && (
            <div className="text-red-500 text-sm">
              {formik.errors.content}
            </div>
          )}

          {/* IMAGE PREVIEW (SADECE MODAL) */}
          {preview && (
            <img
              src={preview}
              className="mt-3 w-40 h-40 object-cover rounded"
            />
          )}

          {/* ACTIONS */}
          <div className="flex justify-between mt-5">

            <div className="flex gap-3">

       <label htmlFor={imageInputId}>
  <ImageIcon className="text-blue-500 cursor-pointer" />
</label>

<input
  id={imageInputId}
  type="file"
  className="hidden"
  onChange={handleSelectImage}
/>

              <TagFacesIcon className="text-blue-500 cursor-pointer" />
              <FmdGoodIcon className="text-blue-500 cursor-pointer" />

            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              Reply
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}