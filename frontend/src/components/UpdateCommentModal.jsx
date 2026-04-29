import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function UpdateCommentModal({ isOpen, onClose, initialContent, onSubmit }) {

  const formik = useFormik({
    initialValues: { content: initialContent || "" },
    enableReinitialize: true, // initialContent değişince formu sıfırla
    validationSchema: Yup.object({
      content: Yup.string().required("Reply text required"),
    }),
    onSubmit: async (values) => {
      await onSubmit(values.content);
      formik.resetForm();
    },
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white w-full max-w-md rounded-2xl p-4 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Update Reply</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        {/* FORM */}
        <form onSubmit={formik.handleSubmit}>
          <textarea
            name="content"
            rows={4}
            className="w-full outline-none text-xl border rounded-xl p-2 resize-none"
            {...formik.getFieldProps("content")}
          />

          {formik.touched.content && formik.errors.content && (
            <div className="text-red-500 text-sm">{formik.errors.content}</div>
          )}

          <div className="flex justify-end mt-4 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              Update
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}