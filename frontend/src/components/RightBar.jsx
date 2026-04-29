import React from "react";

export const RightBar = () => {
  return (
    <div className="space-y-5 px-4">

      {/* SEARCH */}
      <div className="sticky top-0 bg-white pt-3 pb-2">
        <input
          type="text"
          placeholder="Search Twitter"
          className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-blue-400"
        />
      </div>



      {/* TRENDS */}
      <div className="border rounded-2xl border-gray-200 p-3">
        <h2 className="font-bold text-lg p-3">Trends for you</h2>

        {["#reactjs", "#tailwindcss", "#springboot", "#frontend", "#javascript"].map(
          (trend, i) => (
            <div
              key={i}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
            >
              <div>
                <p className="text-xs text-gray-500">Trending in Tech</p>
                <p className="font-semibold">{trend}</p>
                <p className="text-xs text-gray-500">12.5K posts</p>
              </div>
              <span className="text-gray-500">···</span>
            </div>
          )
        )}
      </div>

      {/* WHO TO FOLLOW */}
      <div className="border rounded-2xl p-3 space-y-3 border-gray-200">
        <h2 className="font-bold text-lg">Who to follow</h2>

        {[
          { name: "React", username: "@reactjs" },
          { name: "Tailwind", username: "@tailwindcss" },
          { name: "Vite", username: "@vite_js" },
        ].map((user, i) => (
          <div key={i} className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500">{user.username}</p>
            </div>

            <button className="bg-black text-white px-3 py-1 rounded-full text-xs">
              Follow
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="text-xs text-gray-500 space-y-1 px-2">
        <p>Terms of Service · Privacy Policy · Cookies</p>
        <p>© 2026 Twitter Clone</p>
      </div>

    </div>
  );
};